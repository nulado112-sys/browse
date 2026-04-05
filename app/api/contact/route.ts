import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Use Web3Forms (free service) to send emails
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY || '1cf2bc76-3e99-4ed6-a4b9-ce6c09d7c826', // Free public key for testing
        subject: `New Contact Form Message from ${name}`,
        from_name: 'NutriLens Website',
        to: 'habibnemer01@gmail.com',
        name: name,
        email: email,
        message: message,
        replyto: email,
      }),
    })

    const data = await response.json()

    if (data.success) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
