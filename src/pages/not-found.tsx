import { Link } from "wouter";

export function NotFound() {
  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-24">
      {/* Faint map grid, a nod to the GPX tool */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.2] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="relative text-center">
        <p className="font-display text-7xl font-bold tracking-tight text-accent sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">You're off the map</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">This page doesn't exist, or it has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <Link href="/" className="rounded-full bg-accent px-5 py-2.5 text-on-accent hover:opacity-90">
            Back home
          </Link>
          <a
            href={`${import.meta.env.BASE_URL}#projects`}
            className="rounded-full border border-line px-5 py-2.5 hover:border-accent/40"
          >
            See projects
          </a>
        </div>
      </div>
    </section>
  );
}
