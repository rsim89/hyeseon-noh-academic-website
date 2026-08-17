import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { institutionLinks } from "./data/siteContent";
import { buildPageMetadata } from "./lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "Hyeseon Noh, Ph.D. | Criminology & Criminal Justice",
    "Understanding is where justice begins. Research on overlooked victimization, technology-facilitated harm, law, and AI.",
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader active="home" />

      <section
        className="home-profile"
        id="top"
        aria-labelledby="home-profile-title"
      >
        <figure className="home-profile__visual">
          {/* Replace this placeholder with /profile.jpg when a public portrait is available. */}
          <div
            className="home-profile__portrait home-profile__portrait--placeholder"
            role="img"
            aria-label="Portrait placeholder for Hyeseon Noh"
          >
            <span className="home-profile__monogram" aria-hidden="true">
              HN
            </span>
          </div>
          <figcaption>
            <strong>Hyeseon Noh, Ph.D.</strong>
            <span>Criminology &amp; Criminal Justice</span>
          </figcaption>
        </figure>

        <article className="home-profile__bio">
          <p className="eyebrow">Welcome</p>
          <h1 id="home-profile-title">Hyeseon Noh</h1>
          <div className="home-profile__prose">
            <p>
              I am a{" "}
              <a
                href={institutionLinks.bridgeHumanities}
                target="_blank"
                rel="noreferrer"
              >
                Bridge Humanities Teaching Fellow
              </a>{" "}
              at the University of South Carolina, a Managing Editor for{" "}
              <a
                href={institutionLinks.raceAndJustice}
                target="_blank"
                rel="noreferrer"
              >
                Race and Justice: An International Journal
              </a>
              , and a member of the Membership Committee for the{" "}
              <a
                href={institutionLinks.internationalCriminology}
                target="_blank"
                rel="noreferrer"
              >
                ASC Division of International Criminology
              </a>
              . <strong>I study overlooked forms of victimization: how harm is
              produced and reproduced, how emerging technologies reshape it,
              and how law and institutions can better recognize and protect
              victims.</strong> I use quantitative and computational methods,
              guided by one principle:
              <em> understanding is where justice begins.</em>
            </p>

            <p>
              My work appears in <em>Journal of Criminal Justice</em>,{" "}
              <em>Ethnic and Racial Studies</em>, and{" "}
              <em>Victims &amp; Offenders</em>, among other outlets. Across four
              connected research areas, I move from documenting overlooked
              harm toward building responses to it.{" "}
              <Link href="/research">Read more about my research</Link>.
            </p>

            <p>
              Sharing this work with students and communities matters to me. In
              Social Advocacy and Ethical Life, students return throughout the
              semester to the question “who gets heard?” Beyond the classroom,
              I have served at the Korean School of Columbia, SC, and Kids of
              Asia with Save the Children in South Korea.{" "}
              <Link href="/teaching">Explore my teaching</Link> or{" "}
              <Link href="/about">learn more about my community work</Link>.
            </p>

            <p>
              I earned my Ph.D. in Criminology and Criminal Justice from the
              University of South Carolina in May 2026. My dissertation,
              “Developing and Validating Asian American General Strain Theory,”
              received the Helen Taylor Greene and Vernetta D. Young Graduate
              Fellowship, the ADPCCJ Student Research Award, and the ACJS
              Student Scholarship Mini-Grant Travel Award for People of Color
              and Women.
            </p>
          </div>

          <nav className="home-profile__links" aria-label="Profile links">
            <Link href="/cv">Curriculum vitae</Link>
            <Link href="/research">Research</Link>
            <Link href="/teaching">Teaching</Link>
            <Link href="/about">About</Link>
            <a href="mailto:hnoh@email.sc.edu">Contact</a>
          </nav>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
