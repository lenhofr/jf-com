import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // For now, just show success state (backend can be added later)
    setIsSubmitted(true);
    toast({
      title: "You're on the list!",
      description: "Thank you for joining our campaign. We'll be in touch soon.",
    });
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-8">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            JOIN THE MOVEMENT
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Stay connected with campaign updates, events, and ways you can make a
            difference in our community.
          </p>

          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
              <p className="text-2xl font-bold text-white mb-2">
                Thank You for Joining!
              </p>
              <p className="text-white/80">
                We'll keep you updated on the campaign. Together, we'll build a
                better Kentucky.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 px-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-secondary focus:ring-secondary"
              />
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-secondary text-lg uppercase tracking-wider font-bold whitespace-nowrap"
              >
                Sign Up
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          )}

          <p className="text-sm text-white/60 mt-6">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
