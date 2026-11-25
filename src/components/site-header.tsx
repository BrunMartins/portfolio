import { Link } from "wouter";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="whitespace-nowrap font-display text-lg font-bold tracking-tight">
          {profile.name}
          <span className="text-accent-bright">.</span>
        </Link>
        <nav className="flex gap-4 text-sm text-muted sm:gap-6">
          <a href="/#projects" className="hover:text-ink">Projects</a>
          <a href="/#experience" className="hover:text-ink">Experience</a>
          <a href="/#contact" className="hover:text-ink">Contact</a>
        </nav>
      </div>
    </header>
  );
}
