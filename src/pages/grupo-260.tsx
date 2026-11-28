import { useEffect } from "react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";


const facts = [
  ["Role", "Lead developer and infrastructure (volunteer)"],
  [
    "Team",
    "I built most of the platform. Another volunteer developer contributed from 2023 to 2026, on division management, scouts' personal progress and invoicing. One volunteer currently helps with maintenance and bug fixes.",
  ],
  ["Timeframe", "2016 to present"],
  [
    "Evolution",
    "Started as a React app with an Express API. The frontend moved to Next.js in early 2024; moving the backend into it is the next step.",
  ],
  [
    "App",
    "Next.js, with Server Actions as a server-side layer in front of the API that keeps secrets and session data off the client; Express + TypeScript API with MikroORM, PostgreSQL 18, Redis (BullMQ, Socket.IO)",
  ],
  ["Infrastructure", "ZimaBoard home server, Docker Swarm, Nginx, self-hosted GitHub Actions runners"],
];

const features = [
  ["Members", "Scout records, enrollments with a public pre-enrollment form, section management, attendance, personal progress"],
  ["Finance", "Invoicing (single, bulk and batch), transactions, bank reconciliation, analytical accounts, member fees, PDF invoices by email, Odoo sync"],
  ["Inventory", "Items, categories, storage spaces, requisitions, expiry tracking, a uniform bank"],
  ["Events", "A point of sale for group events"],
  ["Administration", "Users and roles, audit log, a secure shared credentials vault, real-time notifications"],
];

// Why the stack looks the way it does, with the trade-off each choice accepts.
const decisions = [
  {
    title: "Next.js in front of the Express API",
    why: "The Express API is large, so instead of a risky big-bang rewrite I ported the frontend first. Server Actions sit between the browser and the API as a server-side layer, keeping API secrets and session data off the client. The API's endpoints can then move into Next.js one at a time.",
    tradeoff: "Until the migration is done, there are two server layers to maintain, and each request takes an extra hop.",
  },
  {
    title: "Single-node Docker Swarm",
    why: "Swarm gives zero-downtime rolling deploys, which plain Docker Compose doesn't, with far less overhead than k3s on a 4-core, 8 GB machine. It reuses the same compose files, so there's little for a volunteer team to learn.",
    tradeoff: "One node means the server is a single point of failure. That's acceptable for an internal tool whose users can wait for a repair, and it's part of why backups are the next priority.",
  },
  {
    title: "Odoo for bank data",
    why: "The group ran on Odoo from 2016 to 2024. Invoicing moved into the platform at the end of 2024 and went live at the start of the January 2025 fiscal year, but Odoo stays for one job: fetching bank transactions for reconciliation. It's certified to connect to bank APIs, which a small group couldn't get on its own, and a single Odoo app is free. I'm evaluating Enable Banking as a direct replacement, testing it first in a personal project.",
    tradeoff: "Bank data depends on a third-party system and a sync job, one more moving part that can break.",
  },
  {
    title: "Cloudflare and dynamic DNS",
    why: "The national association manages every group's DNS record in its own Cloudflare account, and groups can't edit theirs. What a group can do is have it point at a name it controls, so ours points at a dynamic DNS hostname that a small container on the server keeps updated with the home connection's changing IP.",
    tradeoff: "Two outside parties sit in the chain: changing the record needs the association, and the dynamic DNS service is free, with no guarantees.",
  },
];

// Each challenge is told as situation, problem and solution; routine work is a short list.
type Challenge = {
  title: string;
  situation?: string;
  problem?: string;
  solution?: string;
  items?: string[];
};

const challenges: Challenge[] = [
  {
    title: "Deploys broke open tabs",
    situation:
      "Next.js Server Actions are tied to the build that served the page, so a tab opened before a deploy keeps calling actions that no longer exist on the server.",
    problem:
      "The first form submit after a deploy failed with \u201cFailed to find Server Action\u201d. A volunteer could fill in a long form, press save, and lose the work.",
    solution:
      "Added a version endpoint that changes with every deploy, and a watcher at the top of the React tree that checks it every 5 minutes and whenever the tab regains focus. When the tab is stale, the page reloads. On pages with forms, it first saves the entered values to sessionStorage by field name (never passwords) and fills them back in after the reload.",
  },
  {
    title: "Moving to new hardware",
    situation:
      "The platform moved from a ZimaBoard 1 to a ZimaBoard 2, taking its NVMe system drive and RAID data drives with it. Beforehand, I captured the disks, fstab, network bond and link speeds, and flagged the two likely failure points: renamed network interfaces and the boot order.",
    problem:
      "Storage came up untouched, since fstab used UUIDs. As expected, the network interfaces got new names, so the bond had no members and the server came up on a different IP. Unexpectedly, NetworkManager also wrote a link-local IPv6 resolver into /etc/resolv.conf, which broke DNS.",
    solution:
      "Updated the bond members in /etc/network/interfaces to bring the server back on its static IP, pointed DNS at the gateway, and locked resolv.conf against overwrites. Then checked the RAID array, the Swarm services and both network links (~940 Mbit/s with iperf3). Downtime was under an hour, announced to the group in advance.",
  },
  {
    title: "Self-hosted CI and builds",
    situation: "CI runs on two self-hosted GitHub Actions runners, on the same 8 GB server as production.",
    problem: "Next.js builds ran out of memory, every run rebuilt from scratch, and deploys started failing over SSH.",
    solution:
      "Capped the build's Node heap so builds finish without starving production. Split the runners into two Swarm services, each with a persistent cache volume that also keeps the Next.js build cache. Traced the failing deploys to a deleted SSH deploy key, and moved deploy keys into GitHub Secrets, written at run time and removed afterwards.",
  },
  {
    title: "Security patching",
    situation: "Nginx is the public entry point and serves HTTP/2.",
    problem:
      "Critical remote-code-execution bugs in Nginx's HTTP/2 handling (CVE-2026-123007, CVE-2026-123633) left the reverse proxy exposed.",
    solution:
      "Upgraded to Nginx 1.30.7 from the official repo two days after the fix was released on 18 November 2026.",
  },
  {
    title: "Routine upkeep",
    items: [
      "Replaced an expired No-IP dynamic DNS hostname with DuckDNS, updated by a small Alpine container running as a Swarm service.",
      "Fixed a redirect loop caused by Cloudflare and Nginx disagreeing about HTTPS.",
      "Upgraded PostgreSQL 16 to 18 to stay on a current, supported release with security fixes: dumped with pg_dumpall into a second container running alongside the old one, compared row counts, then switched over.",
    ],
  },
];

const next = [
  "Merge the Express API into Next.js. The Server Actions already sit between the browser and the API, so they act as the transitional layer while endpoints move over",
  "Automated off-site backups (Restic to S3), scheduled for Q1 2027. Until then, the lack of off-site backups is a known risk that I've accepted",
  "External uptime monitoring and self-hosted error tracking (evaluating Gatus and Bugsink)",
  "Integration with the national federation's membership system (Orgo)",
  "A built-in wiki for the group (spec drafted)",
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-16 font-display text-2xl font-bold">{children}</h2>;
}

export function Grupo260() {
  useEffect(() => {
    document.title = "Grupo 260 Platform case study · Bruno Martins";
    return () => {
      document.title = "Bruno Martins · Full Stack Developer";
    };
  }, []);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <a href={`${import.meta.env.BASE_URL}#projects`} className="text-sm font-semibold text-accent hover:underline">
        ← All projects
      </a>

      <p className="mt-10 font-display text-sm font-semibold uppercase tracking-widest text-accent">Case study</p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight">
        Grupo 260 Platform: a scout group's back office on one home server
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        I designed, built and run the internal management platform for Grupo 260, a Portuguese scout group, end to
        end: the app, the server it runs on and the pipeline that deploys it.
      </p>

      <dl className="mt-10 grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-panel p-6 sm:grid-cols-[auto_1fr]">
        {facts.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-sm font-semibold">{label}</dt>
            <dd className="text-sm text-muted">{value}</dd>
          </div>
        ))}
      </dl>

      <H2>Context and problem</H2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">
        <p>
          Grupo 260 is a local scout group in Seixal, part of the Portuguese Scout Association (AEP). Its leaders are
          volunteers, so any tool has to be simple to use and cheap to run.
        </p>
        <p>
          Before the platform, the group's records lived in spreadsheets spread across Google Drive, with no single
          place to find or trust the data. The platform (internally PGI 260) replaces them with one back office, with access set by role
          (admin, group leader, treasurer):
        </p>
      </div>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {features.map(([area, text]) => (
          <div key={area} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="font-display font-semibold">{area}</dt>
            <dd className="text-muted">{text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 leading-relaxed text-muted">Constraints that shaped the design:</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted marker:text-accent-bright">
        <li>No budget for cloud hosting, so it runs on a small home server</li>
        <li>Single organisation, so no multi-tenancy</li>
        <li>Maintained by a small volunteer team (one to three people over the years), so deploys and upkeep had to be automated</li>
      </ul>

      <H2>Architecture</H2>
      <ArchitectureDiagram />

      <H2>Design decisions</H2>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {decisions.map((d) => (
          <div key={d.title} className="py-5">
            <dt className="font-display text-lg font-semibold">{d.title}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{d.why}</dd>
            <dd className="mt-3 text-sm leading-relaxed text-muted">
              <span className="font-semibold text-ink">Trade-off:</span> {d.tradeoff}
            </dd>
          </div>
        ))}
      </dl>

      <H2>Challenges solved</H2>
      <p className="mt-4 leading-relaxed text-muted">
        With production on a single home server, there's no one else to hand a problem to. These are the ones that
        taught me the most.
      </p>
      <div className="mt-8 space-y-6">
        {challenges.map((c) => (
          <section key={c.title} className="rounded-2xl border border-line p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold">{c.title}</h3>
            {c.items ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-accent-bright">
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <dl className="mt-3 space-y-3">
                {(
                  [
                    ["Situation", c.situation],
                    ["What went wrong", c.problem],
                    ["What I did", c.solution],
                  ] as const
                ).map(([label, text]) =>
                  text ? (
                    <div key={label}>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-accent">{label}</dt>
                      <dd className="mt-1 leading-relaxed text-muted">{text}</dd>
                    </div>
                  ) : null,
                )}
              </dl>
            )}
          </section>
        ))}
      </div>

      <H2>Results and what's next</H2>
      <p className="mt-4 leading-relaxed text-muted">
        The platform is the group's day-to-day system. It holds 101 members, and 9 to 10 of the 13 leaders use it
        themselves in a typical month, mostly without needing help. Since invoicing moved into the app, it has issued over 1,600 invoices
        (1,215 so far in 2026, up from 386 in 2025) and matched about 900 bank transactions to them. The only running
        cost is the server's power draw, an estimated €1.50–3 a month.
      </p>
      <p className="mt-6 leading-relaxed text-muted">Planned next:</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted marker:text-accent-bright">
        {next.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* TODO: add 2–3 screenshots with fake data only (put them in /public/projects/grupo-260/) */}
    </article>
  );
}
