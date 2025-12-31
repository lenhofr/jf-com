const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glow-primary">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974"
                alt="Candidate portrait"
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
              Meet Your Candidate
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              A KENTUCKIAN
              <span className="text-primary"> FOR KENTUCKY</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Born and raised right here in the heart of the Bluegrass State, I've spent my life 
                working alongside fellow Kentuckians who share the same dreams: good jobs, quality 
                schools for our children, and healthcare we can actually afford.
              </p>
              <p>
                Throughout my career in public service, I've seen firsthand the challenges our communities 
                face. I've watched factories close, watched families struggle to make ends meet, and 
                watched too many young people leave our state in search of opportunity elsewhere.
              </p>
              <p>
                <strong className="text-foreground">That's why I'm running.</strong> Not for power or 
                prestige, but because I believe we can do better. We deserve leaders who listen, who 
                understand our struggles, and who will fight for real solutions—not empty promises.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="text-4xl font-bold text-primary">20+</p>
                <p className="text-muted-foreground">Years in Kentucky</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary">100%</p>
                <p className="text-muted-foreground">Committed to You</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent">1</p>
                <p className="text-muted-foreground">Clear Mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
