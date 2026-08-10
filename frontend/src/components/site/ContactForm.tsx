import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { contactTopics } from "@/data/site";

const inputCls =
  "w-full rounded-[3px] border border-forest-900/[0.18] bg-white px-[14px] py-[13px] text-[13.5px] leading-none text-forest-900 outline-none placeholder:text-slate-muted focus:border-moss";

const ContactForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !message.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your email and a short note.",
        variant: "destructive",
      });
      return;
    }

    const apiBaseUrl = (import.meta.env.VITE_CONTACT_API_URL as string | undefined)?.replace(
      /\/$/,
      "",
    );
    if (!apiBaseUrl) {
      toast({
        title: "Contact not configured",
        description: "Please email directly while we sort this out.",
        variant: "destructive",
      });
      return;
    }

    // The API stores name/subject/message, so the phone number rides along in
    // the message body rather than being dropped.
    const body = phone.trim() ? `${message}\n\nPhone: ${phone}` : message;

    try {
      setIsSubmitting(true);
      const res = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, subject: topic, message: body, website }),
      });
      if (!res.ok) throw new Error("contact_failed");

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setTopic("");
      setMessage("");
      setWebsite("");
      toast({
        title: "Message sent",
        description: "Thanks for reaching out — I'll follow up personally.",
      });
    } catch {
      toast({
        title: "Send failed",
        description: "Please try again, or email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-forest-900/10 bg-sage-50 px-6 py-9 md:px-[34px]">
      <h3 className="m-0 mb-2 font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-forest-700">
        Send a note
      </h3>
      <p className="m-0 mb-[26px] text-[13.5px] leading-[1.65] text-slate-body">
        A short summary of your situation and any deadline you're working against is enough to
        start.
      </p>

      {isSubmitted ? (
        <p className="m-0 text-[14px] leading-[1.7] text-forest-700">
          Thanks — your note came through. I read every inquiry personally and will follow up.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-[14px]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            aria-label="Full name"
            className={inputCls}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            className={inputCls}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (optional)"
            aria-label="Phone"
            className={inputCls}
          />
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="What is this about?"
            className={`${inputCls} ${topic ? "text-forest-900" : "text-slate-body"}`}
          >
            <option value="">What is this about?</option>
            {contactTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your situation"
            aria-label="Message"
            className={`${inputCls} resize-y leading-[1.6]`}
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
            className="rounded-[3px] bg-moss px-6 py-[14px] text-[13.5px] font-semibold leading-none text-white transition-colors hover:bg-moss-dark disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Submit Inquiry"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
