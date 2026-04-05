import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NutriLens | AI Food Scanner & Nutrition Analysis',
  description: 'Know exactly what you\'re eating with AI-powered food analysis. Get instant nutrition insights from certified dietitians. Scan meals, track calories, make better food choices.',
  keywords: 'food scanner, nutrition analysis, calorie counter, dietitian AI, meal analysis, nutrition app, food tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
