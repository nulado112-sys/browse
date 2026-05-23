import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative bg-dark-bg min-h-screen">
      <ScrollToTop />
      <Navbar />
      <Hero />

      {/* Smooth transition from hero */}
      <div className="relative z-10">
        <About />

        {/* Divider */}
        <div className="px-6">
          <div
            className="h-px mx-auto max-w-lg"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(24,112,184,0.3), transparent)",
            }}
          />
        </div>

        <MenuSection />

        {/* Divider */}
        <div className="px-6">
          <div
            className="h-px mx-auto max-w-lg"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
            }}
          />
        </div>

        <Gallery />

        <Footer />
      </div>
    </main>
  );
}
