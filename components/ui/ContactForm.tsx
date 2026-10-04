"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { sendContact } from "@/lib/contact";
import { gmailHref } from "@/lib/mail";
import { profile } from "@/content/profile";

type State = { status: "idle" | "sending" | "sent" | "error"; error?: string };

const field =
  "h-12 w-full border border-rule bg-bg px-3 text-base placeholder:text-muted focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState({ status: "sending" });
    const error = await sendContact({ ...data, source: "contact" } as never);
    if (error) return setState({ status: "error", error });
    form.reset();
    setState({ status: "sent" });
  };

  if (state.status === "sent") {
    return (
      <div className="border border-rule p-6" role="status">
        <CheckCircle size={28} className="text-accent" />
        <p className="mt-4 font-display text-3xl font-semibold tracking-tight">Message received.</p>
        <p className="mt-2 text-muted">Thanks. My reply will come from {profile.email}.</p>
        <button
          type="button"
          onClick={() => setState({ status: "idle" })}
          className="mt-6 inline-flex h-11 items-center font-mono text-sm underline decoration-rule underline-offset-4 hover:decoration-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = state.status === "sending";
  return (
    <form onSubmit={submit} className="grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="cf-name" className="text-sm">
            Name
          </label>
          <input id="cf-name" name="name" autoComplete="name" maxLength={100} className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="cf-email" className="text-sm">
            Email <span className="text-muted">(required)</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" maxLength={200} className={field} />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="cf-message" className="text-sm">
          What are you working on? <span className="text-muted">(required)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          minLength={2}
          maxLength={2000}
          rows={5}
          className={`${field} h-auto resize-y py-3`}
        />
      </div>
      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />

      {state.status === "error" && (
        <p role="alert" className="text-sm text-accent">
          {state.error}{" "}
          <a href={gmailHref()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Open Gmail
          </a>
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-12 items-center bg-fg px-6 font-mono text-sm text-bg transition-transform active:translate-y-px disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
