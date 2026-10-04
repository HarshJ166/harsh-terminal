"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { CircleHalf, Moon, Sun } from "@phosphor-icons/react";

const order = ["system", "light", "dark"] as const;
const icons = { system: CircleHalf, light: Sun, dark: Moon };
const labels = { system: "auto", light: "light", dark: "dark" };
const noop = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const current = (mounted && order.includes(theme as never) ? theme : "system") as (typeof order)[number];
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon = icons[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${labels[current]}. Switch to ${labels[next]}.`}
      className="inline-flex h-11 min-w-11 items-center justify-center gap-2 border border-rule font-mono text-xs transition-colors hover:border-fg active:translate-y-px sm:px-3"
    >
      <Icon size={14} />
      <span className="hidden w-[5ch] text-left sm:inline">{labels[current]}</span>
    </button>
  );
}
