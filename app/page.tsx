import { PublicationItem } from "./components/PublicationItem";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import {
  institutionLinks,
  researchAreas,
  selectedPublications,
} from "./data/siteContent";
import { buildPageMetadata } from "./lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "Hyeseon Noh, Ph.D. | Criminology & Criminal Justice",
    "Understanding is where justice begins. Research on overlooked victimization, technology-facilitated harm, law, and AI.",
  );
}

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            Criminology · Victimization · Technology & Justice
          </p>
          <h1>
            Understanding is where <em>justice</em> begins.
          </h1>
          <p className="hero-intro">
            I study overlooked forms of victimization—how harm is produced,
            how technology reshapes it, and how law and institutions can
            recognize the people too often left unseen.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/research">
              Explore my research <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/cv">
              View CV <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <aside className="research-index" aria-label="Research areas">
          <div className="index-kicker">Research lens</div>
          <ol>
            {researchAreas.map((area) => (
              <li key={area.id}>
                <span>{area.number}</span>
                {area.shortTitle}
              </li>
            ))}
          </ol>
          <p>Quantitative and computational approaches, grounded in people.</p>
        </aside>
      </section>

      <section className="role-strip" aria-label="Current roles">
        <a
          href={institutionLinks.bridgeHumanities}
          target="_blank"
          rel="noreferrer"
        >
          Bridge Humanities Teaching Fellow ↗
        </a>
        <span>University of South Carolina</span>
        <a
          href={institutionLinks.raceAndJustice}
          target="_blank"
          rel="noreferrer"
        >
          Managing Editor · Race and Justice ↗
        </a>
      </section>

      <section className="identity">
        <p className="section-number">01 / Perspective</p>
        <div>
          <h2>I study overlooked forms of victimization.</h2>
          <p>
            My work follows harm from lived experience to institutional
            response: first making it legible, then asking how theory, evidence,
            technology, and law can build more meaningful protection.
          </p>
        </div>
      </section>

      <section className="research-preview">
        <div className="research-preview__intro">
          <p className="section-number">02 / Research</p>
          <h2>Four areas. One connected inquiry.</h2>
          <p>
            Each program looks at a different part of the same movement—from
            recognition to response.
          </p>
          <a className="inline-arrow" href="/research">
            Explore the full research program <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="research-preview__list">
          {researchAreas.map((area) => (
            <a href={`/research#${area.id}`} key={area.id}>
              <span>{area.number}</span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.thesis}</p>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="selected-work">
        <div className="section-title-row">
          <div>
            <p className="section-number">03 / Selected work</p>
            <h2>Recent publications</h2>
          </div>
          <p>
            Work appearing in leading journals across criminology, race and
            ethnicity, victimology, and justice.
          </p>
        </div>
        <div className="selected-work__list">
          {selectedPublications.map((publication) => (
            <PublicationItem
              publication={publication}
              key={publication.title}
            />
          ))}
        </div>
      </section>

      <section className="teaching-preview">
        <div className="teaching-preview__question">
          <span>Who</span>
          <span>gets</span>
          <span>heard?</span>
        </div>
        <div className="teaching-preview__copy">
          <p className="section-number">04 / Teaching</p>
          <h2>The question moves from research into the classroom.</h2>
          <p>
            Through experiential learning, fieldwork, data analysis, case
            debates, and reflection, students practice listening before making
            a claim—and learn to ask what evidence includes, omits, and makes
            possible.
          </p>
          <a className="button button-dark-outline" href="/teaching">
            Explore teaching <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="community-preview">
        <div>
          <p className="section-number">05 / Beyond academia</p>
          <h2>Knowledge matters when it strengthens belonging.</h2>
        </div>
        <div>
          <p>
            My work with the Korean School of Columbia and Kids of Asia in
            South Korea extends the same commitment beyond the university:
            listening across cultures and building supportive communities.
          </p>
          <a className="inline-arrow" href="/about">
            More about my path <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
