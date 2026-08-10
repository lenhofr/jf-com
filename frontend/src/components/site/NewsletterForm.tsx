import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  tone?: "dark" | "light";
  /** Home page variant collects a name alongside the email. */
  withName?: boolean;
  buttonLabel?: string;
  className?: string;
};

const NewsletterForm = ({
  tone = "dark",
  withName = false,
  buttonLabel = "Subscribe",
  className,
}: Props) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    const apiBaseUrl = (import.meta.env.VITE_SIGNUP_API_URL as string | undefined)?.replace(
      /\/$/,
      "",
    );
    if (!apiBaseUrl) {
      toast({
        title: "Signup not configured",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, website }),
      });
      if (!res.ok) throw new Error("signup_failed");

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setWebsite("");
      toast({
        title: "You're subscribed",
        description: "New posts will land in your inbox.",
      });
    } catch {
      toast({
        title: "Signup failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = cn(
    "min-w-0 rounded-[3px] border px-[14px] py-[13px] text-[13px] leading-none outline-none",
    tone === "dark"
      ? "border-white/20 bg-white/[0.07] text-white placeholder:text-white/50"
      : "border-forest-900/[0.18] bg-white text-forest-900 placeholder:text-slate-muted",
  );

  if (isSubmitted) {
    return (
      <p
        className={cn(
          "m-0 text-[14px] leading-[1.6]",
          tone === "dark" ? "text-mint" : "text-forest-700",
          className,
        )}
      >
        Thanks — you're on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-wrap gap-[10px]">
        {withName && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            aria-label="Full name"
            className={cn(inputCls, "flex-1 basis-[140px]")}
          />
        )}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={withName ? "Email" : "Enter your email"}
          aria-label="Email"
          className={cn(inputCls, "flex-1 basis-[180px]")}
        />
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "rounded-[3px] bg-moss px-6 py-[13px] text-[13px] font-semibold leading-none text-white transition-colors disabled:opacity-60",
            tone === "dark" ? "hover:bg-moss-light" : "hover:bg-moss-dark",
          )}
        >
          {isSubmitting ? "Sending…" : buttonLabel}
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;
