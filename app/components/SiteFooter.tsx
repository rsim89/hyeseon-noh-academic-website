import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-lead">
          <p className="eyebrow eyebrow--light">Let’s connect</p>
          <h2>Research grows through conversation.</h2>
        </div>

        <address className="footer-contact">
          <div className="footer-contact__item">
            <p>Academic inquiries</p>
            <a href="mailto:hnoh@email.sc.edu">hnoh@email.sc.edu</a>
          </div>
          <div className="footer-contact__item">
            <p>Alternate contact</p>
            <a href="mailto:hnohccj@gmail.com">hnohccj@gmail.com</a>
          </div>
        </address>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Hyeseon Noh</span>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/research">Research</Link>
          <Link href="/teaching">Teaching</Link>
          <Link href="/cv">CV</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </footer>
  );
}
