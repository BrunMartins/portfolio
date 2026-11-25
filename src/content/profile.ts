// Everything personal on the site lives here, so updating the portfolio
// rarely means touching a component.

export const profile = {
  name: "Bruno Martins",
  role: "Full Stack Developer",
  location: "Lisbon area, Portugal",
  email: "bruno.filipe.f.martins@gmail.com",
  linkedin: "https://www.linkedin.com/in/bfmartins",
  github: "https://github.com/BrunMartins",
  // TODO: drop the exported CV PDF into /public and set this to "/cv.pdf"
  cv: null as string | null,
  intro:
    "Full stack developer with 10+ years across frontend (React, Next.js, TypeScript), backend (Node.js, NestJS, Laravel) and infrastructure (Docker, AWS, self-hosted Linux servers).",
  about: [
    "I like owning a feature end to end: from the conversation about what people actually need, to the code, to the server it runs on.",
    "For the last decade I've also volunteered as a Scout Leader in the Portuguese Scout Association, where I now lead development of my local group's management platform.",
    "Outside work: long trips to hard-to-reach places, hiking and camping.",
  ],
};

export type Job = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

export const experience: Job[] = [
  {
    role: "Lead Developer & Infrastructure (Volunteer)",
    company: "Grupo 260 · Escoteiros de Portugal",
    period: "2016 – present",
    summary: "Built and run the group's management platform and its self-hosted infrastructure.",
  },
  {
    role: "Frontend Developer",
    company: "YTec (Netherlands)",
    period: "2025 – 2026",
    summary: "Next.js, React, TypeScript and RTK Query in an international Scrum team.",
  },
  {
    role: "Backend & DevOps Engineer",
    company: "MyPolis",
    period: "2022 – 2025",
    summary: "Backend services and AWS infrastructure for a civic-tech platform.",
  },
  {
    role: "IT Analyst",
    company: "BEWG (PT)",
    period: "2020 – 2021",
    summary: "Laravel platform development; introduced Jira and Git Flow.",
  },
  {
    role: "Full Stack Developer",
    company: "SIMBIOSE",
    period: "2018 – 2020",
    summary: "Drupal websites and Ionic/Angular mobile apps.",
  },
  {
    role: "Sysadmin & Software Developer",
    company: "Orey Serviços e Organização",
    period: "2015 – 2018",
    summary: "Company infrastructure, datacenter racks and internal tools.",
  },
];
