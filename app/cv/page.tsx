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
      <header className="academic-page-hero academic-page-hero--centered cv-page__hero">
        <p className="academic-page-hero__index" aria-hidden="true">
          03
        </p>
        <p className="eyebrow">Curriculum vitae</p>
        <h1>Scholarship, teaching, and service.</h1>
        <p className="academic-page-hero__intro">
          A concise web view of my academic profile. The full downloadable CV
          will be available here once the final PDF is added.
        </p>
        <div className="academic-page-hero__actions">
          {cvPdfAvailable ? (
            <a className="button button-primary" href={cvPdfPath} download>
              Download CV <span aria-hidden="true">↓</span>
            </a>
          ) : (
            <span className="button button-disabled" aria-disabled="true">
              PDF forthcoming
            </span>
          )}
        </div>
      </header>

      {cvPdfAvailable ? (
        <section
          className="cv-viewer cv-page__document"
          aria-label="Curriculum vitae PDF"
        >
          <object
            data={cvPdfPath}
            type="application/pdf"
            aria-label="Hyeseon Noh curriculum vitae PDF"
          >
            <p>
              Your browser cannot display this PDF.{" "}
              <a href={cvPdfPath}>Download the CV instead.</a>
            </p>
          </object>
        </section>
      ) : null}

      <section
        className="academic-two-column cv-summary cv-page__layout"
        aria-label="Curriculum vitae summary"
      >
        <aside
          className="academic-two-column__aside cv-sidebar"
          aria-labelledby="cv-profile-heading"
        >
          <h2 className="section-number" id="cv-profile-heading">
            Profile summary
          </h2>
          <dl className="cv-profile-list">
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
        </aside>

        <div className="academic-two-column__content cv-main">
          <section
            className="cv-section academic-section"
            aria-labelledby="cv-appointments-heading"
          >
            <h2 className="eyebrow" id="cv-appointments-heading">
              Appointments & service
            </h2>
            <ul className="cv-entries academic-entry-list">
              <li className="academic-entry-list__item">
                <span className="academic-entry-list__meta">Current</span>
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
              </li>
              <li className="academic-entry-list__item">
                <span className="academic-entry-list__meta">Current</span>
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
              </li>
              <li className="academic-entry-list__item">
                <span className="academic-entry-list__meta">Current</span>
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
              </li>
            </ul>
          </section>

          <section
            className="cv-section academic-section"
            aria-labelledby="cv-education-heading"
          >
            <h2 className="eyebrow" id="cv-education-heading">
              Education
            </h2>
            <ul className="cv-entries academic-entry-list">
              <li className="academic-entry-list__item">
                <time
                  className="academic-entry-list__meta"
                  dateTime="2026-05"
                >
                  May 2026
                </time>
                <div>
                  <h3>Ph.D., Criminology and Criminal Justice</h3>
                  <p>University of South Carolina</p>
                  <p>
                    Dissertation: Developing and Validating Asian American
                    General Strain Theory
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section
            className="cv-section academic-section"
            aria-labelledby="cv-honors-heading"
          >
            <h2 className="eyebrow" id="cv-honors-heading">
              Selected honors
            </h2>
            <ul className="award-list academic-entry-list">
              {awards.map((award) => (
                <li
                  className="academic-entry-list__item"
                  key={award.title}
                >
                  <time
                    className="academic-entry-list__meta"
                    dateTime={award.year}
                  >
                    {award.year}
                  </time>
                  <div>
                    <h3>{award.title}</h3>
                    <p>{award.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="cv-section academic-section"
            aria-labelledby="cv-publications-heading"
          >
            <h2 className="eyebrow" id="cv-publications-heading">
              Selected publications
            </h2>
            <div className="cv-publication-list">
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

          <section
            className="cv-section academic-section"
            aria-labelledby="cv-teaching-heading"
          >
            <h2 className="eyebrow" id="cv-teaching-heading">
              Teaching
            </h2>
            <ul className="cv-course-list academic-entry-list">
              {courses.map((course) => (
                <li
                  className="academic-entry-list__item"
                  key={course.code}
                >
                  <span className="academic-entry-list__meta">
                    {course.code}
                  </span>
                  <div>
                    <h3>{course.title}</h3>
                    <p>{course.terms}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
