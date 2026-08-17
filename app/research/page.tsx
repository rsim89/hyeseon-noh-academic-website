import { PublicationItem } from "../components/PublicationItem";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { researchAreas } from "../data/siteContent";
import { buildPageMetadata } from "../lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "Research | Hyeseon Noh",
    "Four connected research programs on overlooked victimization, technology-facilitated violence, victim protection, and AI.",
  );
}

export default function ResearchPage() {
  return (
    <main>
      <SiteHeader active="research" />
      <header
        className="research-editorial-hero"
        aria-labelledby="research-page-title"
      >
        <p className="section-number research-editorial-hero__index">
          01 / Research
        </p>
        <h1 id="research-page-title" className="research-editorial-hero__title">
          Research
        </h1>
        <p className="research-editorial-hero__statement">
          From overlooked harm to legible response.
        </p>
        <p className="research-editorial-hero__intro">
          My research focuses on overlooked forms of victimization. Using
          quantitative and computational methods, I connect four areas—each
          moving from documenting harm toward building a response.
        </p>
      </header>

      <nav className="research-program-nav" aria-label="Research programs">
        <ol className="research-program-nav__list">
          {researchAreas.map((area) => (
            <li key={area.id}>
              <a href={`#${area.id}`}>
                <span className="research-program-nav__number">
                  {area.number}
                </span>
                {area.shortTitle}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="research-programs">
        {researchAreas.map((area) => (
          <article
            className="research-program"
            id={area.id}
            key={area.id}
            aria-labelledby={`${area.id}-title`}
          >
            <header className="research-program__header">
              <p className="section-number research-program__number">
                {area.number} / Research area
              </p>
              <h2 id={`${area.id}-title`}>{area.title}</h2>
              <p className="research-program__thesis">{area.thesis}</p>
            </header>

            <div className="research-program__prose">
              <p>{area.description}</p>
            </div>

            <section
              className="research-program__questions"
              aria-labelledby={`${area.id}-questions`}
            >
              <h3 id={`${area.id}-questions`}>Key questions</h3>
              <ol>
                {area.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            </section>

            {area.dissertation ? (
              <aside
                className="research-program__dissertation"
                aria-labelledby={`${area.id}-dissertation`}
              >
                <p className="eyebrow">Dissertation</p>
                <h3 id={`${area.id}-dissertation`}>
                  {area.dissertation.title}
                </h3>
                <p>{area.dissertation.text}</p>
              </aside>
            ) : null}

            <section
              className="research-program__section research-program__publications"
              aria-labelledby={`${area.id}-publications`}
            >
              <header className="research-program__section-heading">
                <h3 id={`${area.id}-publications`}>Featured publications</h3>
                <span
                  className="research-program__count"
                  aria-label={`${area.publications.length} featured publications`}
                >
                  {String(area.publications.length).padStart(2, "0")}
                </span>
              </header>
              <div>
                {area.publications.map((publication) => (
                  <PublicationItem
                    publication={publication}
                    key={publication.title}
                  />
                ))}
              </div>
            </section>

            <section
              className="research-program__section research-program__projects"
              aria-labelledby={`${area.id}-projects`}
            >
              <header className="research-program__section-heading">
                <h3 id={`${area.id}-projects`}>Current projects</h3>
                <span
                  className="research-program__count"
                  aria-label={`${area.projects.length} current projects`}
                >
                  {String(area.projects.length).padStart(2, "0")}
                </span>
              </header>
              <ul className="research-program__project-list">
                {area.projects.map((project) => (
                  <li key={project.text}>
                    <span>{project.status}</span>
                    <p>{project.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        ))}
      </div>

      <section className="closing-cta research-closing">
        <p className="eyebrow eyebrow--light">The connecting thread</p>
        <h2>Who is recognized—and what changes once they are?</h2>
        <a className="button button-light" href="/teaching">
          See how this question enters the classroom
          <span aria-hidden="true">↗</span>
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
