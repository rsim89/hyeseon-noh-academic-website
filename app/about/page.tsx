import { PageHero } from "../components/PageHero";
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
      <PageHero
        index="04"
        eyebrow="About"
        title="Across places, one enduring question."
        intro="My academic path connects South Korea and the United States. Across research, teaching, and service, I keep returning to how culture shapes experiences of harm, recognition, and belonging."
      />

      <section className="about-origin">
        <div className="name-portrait" aria-label="Hyeseon Noh in Korean">
          <span>노</span>
          <span>혜</span>
          <span>선</span>
        </div>
        <div className="about-origin__copy">
          <p className="section-number">01 / Where I come from</p>
          <h2>Research shaped by movement between cultural contexts.</h2>
          <p>
            I earned my Ph.D. in Criminology and Criminal Justice from the
            University of South Carolina in May 2026. My work is informed by
            questions that become especially visible across contexts: whose
            experience theory recognizes, how institutions interpret harm, and
            where belonging is made possible.
          </p>
          <p>
            This comparative perspective is not a separate strand of my work.
            It is the lens that connects my research on race and culture,
            technology-facilitated harm, legal response, and computational
            methods.
          </p>
        </div>
      </section>

      <section className="community-section">
        <div className="section-title-row">
          <div>
            <p className="section-number">02 / Community</p>
            <h2>Connecting with communities</h2>
          </div>
          <p>
            Sharing knowledge matters most when it helps people find
            recognition and belonging.
          </p>
        </div>
        <div className="community-list">
          {communities.map((community, index) => (
            <article key={community.name}>
              <div className="community-number">0{index + 1}</div>
              <p className="eyebrow">{community.role}</p>
              <h3>{community.name}</h3>
              <p>{community.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-values">
        <p className="section-number">03 / The work beyond the work</p>
        <div>
          <blockquote>
            “Understanding is where justice begins.”
          </blockquote>
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
