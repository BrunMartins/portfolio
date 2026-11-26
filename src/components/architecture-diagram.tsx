// The Grupo 260 architecture, drawn as inline SVG. Colours come from the
// Tailwind theme (fill-*/stroke-* classes), so dark mode just works.

const W = 180;
const H = 56;
const col = { a: 40, b: 290, c: 540 };
const mid = { a: col.a + W / 2, b: col.b + W / 2, c: col.c + W / 2 };
const row = { top: 52, one: 168, two: 264, three: 360 };

function Box({ x, y, name, body, main = false }: { x: number; y: number; name: string; body: string; main?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={W}
        height={H}
        rx={8}
        className={main ? "fill-accent-bright/14 stroke-accent" : "fill-paper stroke-muted/50"}
        strokeWidth={main ? 2 : 1.25}
      />
      <text x={x + 12} y={y + 24} fontSize={13} fontWeight={600} className="fill-ink">
        {name}
      </text>
      <text x={x + 12} y={y + 41} fontSize={11.5} className="fill-muted">
        {body}
      </text>
    </g>
  );
}

export function ArchitectureDiagram() {
  const arrow = "url(#arch-arrow)";
  return (
    <figure className="my-10">
      <svg
        viewBox="0 0 760 464"
        role="img"
        aria-label="Architecture: one home server runs the whole platform"
        className="h-auto w-full font-sans"
      >
        <defs>
          <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className="fill-muted" />
          </marker>
        </defs>

        <rect x={24} y={128} width={712} height={312} rx={10} className="fill-panel stroke-line" />
        <text x={40} y={152} fontSize={13} fontWeight={600} className="fill-muted font-display">
          ZimaBoard 2 home server · Docker Swarm
        </text>

        <g className="fill-none stroke-muted/70" strokeWidth={1.25}>
          <path d={`M${col.a + W} ${row.top + 28}H${col.b}`} markerEnd={arrow} />
          <path d={`M${mid.b} ${row.top + H}V${row.one}`} markerEnd={arrow} />
          <path d={`M${mid.c} ${row.top + H}V${row.one}`} markerEnd={arrow} />
          <path d={`M${mid.b} ${row.one + H}V${row.two}`} markerEnd={arrow} />
          <path d={`M${mid.b} ${row.two + H}V${row.three}`} markerEnd={arrow} />
          <path d={`M${col.b} ${row.three + 28}H${col.a + W}`} markerEnd={arrow} />
          <path d={`M${col.b + W} ${row.three + 28}H${col.c}`} markerEnd={arrow} />
          <path d={`M${mid.c} ${row.one + H}V${row.two + 28}H${col.b + W}`} markerEnd={arrow} />
        </g>

        <Box x={col.a} y={row.top} name="Browser" body="group leaders and members" />
        <Box x={col.b} y={row.top} name="Cloudflare" body="in front of the site" />
        <Box x={col.c} y={row.top} name="GitHub" body="source and Actions" />

        <Box x={col.a} y={row.one} name="DuckDNS updater" body="minimal Alpine container" />
        <Box x={col.b} y={row.one} name="Nginx" body="reverse proxy, HTTP/2" />
        <Box x={col.c} y={row.one} name="Actions runners" body="2 self-hosted services" />

        <Box x={col.b} y={row.two} name="Next.js app" body="UI and Server Actions" main />

        <Box x={col.a} y={row.three} name="PostgreSQL 18" body="main database" />
        <Box x={col.b} y={row.three} name="Node.js backend" body="Express API, BullMQ jobs" />
        <Box x={col.c} y={row.three} name="Redis" body="queues, token revocation" />

        <text x={mid.c + 10} y={144} fontSize={11.5} className="fill-muted">push</text>
        <text x={mid.c + 10} y={252} fontSize={11.5} className="fill-muted">deploys</text>
      </svg>
      <figcaption className="mt-3 text-sm text-muted">
        Everything runs on one ZimaBoard 2, with Nginx on the host in front of the containers. A push to GitHub
        triggers the self-hosted runners, which build and deploy the app in place.
      </figcaption>
    </figure>
  );
}
