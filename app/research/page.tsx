import { PublicationItem } from "../components/PublicationItem";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { researchAreas } from "../data/siteContent";
import { buildPageMetadata } from "../lib/metadata";

function formatNohName(text: string) {
  return text.split(/(Noh, H\.\*?)/g).map((part, index) =>
    /^Noh, H\.\*?$/.test(part) ? (
      <strong key={`${part}-${index}`}>{part}</strong>
    ) : (
      part
    ),
  );
}

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
        <h1 id="research-page-title" className="research-editorial-hero__title">
          Research
        </h1>
        <p className="research-editorial-hero__statement">
          From overlooked harm to legible response.
        </p>
        <p className="research-editorial-hero__intro">
          My research focuses on overlooked forms of victimization. I approach
          this work using quantitative and computational methods. My work
          develops in four areas, each moving from documenting harm toward
          building responses to it:
        </p>
      </header>

      <nav className="research-program-nav" aria-label="Research programs">
        <ol className="research-program-nav__list">
          {researchAreas.map((area) => (
            <li key={area.id}>
              <a href={`#${area.id}`}>{area.shortTitle}</a>
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
              </header>
              <ul className="research-program__project-list">
                {area.projects.map((project) => (
                  <li key={project.text}>
                    <span>{project.status}</span>
                    <p>{formatNohName(project.text)}</p>
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
        </a>
        <a className="research-closing__cv-link" href="/cv">
          Please see my CV for a complete list of publications.
        </a>
      </section>
      <SiteFooter contact={false} />
    </main>
  );
}
