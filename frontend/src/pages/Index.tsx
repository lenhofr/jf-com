import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PlatformSection from "@/components/PlatformSection";
import EndorsementsSection from "@/components/EndorsementsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PlatformSection />
        <EndorsementsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
