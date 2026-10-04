export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsh-terminal.vercel.app",
};

export const profile = {
  name: "Harsh Jajal",
  fullName: "Harsh Dinesh Jajal",
  role: "Software Engineer",
  company: "NyayAssist",
  summary:
    "Software engineer at NyayAssist. I build event-driven systems in Go and Kafka, and the interfaces that sit on top.",
  email: "jajalharsh268@gmail.com",
  github: "HarshJ166",
  links: [
    { label: "GitHub", href: "https://github.com/HarshJ166" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-jajal-263170247/" },
    { label: "LeetCode", href: "https://leetcode.com/harsh_2608/" },
  ],
};

export const principles = [
  { lead: "Measure first.", rest: "A claim without a number is a guess." },
  { lead: "Finish the last ten percent.", rest: "Error states, empty states, the migration nobody asked for." },
  { lead: "Leave it legible.", rest: "The next person to read my code is usually me." },
];

export const stack = [
  { layer: "Systems", items: ["Go", "Kafka", "Auth0", "Docker", "AWS"] },
  { layer: "Backend", items: ["Node.js", "Express", "Django", "GraphQL", "REST"] },
  { layer: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Electron"] },
  { layer: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "SQLite", "Prisma"] },
  { layer: "Chain and ML", items: ["Solidity", "Truffle", "TensorFlow", "OpenCV", "RAG"] },
];
