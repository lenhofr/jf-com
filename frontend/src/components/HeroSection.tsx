import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-kentucky.jpg";

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-gradient)", opacity: 0.92 }}
        />
      </div>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-secondary font-semibold uppercase tracking-[0.3em] mb-4 animate-fade-in">
            Kentucky State Representative
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-none animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            YOUR NAME
            <span className="block text-secondary">FOR KENTUCKY</span>
          </h1>
          <p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Building a stronger future through better jobs, quality education, and accessible healthcare for every Kentuckian.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("#platform")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-secondary text-lg px-8 py-6 uppercase tracking-wider font-bold"
            >
              See Where I Stand
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#newsletter")}
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary text-lg px-8 py-6 uppercase tracking-wider font-bold"
            >
              Stay Updated
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown size={36} />
      </button>
    </section>
  );
};

export default HeroSection;
