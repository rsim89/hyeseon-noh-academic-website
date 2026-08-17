import { PageHero } from "../components/PageHero";
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
      <PageHero
        index="01"
        eyebrow="Research"
        title="From overlooked harm to legible response."
        intro="My research focuses on overlooked forms of victimization. Using quantitative and computational methods, I connect four areas—each moving from documenting harm toward building a response."
      />

      <nav className="section-jump" aria-label="Research areas">
        {researchAreas.map((area) => (
          <a href={`#${area.id}`} key={area.id}>
            <span>{area.number}</span>
            {area.shortTitle}
          </a>
        ))}
      </nav>

      <div className="research-areas">
        {researchAreas.map((area) => (
          <section className="research-area" id={area.id} key={area.id}>
            <div className="research-area__heading">
              <p className="section-number">{area.number} / Research area</p>
              <h2>{area.title}</h2>
              <p className="research-area__thesis">{area.thesis}</p>
            </div>

            <div className="research-area__body">
              <p className="long-copy">{area.description}</p>

              <aside className="question-panel">
                <p className="eyebrow">Key questions</p>
                <ol>
                  {area.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ol>
              </aside>
            </div>

            {area.dissertation ? (
              <div className="dissertation-feature">
                <div>
                  <p className="eyebrow eyebrow--light">Dissertation</p>
                  <h3>{area.dissertation.title}</h3>
                </div>
                <p>{area.dissertation.text}</p>
              </div>
            ) : null}

            <div className="research-list-block">
              <div className="list-heading">
                <p className="eyebrow">Featured publications</p>
                <span>{String(area.publications.length).padStart(2, "0")}</span>
              </div>
              <div>
                {area.publications.map((publication) => (
                  <PublicationItem
                    publication={publication}
                    key={publication.title}
                  />
                ))}
              </div>
            </div>

            <div className="research-list-block project-block">
              <div className="list-heading">
                <p className="eyebrow">Current projects</p>
                <span>{String(area.projects.length).padStart(2, "0")}</span>
              </div>
              <div className="project-list">
                {area.projects.map((project) => (
                  <article key={project.text}>
                    <span>{project.status}</span>
                    <p>{project.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="closing-cta">
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
