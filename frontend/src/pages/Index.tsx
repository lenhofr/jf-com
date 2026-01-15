import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PlatformSection from "@/components/PlatformSection";
import BioSection from "@/components/BioSection";
import FighterSection from "@/components/FighterSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DonateButton from "@/components/DonateButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PlatformSection />
        <BioSection />
        <FighterSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
      <DonateButton />
    </div>
  );
};

export default Index;
