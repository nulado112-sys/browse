import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FoodScanner from '@/components/FoodScanner'
import HowItWorks from '@/components/HowItWorks'
import About from '@/components/About'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navigation />
      <Hero />
      <FoodScanner />
      <HowItWorks />
      <About />
      <Services />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
