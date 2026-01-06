import { useState } from "react";
import { Briefcase, Heart, Shield, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const issues = [
  {
    id: "business",
    icon: Briefcase,
    title: "A Business Mindset for Government",
    subtitle: "Results matter. Accountability matters.",
    summary:
      "That’s the mindset we need representing our district — and I’ll bring it to Frankfort.",
    details: [
      "I will fight for fiscal responsibility and a government that lives within its means.",
      "I’ll stand up for small businesses, job creators, and working families — not bureaucrats and lifelong politicians.",
      "I believe government should get out of the way, not stand in it.",
      "I believe regulations are often a restraint on freedom.",
      "Effectiveness in passing meaningful legislation is the measure voters should use to determine who should represent our district in Frankfort.",
    ],
    color: "primary" as const,
  },
  {
    id: "families",
    icon: Heart,
    title: "Putting Families First",
    subtitle: "Family is everything.",
    summary:
      "It’s why we work, why we sacrifice, and why we care about the future.",
    details: [
      "I will defend life and stand for Kentucky's values.",
      "I’ll support strengthening our school systems and making sure our children are prepared for their future and are financially savvy.",
      "I will always protect our constitutional freedoms, including the Second Amendment.",
    ],
    color: "secondary" as const,
  },
  {
    id: "communities",
    icon: Shield,
    title: "Safe Communities, Strong Values",
    subtitle: "Safety, respect for the law, and responsibility.",
    summary:
      "A strong community starts with safety, respect for the law, and personal responsibility.",
    details: [
      "I support our law enforcement officers and first responders.",
      "I’ll fight for policies that keep our neighborhoods safe.",
      "I believe accountability applies to everyone, including government.",
      "I'll stand up for our community members with mental health conditions and support legislation that gets them the help they need.",
    ],
    color: "accent" as const,
  },
];

const colorClasses = {
  primary: {
    bg: "bg-primary",
    text: "text-primary",
    border: "border-primary",
    gradient: "from-primary/10 to-transparent",
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-secondary",
    border: "border-secondary",
    gradient: "from-secondary/10 to-transparent",
  },
  accent: {
    bg: "bg-accent",
    text: "text-accent",
    border: "border-accent",
    gradient: "from-accent/10 to-transparent",
  },
};

const PlatformSection = () => {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  return (
    <section id="platform" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold uppercase tracking-[0.2em] mb-3">
            My Platform
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            WHERE I STAND
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Clear positions on the issues that matter most to Kentucky families.
            No double-talk, no empty promises—just honest plans for real progress.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {issues.map((issue) => {
            const isExpanded = expandedIssue === issue.id;
            const colors = colorClasses[issue.color];
            const Icon = issue.icon;

            return (
              <div
                key={issue.id}
                className={cn(
                  "bg-card rounded-2xl overflow-hidden transition-all duration-300 border-2",
                  isExpanded ? colors.border : "border-transparent",
                  "hover:shadow-xl"
                )}
              >
                <div className={cn("h-2", colors.bg)} />
                <div className="p-6 lg:p-8">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center mb-6",
                      colors.bg
                    )}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {issue.title}
                  </h3>
                  <p className={cn("font-semibold mb-4", colors.text)}>
                    {issue.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-4">{issue.summary}</p>

                  <button
                    onClick={() =>
                      setExpandedIssue(isExpanded ? null : issue.id)
                    }
                    className={cn(
                      "flex items-center gap-2 font-semibold transition-colors",
                      colors.text,
                      "hover:opacity-80"
                    )}
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                      <ul className="space-y-3">
                        {issue.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                colors.bg
                              )}
                            />
                            <span className="text-muted-foreground">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
