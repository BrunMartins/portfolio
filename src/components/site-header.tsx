import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { profile } from "@/content/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { showOpenSource } from "@/content/open-source";

const home = import.meta.env.BASE_URL;

// The same links for the desktop bar and the mobile menu.
// `internal` links are app routes (wouter Link); the rest jump to home sections.
const links = [
  { label: "Projects", href: `${home}#projects` },
  ...(showOpenSource ? [{ label: "Open source", href: "/open-source", internal: true }] : []),
  { label: "Experience", href: `${home}#experience` },
  { label: "Contact", href: `${home}#contact` },
];

function NavLink({ link, className, onClick }: { link: (typeof links)[number]; className: string; onClick?: () => void }) {
  return "internal" in link && link.internal ? (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className} onClick={onClick}>
      {link.label}
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="whitespace-nowrap font-display text-xl font-bold tracking-tight">
          {profile.name}
          <span className="text-accent-bright">.</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden gap-6 text-sm text-muted sm:flex">
            {links.map((link) => (
              <NavLink key={link.label} link={link} className="hover:text-ink" />
            ))}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted hover:border-accent hover:text-ink sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-line sm:hidden">
          <ul className="mx-auto max-w-5xl px-6 py-2">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  link={link}
                  className="block py-3 text-base text-muted hover:text-ink"
                  onClick={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
