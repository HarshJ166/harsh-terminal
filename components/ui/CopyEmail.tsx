"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { profile } from "@/content/profile";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: the address is visible right next to the button.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 border border-rule px-3 font-mono text-xs text-muted transition-colors hover:border-fg hover:text-fg active:translate-y-px"
    >
      {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
