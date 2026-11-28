export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  // Internal case-study page, if there is one
  caseStudy?: string;
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "grupo-260",
    title: "Grupo 260 Platform",
    tagline: "Management platform for a scout group",
    description:
      "One back office replacing a Drive full of spreadsheets: members, enrollments, invoicing and reconciliation, inventory, a point of sale for events. Self-hosted on a single home server, deployed through its own CI runners.",
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "Docker Swarm", "Nginx"],
    caseStudy: "/projects/grupo-260",
    featured: true,
  },
  {
    slug: "esp32-ble-keyboard",
    title: "ESP32 BLE Keyboard: F13–F24",
    tagline: "Open-source contribution",
    description:
      "Added the F13–F24 keys to the HID descriptor of a popular ESP32 Bluetooth keyboard library, so devices can send keys no app uses by default. I use it for a one-button Discord mute switch.",
    stack: ["C++", "ESP32", "Bluetooth HID"],
    links: [
      { label: "My fork", href: "https://github.com/BrunMartins/ESP32-BLE-Keyboard" },
      { label: "Pull request", href: "https://github.com/T-vK/ESP32-BLE-Keyboard/pull/392" },
    ],
  },
  {
    slug: "on-air-sign",
    title: "On Air sign",
    tagline: "ESP32 retrofit driven by a Discord bot",
    description:
      "An off-the-shelf On Air light that I rewired with an ESP32 and a MOSFET. A Discord bot watches my voice state and switches it through a token-protected local API, so people at home know when I'm in a call. The sign's own button still works.",
    stack: ["TypeScript", "discord.js", "C++", "ESP32", "PlatformIO"],
    links: [{ label: "Code and wiring", href: "https://github.com/BrunMartins/on-air-discord-bot" }],
  },
  {
    slug: "house-hunter",
    title: "House Hunter",
    tagline: "Automated property search",
    description:
      "Scrapes Portuguese property sites, parses listings with an LLM when the HTML doesn't cooperate, removes duplicates across sites and drops new matches into a triage sheet with email alerts.",
    stack: ["TypeScript", "Bun", "Windmill", "Gemini API", "Google Sheets"],
  },
  {
    slug: "gpx-viewer",
    title: "GPX to map sheet",
    tagline: "Single-file mapping tool",
    description:
      "Opens a GPX route at real paper-map scales (1:25k to 1:500k) with the UTM grid and edge rulers drawn on top, gives any point in MGRS, decimal or DMS, and prints an A4 sheet at 1:25,000. One HTML file, no install.",
    stack: ["JavaScript", "Leaflet", "UTM / MGRS", "GPX"],
    links: [{ label: "Live demo", href: "https://grupo260.escoteiros.pt/carta-militar" }],
  },
];
