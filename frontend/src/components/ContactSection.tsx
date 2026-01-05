import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !message.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your email and a message.",
        variant: "destructive",
      });
      return;
    }

    const apiBaseUrl = (import.meta.env.VITE_CONTACT_API_URL as string | undefined)?.replace(/\/$/, "");
    if (!apiBaseUrl) {
      toast({
        title: "Contact not configured",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          website,
        }),
      });

      if (!res.ok) throw new Error("contact_failed");

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");

      toast({
        title: "Message sent",
        description: "Thanks for reaching out — we’ll get back to you soon.",
      });
    } catch {
      toast({
        title: "Send failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold uppercase tracking-[0.2em] mb-3">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              SEND A MESSAGE
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Questions, volunteer interest, or support — we’d love to hear from you.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-card rounded-2xl p-8 border border-border text-center animate-fade-in">
              <p className="text-2xl font-bold text-foreground mb-2">Thanks!</p>
              <p className="text-muted-foreground">Your message has been received.</p>
              <div className="mt-6">
                <Button onClick={() => setIsSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-4">
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name (optional)"
                  disabled={isSubmitting}
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject (optional)"
                disabled={isSubmitting}
              />

              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                required
                disabled={isSubmitting}
                className="min-h-[160px]"
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
