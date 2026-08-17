import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { buildPageMetadata } from "../lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "CV | Hyeseon Noh",
    "View or download Hyeseon Noh’s curriculum vitae, updated August 2026.",
  );
}

const cvPdfPath = "/hyeseon-noh-cv.pdf";

export default function CVPage() {
  return (
    <main className="cv-page">
      <SiteHeader active="cv" />

      <header className="cv-document-hero" aria-labelledby="cv-page-title">
        <h1 id="cv-page-title">CV</h1>
        <p className="cv-document-hero__filename">
          Hyeseon_Noh_CV_August_2026.pdf
        </p>
        <p className="cv-document-hero__updated">Updated August 2026</p>
        <nav className="cv-document-hero__actions" aria-label="CV actions">
          <a href={cvPdfPath} target="_blank" rel="noreferrer">
            Open
          </a>
          <a href={cvPdfPath} download>
            Download
          </a>
        </nav>
      </header>

      <section className="cv-viewer" aria-label="Curriculum vitae PDF">
        <object
          data={cvPdfPath}
          type="application/pdf"
          aria-label="Hyeseon Noh curriculum vitae PDF"
        >
          <p>
            Your browser cannot display this PDF. You can{" "}
            <a href={cvPdfPath} download>
              download the CV
            </a>{" "}
            instead.
          </p>
        </object>
      </section>

      <SiteFooter contact={false} />
    </main>
  );
}
