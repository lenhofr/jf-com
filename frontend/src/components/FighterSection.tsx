import { Button } from "@/components/ui/button";

const FighterSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="fighter" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-secondary font-semibold uppercase tracking-[0.2em] mb-3">
            For the 69th District
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            A FIGHTER FOR THE 69TH DISTRICT
          </h2>

          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              The 69th District is built on hard work, faith, family, and community.
            </p>
            <p>
              I’m ready to fight for those values, every single day, as your voice in Frankfort.
            </p>
            <p className="text-foreground font-semibold">
              I’m Jesse Foreman. I’ve fought for everything I have earned in life, and now I’m ready to fight for you.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("#newsletter")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-secondary text-lg px-8 py-6 uppercase tracking-wider font-bold"
            >
              Stay Updated
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 uppercase tracking-wider font-bold"
            >
              Send a Message
            </Button>
          </div>

          <p className="mt-10 text-sm uppercase tracking-widest text-muted-foreground">
            Vote Republican. Vote Jesse Foreman for State Representative, 69th District.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FighterSection;
