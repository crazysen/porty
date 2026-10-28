import { useState, type SubmitEvent } from "react";
import { Send } from "lucide-react";

type Props = { email: string };

export default function ContactForm({ email }: Props) {
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Portfolio inquiry from ${name}`;
    const body = `${message}\n\n${name}\n${from}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form onSubmit={onSubmit} className="panel grid gap-4 p-6 sm:p-7">
      <label className="grid gap-1.5">
        <span className="text-sm text-slate-300">Name</span>
        <input name="name" required autoComplete="name" placeholder="Your name" className="field" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-slate-300">Email</span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" className="field" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-slate-300">Message</span>
        <textarea name="message" required rows={5} placeholder="Tell me about your project or opportunity..." className="field resize-y" />
      </label>
      <button type="submit" className="btn btn-primary mt-1 justify-center py-3">
        <Send size={16} /> Send Message
      </button>
      <p className="text-center text-xs text-slate-500" aria-live="polite">
        {opened ? "Your email app should open with the message ready to send." : "This opens your email app with the message filled in."}
      </p>
    </form>
  );
}
