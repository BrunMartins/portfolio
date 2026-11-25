import { Link } from "wouter";

export function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold">This page doesn't exist</h1>
      <Link href="/" className="mt-8 inline-block font-semibold text-accent hover:underline">
        ← Back home
      </Link>
    </section>
  );
}
