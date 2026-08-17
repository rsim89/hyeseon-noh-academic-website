export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="eyebrow eyebrow--light">Let’s connect</p>
        <h2>Research grows through conversation.</h2>
      </div>
      <div className="footer-contact">
        <p>Academic inquiries</p>
        <a href="mailto:hnoh@email.sc.edu">hnoh@email.sc.edu</a>
        <p>Alternate contact</p>
        <a href="mailto:hnohccj@gmail.com">hnohccj@gmail.com</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Hyeseon Noh</span>
        <div>
          <a href="/research">Research</a>
          <a href="/teaching">Teaching</a>
          <a href="/cv">CV</a>
        </div>
      </div>
    </footer>
  );
}
