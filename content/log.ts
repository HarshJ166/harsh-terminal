export type LogRecord = {
  offset: number;
  ts: string;
  key: string;
  tag: string;
  title: string;
  org: string;
  payload: [string, string][];
  current?: boolean;
};

// Append-only, oldest first. Offsets are positions in the career topic.
export const log: LogRecord[] = [
  {
    offset: 0,
    ts: "2021 / 2025",
    key: "education",
    title: "B.E. Information Technology",
    org: "Shah and Anchor Kutchhi Engineering College",
    tag: "sakec",
    payload: [["cgpa", "8.71 / 10"]],
  },
  {
    offset: 1,
    ts: "2024.04 / 2024.08",
    key: "role",
    title: "Application Developer",
    org: "Bot2Do Technologies",
    tag: "bot2do",
    payload: [
      ["built", "ScaleSecure, a security and load testing platform on ZAP and k6"],
      ["result", "25% faster page loads across React and Node.js web apps"],
      ["apis", "REST services handling 100K+ requests a day at 99% uptime"],
    ],
  },
  {
    offset: 2,
    ts: "2024.05 / 2024.07",
    key: "role",
    title: "AI Developer",
    org: "Intel Unnati",
    tag: "intel",
    payload: [
      ["built", "Edge-AI parking management with real-time vehicle detection"],
      ["result", "95% detection accuracy, 40% lower latency on constrained hardware"],
      ["stack", "TensorFlow, OpenCV"],
    ],
  },
  {
    offset: 3,
    ts: "2024.06",
    key: "role",
    title: "Software Developer",
    org: "Territorial Army",
    tag: "army",
    payload: [
      ["built", "A reworked desktop GUI with digital signatures, OCR and model management"],
      ["tuned", "Database connection handling"],
    ],
  },
  {
    offset: 4,
    ts: "2024.08 / 2026",
    key: "role",
    title: "Software Engineer",
    org: "CypherSol Fintech India",
    tag: "cypher",
    payload: [
      ["built", "Python GUI for bank statement analysis with interactive charts"],
      ["result", "Statement processing time down 40%"],
      ["built", "Electron and React desktop app on SQLite, wired over IPC"],
      ["built", "Automated statement retrieval through Google Cloud and Azure APIs"],
      ["built", "Invoice generator that matches Tally formats"],
    ],
  },
  {
    offset: 5,
    ts: "2026 / now",
    key: "role",
    title: "Software Engineer",
    org: "NyayAssist",
    tag: "nyaya",
    current: true,
    payload: [
      ["domain", "Legal tech: AI solutions for lawyers"],
      ["building", "Distributed, event-driven services"],
      ["stack", "Go, Kafka, Auth0"],
    ],
  },
];
