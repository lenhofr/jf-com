import candidatePortrait from "@/assets/jess_flag.jpeg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glow-primary">
              <img
                src={candidatePortrait}
                alt="Jesse Foreman portrait"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/30 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-secondary font-semibold uppercase tracking-[0.2em] mb-3">
              My Story
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              NOTHING I’VE EARNED
              <span className="text-primary"> CAME EASY</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Nothing I’ve earned came easy. I wasn’t handed success — I built it through long hours, tough decisions, personal sacrifice, and perseverance.
              </p>
              <p>
                I don’t come from politics, I come from real life. I have worked hard, failed, learned, and succeeded. I understand what it’s like to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Take responsibility when things go wrong</li>
                <li>Earn trust through action and not talk</li>
                <li>No matter how many times you get knocked down, you get back up and keep fighting</li>
              </ul>
              <p>
                That experience matters, and it’s exactly what Frankfort needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
