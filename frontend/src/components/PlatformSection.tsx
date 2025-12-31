import { useState } from "react";
import { Briefcase, GraduationCap, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const issues = [
  {
    id: "economy",
    icon: Briefcase,
    title: "Economy & Jobs",
    subtitle: "Building prosperity for all Kentuckians",
    summary:
      "Creating good-paying jobs, supporting local businesses, and ensuring every working Kentuckian can afford to live with dignity.",
    details: [
      "Fight for a living wage that keeps pace with the cost of living",
      "Support small businesses with tax incentives and reduced bureaucracy",
      "Invest in workforce development and job training programs",
      "Attract new industries while protecting existing Kentucky jobs",
      "Expand broadband access to boost rural economic opportunities",
    ],
    color: "primary" as const,
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education",
    subtitle: "Investing in Kentucky's future",
    summary:
      "Every child in Kentucky deserves access to quality education, well-paid teachers, and pathways to success—whether that's college or career training.",
    details: [
      "Increase teacher pay to attract and retain the best educators",
      "Fully fund public schools and reduce class sizes",
      "Expand vocational and technical education programs",
      "Make higher education more affordable for Kentucky families",
      "Support early childhood education and Pre-K programs",
    ],
    color: "secondary" as const,
  },
  {
    id: "healthcare",
    icon: Heart,
    title: "Healthcare",
    subtitle: "Care you can count on",
    summary:
      "Healthcare is a right, not a privilege. I'll fight to ensure every Kentuckian has access to affordable, quality healthcare—no matter where they live.",
    details: [
      "Protect and expand Medicaid coverage for working families",
      "Lower prescription drug costs through transparency and competition",
      "Expand mental health services and addiction treatment",
      "Support rural hospitals and community health centers",
      "Ensure access to reproductive healthcare decisions",
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
