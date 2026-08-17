import Link from "next/link";

type SiteHeaderProps = {
  active?: "home" | "research" | "teaching" | "cv" | "about";
  tone?: "light" | "dark";
};

const navItems = [
  { label: "Home", href: "/", id: "home" },
  { label: "CV", href: "/cv", id: "cv" },
  { label: "Research", href: "/research", id: "research" },
  { label: "Teaching", href: "/teaching", id: "teaching" },
  { label: "About Me", href: "/about", id: "about" },
] as const;

export function SiteHeader({ active, tone = "light" }: SiteHeaderProps) {
  return (
    <header className={`site-header site-header--${tone}`}>
      <Link className="wordmark" href="/" aria-label="Hyeseon Noh home">
        <span className="wordmark__name">Hyeseon Noh</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active === item.id ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <details className="mobile-nav">
        <summary aria-label="Toggle navigation">
          <span className="mobile-nav__label">Menu</span>
          <span className="mobile-nav__icon" aria-hidden="true">
            +
          </span>
        </summary>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
