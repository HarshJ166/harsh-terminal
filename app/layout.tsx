import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { profile, site } from "@/content/profile";
import "./globals.css";

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: "400", variable: "--font-plex" });
const plexCond = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-plex-cond",
});
const commit = localFont({
  src: "./fonts/CommitMono-400.woff2",
  weight: "400",
  variable: "--font-commit",
});

const title = `${profile.name}, ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: profile.summary,
  openGraph: { title, description: profile.summary, url: "/", type: "profile" },
  twitter: { card: "summary_large_image", title, description: profile.summary },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e6df" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f0c" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.company },
  email: `mailto:${profile.email}`,
  url: site.url,
  sameAs: profile.links.map((l) => l.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plex.variable} ${plexCond.variable} ${commit.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
