import { Link } from "wouter";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { title, tagline, description, stack, caseStudy, links, featured } = project;

  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 transition-colors ${
        featured
          ? "border-accent/40 bg-panel md:col-span-2"
          : "border-line hover:border-accent/40"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">{tagline}</p>
      <h3 className="mt-2 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-3 leading-relaxed text-muted">{description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
            {tech}
          </li>
        ))}
      </ul>

      {(caseStudy || links?.length) && (
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          {caseStudy && (
            <Link href={caseStudy} className="text-accent hover:underline">
              Read the case study →
            </Link>
          )}
          {links?.map((link) => (
            <a key={link.href} href={link.href} className="text-accent hover:underline" target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
