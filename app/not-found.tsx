import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col justify-center px-4 md:px-8">
      <p className="font-mono text-sm text-accent-ink">offset out of range</p>
      <h1 className="mt-4 font-display text-6xl font-semibold tracking-tight md:text-8xl">Nothing at this offset.</h1>
      <Link href="/" className="mt-10 font-mono text-sm underline decoration-accent decoration-2 underline-offset-8">
        Back to the log
      </Link>
    </main>
  );
}
