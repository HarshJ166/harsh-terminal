import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${profile.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: profile.fullName, url: site.url }],
  creator: profile.fullName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
    firstName: "Harsh",
    lastName: "Jajal",
    username: profile.github,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  // Set GOOGLE_SITE_VERIFICATION in Vercel to verify the site in Google Search Console.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0e0f0c",
  colorScheme: "dark",
};

// ProfilePage + Person is the structured data Google uses for personal profile pages.
const person = `${site.url}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      dateModified: new Date().toISOString(),
      mainEntity: { "@id": person },
      isPartOf: { "@id": `${site.url}/#website` },
    },
    {
      "@type": "Person",
      "@id": person,
      name: profile.fullName,
      alternateName: profile.name,
      givenName: "Harsh",
      familyName: "Jajal",
      jobTitle: profile.role,
      description: site.description,
      url: site.url,
      image: `${site.url}/opengraph-image`,
      email: `mailto:${profile.email}`,
      worksFor: { "@type": "Organization", name: profile.company },
      alumniOf: { "@type": "CollegeOrUniversity", name: profile.education },
      address: { "@type": "PostalAddress", addressLocality: profile.location.city, addressCountry: profile.location.country },
      knowsAbout: ["Go", "Apache Kafka", "Event-driven architecture", "Distributed systems", "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Solidity", "Ethereum", "Machine learning"],
      sameAs: profile.links.map((l) => l.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: profile.name,
      publisher: { "@id": person },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plex.variable} ${plexCond.variable} ${commit.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
