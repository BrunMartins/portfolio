import { Link } from "wouter";
import { profile } from "@/content/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { showOpenSource } from "@/content/open-source";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="whitespace-nowrap font-display text-xl font-bold tracking-tight">
          {profile.name}
          <span className="text-accent-bright">.</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden gap-6 text-sm text-muted sm:flex">
            <a href={`${import.meta.env.BASE_URL}#projects`} className="hover:text-ink">Projects</a>
            {showOpenSource && (
              <Link href="/open-source" className="hover:text-ink">Open source</Link>
            )}
            <a href={`${import.meta.env.BASE_URL}#experience`} className="hover:text-ink">Experience</a>
            <a href={`${import.meta.env.BASE_URL}#contact`} className="hover:text-ink">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
