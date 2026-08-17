type SiteHeaderProps = {
  active?: "research" | "teaching" | "cv" | "about";
  tone?: "light" | "dark";
};

const navItems = [
  { label: "Research", href: "/research", id: "research" },
  { label: "Teaching", href: "/teaching", id: "teaching" },
  { label: "About", href: "/about", id: "about" },
] as const;

export function SiteHeader({ active, tone = "light" }: SiteHeaderProps) {
  return (
    <header className={`site-header site-header--${tone}`}>
      <a className="wordmark" href="/" aria-label="Hyeseon Noh home">
        <span>HN</span>
        <strong>Hyeseon Noh</strong>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            aria-current={active === item.id ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
        <a
          className="nav-cv"
          href="/cv"
          aria-current={active === "cv" ? "page" : undefined}
        >
          CV
        </a>
      </nav>

      <details className="mobile-nav">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="/">Home</a>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a href="/cv" aria-current={active === "cv" ? "page" : undefined}>
            CV
          </a>
        </nav>
      </details>
    </header>
  );
}
