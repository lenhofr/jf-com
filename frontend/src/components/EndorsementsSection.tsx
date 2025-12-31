import { Quote } from "lucide-react";

const endorsements = [
  {
    name: "Mayor Jane Smith",
    title: "Mayor of Louisville",
    quote:
      "A leader with integrity who truly understands the needs of working families. I'm proud to support their campaign for State Representative.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
  },
  {
    name: "John Davis",
    title: "Kentucky AFL-CIO President",
    quote:
      "Finally, a candidate who will fight for fair wages and workers' rights. They have my full endorsement and the support of our members.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
  {
    name: "Dr. Sarah Williams",
    title: "Community Health Advocate",
    quote:
      "Their commitment to expanding healthcare access in rural Kentucky is exactly what our communities need. A true champion for the people.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
  },
];

const EndorsementsSection = () => {
  return (
    <section id="endorsements" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold uppercase tracking-[0.2em] mb-3">
            Endorsements
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            TRUSTED BY LEADERS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Community leaders, organizations, and everyday Kentuckians are
            standing together for real change.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {endorsements.map((endorsement, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
            >
              <Quote className="w-10 h-10 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-foreground text-lg mb-6 leading-relaxed">
                "{endorsement.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={endorsement.image}
                  alt={endorsement.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-bold text-foreground">{endorsement.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {endorsement.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Organizations */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground uppercase tracking-wider mb-8">
            Proudly endorsed by
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              "Kentucky Education Association",
              "AFL-CIO Kentucky",
              "Sierra Club Kentucky",
              "KY Nurses Association",
            ].map((org, index) => (
              <div
                key={index}
                className="text-lg md:text-xl font-bold text-muted-foreground/60 hover:text-primary transition-colors"
              >
                {org}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndorsementsSection;
