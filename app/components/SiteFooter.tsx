export function SiteFooter({ contact = true }: { contact?: boolean }) {
  return (
    <footer className={`site-footer${contact ? "" : " site-footer--compact"}`}>
      {contact ? (
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
      ) : null}

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Hyeseon Noh</span>
      </div>
    </footer>
  );
}
