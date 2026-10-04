export type Project = {
  slug: string;
  name: string;
  summary: string;
  spec: [string, string][];
  links: { label: string; href: string }[];
  image?: { src: string; alt: string; width: number; height: number };
};

export const featured: Project = {
  slug: "cert-chain",
  name: "Cert-Chain",
  summary:
    "Colleges issue academic certificates as Ethereum transactions. Employers verify any certificate by its ID.",
  spec: [
    ["contract", "Solidity"],
    ["signing", "MetaMask"],
    ["tooling", "Truffle, Ganache"],
    ["client", "React, Tailwind CSS"],
  ],
  links: [{ label: "Source", href: "https://github.com/HarshJ166/BlockChain_Certificate_App" }],
  image: {
    src: "/work/certchain-preview.webp",
    alt: "Cert-Chain certificate preview for Shah and Anchor Kutchhi Engineering College, ready to issue on-chain",
    width: 1014,
    height: 783,
  },
};

export const projects: Project[] = [
  {
    slug: "transfer-list",
    name: "Transfer List for shadcn/ui",
    summary:
      "A dual-listbox with search, check-all, disabled items and full keyboard support. Works on Radix and Base UI, installable from my own registry.",
    spec: [
      ["install", "npx shadcn add @harshj/transfer-list"],
      ["closes", "shadcn-ui #2114, #3371"],
    ],
    links: [
      { label: "Demo", href: "https://shadcn-transfer-list-d4gb-two.vercel.app" },
      { label: "Source", href: "https://github.com/HarshJ166/shadcn-transfer-list" },
    ],
    image: {
      src: "/work/transfer-list.webp",
      alt: "Transfer List demo: a Frameworks list and a Your stack list with move buttons between them",
      width: 1480,
      height: 960,
    },
  },
  {
    slug: "invomax",
    name: "invoMax",
    summary:
      "Invoicing for small businesses: client and item masters, automatic GST calculation, PDF invoices and status tracking.",
    spec: [
      ["client", "Next.js 16, shadcn/ui"],
      ["server", "Express, TypeScript"],
      ["data", "PostgreSQL, Prisma"],
    ],
    links: [{ label: "Source", href: "https://github.com/HarshJ166/invomax" }],
  },
  {
    slug: "study-assistant",
    name: "Intelligent Study Assistant",
    summary:
      "Retrieval-augmented answers over course material, plus code generation that returns a complete React app with a live preview.",
    spec: [
      ["retrieval", "Vector embeddings, RAG"],
      ["output", "React source with live preview"],
    ],
    links: [],
  },
];

export const alsoBuilt = [
  { name: "Good Grocery", note: "MERN store, 98 Lighthouse performance", href: "https://github.com/HarshJ166/GoodGrocery" },
  { name: "Market Matrix", note: "LSTM forecasting over 1M+ market data points" },
];
