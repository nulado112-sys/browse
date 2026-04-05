import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured')
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Initialize Gemini AI with vision support
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

    const prompt = `You are a certified nutritionist AI. Analyze this food image and return ONLY a valid JSON object with this exact structure:
{
  "food_name": "string",
  "confidence": number (0-100),
  "serving_size": "string (e.g., '1 bar, 45g')",
  "calories": number,
  "macros": {
    "protein_g": number,
    "carbs_g": number,
    "fat_g": number,
    "fiber_g": number,
    "sugar_g": number
  },
  "health_score": number (1-10),
  "tips": ["tip1", "tip2", "tip3"],
  "warnings": ["warning1"] or []
}
Do not include markdown, code fences, or any text outside the JSON.`

    // Call Gemini API with image
    const imageParts = [
      {
        inlineData: {
          data: image,
          mimeType: 'image/jpeg',
        },
      },
    ]

    const result = await model.generateContent([prompt, ...imageParts])

    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    let analysisResult
    try {
      // Remove any markdown formatting if present
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
      analysisResult = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text)
      return NextResponse.json({ error: 'Failed to parse analysis result' }, { status: 500 })
    }

    // Validate the response structure
    if (!analysisResult.food_name || !analysisResult.calories || !analysisResult.macros) {
      console.error('Invalid response structure:', analysisResult)
      return NextResponse.json({ error: 'Invalid analysis result' }, { status: 500 })
    }

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error('Analysis error:', error)

    // Return more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
      }
      if (error.message.includes('quota')) {
        return NextResponse.json({ error: 'API quota exceeded. Please try again later.' }, { status: 429 })
      }
    }

    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}