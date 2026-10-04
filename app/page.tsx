import { Hero } from "@/components/sections/Hero";
import { Log } from "@/components/sections/Log";
import { Work } from "@/components/sections/Work";
import { Throughput } from "@/components/sections/Throughput";
import { Principles, Stack } from "@/components/sections/Principles";
import { Contact } from "@/components/sections/Contact";
import { Nav } from "@/components/ui/Nav";

export default function Home() {
  return (
    <>
      <a
        href="#log"
        className="sr-only z-50 bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to the log
      </a>
      <Nav />
      <main>
        <Hero />
        <Log />
        <Work />
        <Throughput />
        <Principles />
        <Stack />
      </main>
      <Contact />
    </>
  );
}
