import { PageHero } from "../components/PageHero";
import { PublicationItem } from "../components/PublicationItem";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import {
  courses,
  institutionLinks,
  selectedPublications,
} from "../data/siteContent";
import { buildPageMetadata } from "../lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "CV | Hyeseon Noh",
    "Appointments, education, selected publications, awards, and teaching for criminologist Hyeseon Noh.",
  );
}

const cvPdfAvailable = false;
const cvPdfPath = "/hyeseon-noh-cv.pdf";

const awards = [
  {
    year: "2026",
    title: "Student Scholarship Mini-Grant Travel Award",
    body: "Academy of Criminal Justice Sciences · People of Color and Women",
  },
  {
    year: "2024",
    title: "Student Research Award",
    body: "Association of Doctoral Programs in Criminology and Criminal Justice",
  },
  {
    year: "2023",
    title: "Helen Taylor Greene and Vernetta D. Young Graduate Fellowship",
    body: "ASC Division on People of Color and Crime",
  },
];

export default function CVPage() {
  return (
    <main>
      <SiteHeader active="cv" />
      <PageHero
        index="03"
        eyebrow="Curriculum vitae"
        title="Scholarship, teaching, and service."
        intro="A concise web view of my academic profile. The full downloadable CV will be available here once the final PDF is added."
      >
        {cvPdfAvailable ? (
          <a className="button button-primary" href={cvPdfPath} download>
            Download CV <span aria-hidden="true">↓</span>
          </a>
        ) : (
          <span className="button button-disabled" aria-disabled="true">
            PDF forthcoming
          </span>
        )}
      </PageHero>

      {cvPdfAvailable ? (
        <section className="cv-viewer" aria-label="Curriculum vitae PDF">
          <object data={cvPdfPath} type="application/pdf">
            <p>
              Your browser cannot display this PDF.{" "}
              <a href={cvPdfPath}>Download the CV instead.</a>
            </p>
          </object>
        </section>
      ) : null}

      <section className="cv-summary">
        <div className="cv-sidebar">
          <p className="section-number">Profile summary</p>
          <dl>
            <div>
              <dt>Field</dt>
              <dd>Criminology & Criminal Justice</dd>
            </div>
            <div>
              <dt>Methods</dt>
              <dd>Quantitative · Computational</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Columbia, South Carolina</dd>
            </div>
          </dl>
        </div>

        <div className="cv-main">
          <section className="cv-section">
            <p className="eyebrow">Appointments & service</p>
            <div className="cv-entries">
              <article>
                <span>Current</span>
                <div>
                  <h3>Bridge Humanities Teaching Fellow</h3>
                  <a
                    href={institutionLinks.bridgeHumanities}
                    target="_blank"
                    rel="noreferrer"
                  >
                    University of South Carolina ↗
                  </a>
                </div>
              </article>
              <article>
                <span>Current</span>
                <div>
                  <h3>Managing Editor</h3>
                  <a
                    href={institutionLinks.raceAndJustice}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Race and Justice: An International Journal ↗
                  </a>
                </div>
              </article>
              <article>
                <span>Current</span>
                <div>
                  <h3>Membership Committee Member</h3>
                  <a
                    href={institutionLinks.internationalCriminology}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ASC Division of International Criminology ↗
                  </a>
                </div>
              </article>
            </div>
          </section>

          <section className="cv-section">
            <p className="eyebrow">Education</p>
            <div className="cv-entries">
              <article>
                <span>May 2026</span>
                <div>
                  <h3>Ph.D., Criminology and Criminal Justice</h3>
                  <p>University of South Carolina</p>
                  <p>
                    Dissertation: Developing and Validating Asian American
                    General Strain Theory
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="cv-section">
            <p className="eyebrow">Selected honors</p>
            <div className="award-list">
              {awards.map((award) => (
                <article key={award.title}>
                  <span>{award.year}</span>
                  <div>
                    <h3>{award.title}</h3>
                    <p>{award.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <p className="eyebrow">Selected publications</p>
            <div>
              {selectedPublications.map((publication) => (
                <PublicationItem
                  compact
                  publication={publication}
                  key={publication.title}
                />
              ))}
            </div>
            <a className="inline-arrow" href="/research">
              View all featured research <span aria-hidden="true">↗</span>
            </a>
          </section>

          <section className="cv-section">
            <p className="eyebrow">Teaching</p>
            <div className="cv-course-list">
              {courses.map((course) => (
                <article key={course.code}>
                  <span>{course.code}</span>
                  <div>
                    <h3>{course.title}</h3>
                    <p>{course.terms}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
