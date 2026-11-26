import { useEffect } from "react";
import { contributions } from "@/content/open-source";

const statusStyle = {
  merged: "border-accent/40 text-accent",
  open: "border-line text-muted",
  closed: "border-line text-muted line-through",
};

export function OpenSource() {
  useEffect(() => {
    document.title = "Open source · Bruno Martins";
    return () => {
      document.title = "Bruno Martins · Full Stack Developer";
    };
  }, []);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Open source</p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight">Contributions</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Changes I've contributed to other people's projects, usually because I ran into the problem myself.
      </p>

      <ol className="mt-12 space-y-6">
        {contributions.map((c) => (
          <li key={`${c.project}-${c.title}`} className="rounded-2xl border border-line p-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider">
              <a href={c.repo} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                {c.project}
              </a>
              <span className="text-muted">{c.year}</span>
              {c.status && (
                <span className={`rounded-full border px-2 py-0.5 normal-case tracking-normal ${statusStyle[c.status]}`}>
                  {c.status}
                </span>
              )}
            </div>
            <h2 className="mt-2 font-display text-xl font-semibold">{c.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{c.description}</p>
            {c.pr && (
              <a
                href={c.pr}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
              >
                Pull request ↗
              </a>
            )}
          </li>
        ))}
      </ol>
    </article>
  );
}
