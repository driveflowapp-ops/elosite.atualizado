import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Methodology from "@/components/Methodology";
import Solutions from "@/components/Solutions";
import Segments from "@/components/Segments";
import Differential from "@/components/Differential";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Methodology />
        <Solutions />
        <Segments />
        <Differential />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
