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
    title: "PGI 260",
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
      // TODO: add the upstream PR link
    ],
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
    title: "GPX viewer with military grid",
    tagline: "Single-file mapping tool",
    description:
      "Opens GPX tracks on a map with the Portuguese military map grid on top, so routes line up with the paper charts used on hikes and scout activities. One HTML file, no install.",
    stack: ["JavaScript", "Maps", "GPX"],
    // TODO: link a live demo if you publish it
  },
];
