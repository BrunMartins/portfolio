import { ProjectCard } from "@/components/project-card";
import { education, experience, profile, training } from "@/content/profile";
import { projects } from "@/content/projects";

export function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-20 sm:pt-28">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
          {profile.role} · {profile.location}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          I build web platforms and the servers they run on.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 dark:text-paper"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-accent"
          >
            See projects
          </a>
          {profile.cv && (
            <a
              href={profile.cv}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-accent"
            >
              Download CV
            </a>
          )}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-display text-2xl font-bold">Selected projects</h2>
          <p className="mt-2 text-muted">Things I've built, mostly to solve a real problem I had.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About + experience */}
      <section id="experience" className="scroll-mt-20 border-t border-line bg-panel">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl font-bold">About</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <h2 className="mt-12 font-display text-2xl font-bold">Education</h2>
            <ul className="mt-6 space-y-4">
              {education.map((course) => (
                <li key={course.name}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{course.period}</p>
                  <h3 className="mt-1 font-display font-semibold">{course.name}</h3>
                  <p className="text-sm text-accent">{course.school}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted">Training</h3>
            <ul className="mt-3 space-y-3 text-sm">
              {training.map((t) => (
                <li key={t.name}>
                  <span className="font-semibold">{t.name}</span>
                  {t.note && <span className="text-muted"> ({t.note})</span>}
                  <span className="block text-muted">
                    {t.provider} · {t.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Experience</h2>
            <ol className="mt-6 space-y-6 border-l border-line pl-6">
              {experience.map((job) => (
                <li key={`${job.company}-${job.period}`} className="relative">
                  <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-accent-bright" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{job.period}</p>
                  <h3 className="mt-1 font-display font-semibold">{job.role}</h3>
                  <p className="text-sm text-accent">{job.company}</p>
                  <p className="mt-1 text-sm text-muted">{job.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-display text-2xl font-bold">Let's talk</h2>
          <p className="mt-2 max-w-xl text-muted">
            Open to full stack, frontend and backend roles, remote or around Lisbon.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-semibold">
            <li>
              <a href={`mailto:${profile.email}`} className="text-accent hover:underline">{profile.email}</a>
            </li>
            <li>
              <a href={profile.linkedin} className="text-accent hover:underline" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </li>
            <li>
              <a href={profile.github} className="text-accent hover:underline" target="_blank" rel="noreferrer">GitHub ↗</a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
