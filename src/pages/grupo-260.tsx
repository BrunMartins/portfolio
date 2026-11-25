import { useEffect } from "react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";


const facts = [
  ["Role", "Lead developer and infrastructure (volunteer)"],
  ["Timeframe", "2016 to present"],
  ["App", "Next.js (Server Actions), Express + TypeScript API with MikroORM, PostgreSQL 18, Redis (BullMQ, Socket.IO)"],
  ["Infrastructure", "ZimaBoard home server, Docker Swarm, Nginx, self-hosted GitHub Actions runners"],
];

const features = [
  ["Members", "Scout records, enrollments with a public pre-enrollment form, section management, attendance, personal progress"],
  ["Finance", "Invoicing (single, bulk and batch), transactions, bank reconciliation, analytical accounts, member fees, PDF invoices by email, Odoo sync"],
  ["Inventory", "Items, categories, storage spaces, requisitions, expiry tracking, a uniform bank"],
  ["Events", "A point of sale for group events"],
  ["Administration", "Users and roles, audit log, a secure shared credentials vault, real-time notifications"],
];

const challenges = [
  {
    problem: "Moving to new hardware",
    cause: "ZimaBoard 1 to ZimaBoard 2, with the NVMe/RAID moved across",
    fix: "Fixed renamed network interfaces, the bond config, DNS and Docker Swarm in under 30 minutes; moved /home off the eMMC onto NVMe.",
  },
  {
    problem: "Site unreachable",
    cause: "The No-IP dynamic DNS hostname expired",
    fix: "Replaced it with DuckDNS, updated by a minimal Alpine container running as a Swarm service.",
  },
  {
    problem: "Next.js builds crashing",
    cause: "The build ran out of memory on an 8 GB machine",
    fix: "Capped the Node heap (--max-old-space-size=2560) so builds finish without starving other services.",
  },
  {
    problem: "Deploys broke open tabs",
    cause: "Server Actions of pages opened before a deploy stop working",
    fix: "Added a version endpoint and a watcher that reloads stale tabs, saving and restoring the fields the user had edited.",
  },
  {
    problem: "Redirect loop and broken deploys",
    cause: "Cloudflare and Nginx disagreeing on HTTPS, plus failing SSH deploys",
    fix: "Fixed the Nginx/Cloudflare config and the deploy path.",
  },
  {
    problem: "Security patching",
    cause: "CVEs in Nginx (nginx2root)",
    fix: "Upgraded Nginx from the official repo to 1.30.7.",
  },
  {
    problem: "Slow, flaky CI",
    cause: "Self-hosted runners rebuilding from scratch",
    fix: "Moved runners to Debian bookworm, split them into two Swarm services with persistent cache volumes, fixed cleanup traps.",
  },
  {
    problem: "Database upgrade",
    // TODO: add the reason for the upgrade
    cause: "PostgreSQL 16 in production",
    fix: "Migrated to PostgreSQL 18.",
  },
];

const next = [
  "Automated off-site backups (Restic to S3)",
  "External uptime monitoring and self-hosted error tracking (evaluating Gatus and Bugsink)",
  "Integration with the national federation's membership system (Orgo)",
  "A built-in wiki for the group (spec drafted)",
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-16 font-display text-2xl font-bold">{children}</h2>;
}

export function Grupo260() {
  useEffect(() => {
    document.title = "PGI 260 case study · Bruno Martins";
    return () => {
      document.title = "Bruno Martins · Full Stack Developer";
    };
  }, []);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <a href="/#projects" className="text-sm font-semibold text-accent hover:underline">
        ← All projects
      </a>

      <p className="mt-10 font-display text-sm font-semibold uppercase tracking-widest text-accent">Case study</p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight">
        PGI 260: running a scout group's platform on one home server
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        I designed, built and run the internal management platform for Grupo 260, a Portuguese scout group, end to
        end: the app, the server it runs on and the pipeline that deploys it. It runs in production on self-hosted
        hardware with no cloud bill.
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
          place to find or trust the data. PGI 260 replaces them with one back office, with access set by role
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
        <li>Maintained by one to three volunteers, so deploys and upkeep had to be automated</li>
      </ul>

      <H2>Architecture</H2>
      <ArchitectureDiagram />

      <H2>Challenges solved</H2>
      <p className="mt-4 leading-relaxed text-muted">
        Running production on one small box means every failure is yours to diagnose. These are the ones worth
        telling.
      </p>
      <div className="mt-8 space-y-4">
        {challenges.map((c) => (
          <section key={c.problem} className="rounded-2xl border border-line p-5">
            <h3 className="font-display font-semibold">{c.problem}</h3>
            <p className="mt-1 text-sm text-muted">
              <span className="font-semibold text-ink">Cause:</span> {c.cause}
            </p>
            <p className="mt-2 leading-relaxed">{c.fix}</p>
          </section>
        ))}
      </div>

      <H2>Results and what's next</H2>
      <p className="mt-4 leading-relaxed text-muted">
        The platform runs in production for the group with no cloud hosting bill (the only running cost is the
        server's power draw, an estimated €1.50–3 a month), and every push deploys through a self-hosted CI pipeline.
      </p>
      {/* TODO: add one or two real numbers — users, time running, time saved */}
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
