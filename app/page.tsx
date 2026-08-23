/* eslint-disable @next/next/no-img-element -- GitHub Pages serves this optimized portrait directly without a Next image endpoint. */
import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { institutionLinks } from "./data/siteContent";
import { buildPageMetadata } from "./lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "Hyeseon Noh, Ph.D. | Criminology & Criminal Justice",
    "Understanding is where justice begins. Research on structural victimization, technology-facilitated harm, law, and AI.",
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
          <img
            className="home-profile__portrait"
            src="/hyeseon-noh-portrait.jpg"
            alt="Portrait of Hyeseon Noh"
            width="1200"
            height="1800"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>
            <div className="home-profile__identity">
              <strong>Hyeseon Noh, Ph.D.</strong>
              <span>(she/her)</span>
            </div>
            <span>Criminology &amp; Criminal Justice</span>
            <div className="home-profile__contact">
              <span>Email:</span>
              <a href="mailto:hnoh@email.sc.edu">hnoh@email.sc.edu</a>
              <a href="mailto:hnohccj@gmail.com">hnohccj@gmail.com</a>
            </div>
          </figcaption>
        </figure>

        <article className="home-profile__bio">
          <p className="eyebrow">Welcome</p>
          <h1 id="home-profile-title">Hyeseon Noh</h1>
          <div className="home-profile__prose">
            <p>
              Welcome! I’m Hyeseon Noh, a{" "}
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
                <em>Race and Justice: An International Journal</em>
              </a>
              , and a member of the Membership Committee for the{" "}
              <a
                href={institutionLinks.internationalCriminology}
                target="_blank"
                rel="noreferrer"
              >
                ASC Division of International Criminology
              </a>
              .
            </p>

            <p>
              I study the structural victimization that the criminal justice
              system and criminological theories tend to miss. My research asks:
              How is victimization structurally produced and reproduced? How do
              emerging technologies reshape victimization and outpace the
              criminal justice system? And how can institutions and legal
              frameworks better recognize and protect these victims? I address
              these questions using quantitative and computational methods.
              Behind these questions lies a simple idea:{" "}
              <em>understanding is where justice begins</em>. When overlooked
              experiences become legible, victims find recognition and
              belonging, and society learns how to see and respond.
            </p>

            <p>
              I earned my Ph.D. in Criminology and Criminal Justice from the
              University of South Carolina in May 2026. My dissertation,
              “Developing and Validating Asian American General Strain Theory,”
              received the Helen Taylor Greene and Vernetta D. Young Graduate
              Fellowship (ASC Division on People of Color and Crime, 2023), the
              ADPCCJ Student Research Award (2024), and the ACJS Student
              Scholarship Mini-Grant Travel Award for People of Color and Women
              (2026).
            </p>

            <p>
              Beyond my dissertation, my work appears in{" "}
              <em>Journal of Criminal Justice</em>,{" "}
              <em>Ethnic and Racial Studies</em>, and{" "}
              <em>Victims &amp; Offenders</em>, among other outlets. Learn more on
              my <Link href="/research">Research</Link> page.
            </p>

            <p>
              Sharing this work with students and communities matters to me. In
              my course, Social Advocacy and Ethical Life, students grapple with
              one question throughout the semester: who gets heard? It is the
              same question that drives my research. Through it, students build
              a foundation for their own advocacy and for thinking carefully
              about evidence and civic responsibility (details on the{" "}
              <Link href="/teaching">Teaching</Link> page). Beyond the
              classroom, I have served as an Instructor at the Korean School of
              Columbia, SC, and as an Assistant Instructor for Kids of Asia
              (Save the Children, South Korea), helping students connect with
              their cultural heritage and building supportive communities
              around them (see <Link href="/about">About Me</Link>).
            </p>
          </div>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
