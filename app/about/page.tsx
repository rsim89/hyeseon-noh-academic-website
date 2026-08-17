import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { buildPageMetadata } from "../lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "About | Hyeseon Noh",
    "The academic path and community commitments that inform Hyeseon Noh’s research and teaching.",
  );
}

const communities = [
  {
    role: "Instructor",
    name: "Korean School of Columbia, SC",
    text: "Supporting language learning and helping students connect with Korean culture and community.",
  },
  {
    role: "Assistant Instructor",
    name: "Kids of Asia · Save the Children, South Korea",
    text: "Working with the Vietnamese Saturday School to create a supportive space for cultural learning and belonging.",
  },
  {
    role: "Community engagement",
    name: "Young Saver",
    text: "Part of a broader commitment to translating care, learning, and civic responsibility into community practice.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader active="about" />
      <header className="academic-page-hero academic-page-hero--centered about-page__hero">
        <p className="academic-page-hero__index" aria-hidden="true">
          04
        </p>
        <p className="eyebrow">About</p>
        <h1>Across places, one enduring question.</h1>
        <p className="academic-page-hero__intro">
          My academic path connects South Korea and the United States. Across
          research, teaching, and service, I keep returning to how culture
          shapes experiences of harm, recognition, and belonging.
        </p>
      </header>

      <section
        className="academic-two-column about-origin about-page__section"
        aria-labelledby="about-origin-heading"
      >
        <aside className="academic-two-column__aside about-page__section-label">
          <p className="section-number">01 / Where I come from</p>
          <p className="about-page__name" lang="ko">
            노혜선
          </p>
        </aside>
        <div className="academic-two-column__content about-origin__copy">
          <h2 id="about-origin-heading">
            Research shaped by movement between cultural contexts.
          </h2>
          <div className="about-page__prose">
            <p>
              I earned my Ph.D. in Criminology and Criminal Justice from the
              University of South Carolina in May 2026. My work is informed by
              questions that become especially visible across contexts: whose
              experience theory recognizes, how institutions interpret harm,
              and where belonging is made possible.
            </p>
            <p>
              This comparative perspective is not a separate strand of my
              work. It is the lens that connects my research on race and
              culture, technology-facilitated harm, legal response, and
              computational methods.
            </p>
          </div>
        </div>
      </section>

      <section
        className="academic-two-column community-section about-page__section"
        aria-labelledby="about-community-heading"
      >
        <aside className="academic-two-column__aside about-page__section-label">
          <p className="section-number">02 / Community</p>
          <p className="about-page__aside-copy">
            Sharing knowledge matters most when it helps people find
            recognition and belonging.
          </p>
        </aside>
        <div className="academic-two-column__content">
          <h2 id="about-community-heading">Connecting with communities</h2>
          <ul className="community-list academic-entry-list">
            {communities.map((community) => (
              <li
                className="community-list__item academic-entry-list__item"
                key={community.name}
              >
                <p className="eyebrow">{community.role}</p>
                <h3>{community.name}</h3>
                <p>{community.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="academic-two-column about-values about-page__section"
        aria-labelledby="about-values-heading"
      >
        <aside className="academic-two-column__aside about-page__section-label">
          <p className="section-number">03 / The work beyond the work</p>
        </aside>
        <div className="academic-two-column__content about-values__copy">
          <h2 id="about-values-heading">
            <q>Understanding is where justice begins.</q>
          </h2>
          <p>
            For me, this is more than a research statement. It is a way of
            approaching students, communities, and collaboration: listen
            carefully, make overlooked experiences legible, and build responses
            that people can actually reach.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
