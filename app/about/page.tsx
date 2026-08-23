/* eslint-disable @next/next/no-img-element -- these documentary photographs are served directly from the public directory. */
import type { ReactNode } from "react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { buildPageMetadata } from "../lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "About Me | Hyeseon Noh",
    "How community work, forensic psychology, and teaching shaped Hyeseon Noh’s approach to justice.",
  );
}

type AboutPhoto = {
  src: string;
  alt: string;
  caption: ReactNode;
  width: number;
  height: number;
  squareCrop?: boolean;
};

const beginningPhotos: AboutPhoto[] = [
  {
    src: "/about-young-saver-hearts-gathered.jpg",
    alt: "Four student drawings filled with colorful hearts",
    caption: "“Hearts Gathered into Love,” titled by the four students who made it",
    width: 1145,
    height: 852,
  },
  {
    src: "/about-young-saver-student-event.jpg",
    alt: "Hyeseon Noh making a display wall with students at a Young Saver event",
    caption: "Making the wall with students at an event",
    width: 1206,
    height: 890,
  },
  {
    src: "/about-young-saver-photo-wall.jpg",
    alt: "A heart-shaped photo wall bordered by handwritten notes",
    caption:
      "A photo wall built one handwritten note at a time, by parents and students",
    width: 960,
    height: 540,
  },
];

const justicePhotos: AboutPhoto[] = [
  {
    src: "/about-resilience-program-session.jpg",
    alt: "Hyeseon Noh facilitating a group resilience program",
    caption: "Running a resilience program for people returning from incarceration",
    width: 1206,
    height: 1194,
  },
  {
    src: "/about-resilience-program-messages.jpg",
    alt: "Handwritten messages from participants on the final day of a resilience program",
    caption: "Messages the participants wrote for me on the last day of the program",
    width: 1206,
    height: 1207,
  },
];

const communityPhotos: AboutPhoto[] = [
  {
    src: "/about-korean-school-sogo-class.jpeg",
    alt: "Korean School students holding small traditional Korean drums",
    caption: (
      <>
        Students learning <em>sogo</em>, a small traditional Korean drum, at the
        Korean School
      </>
    ),
    width: 912,
    height: 1982,
    squareCrop: true,
  },
  {
    src: "/about-korean-school-festival-booth.jpg",
    alt: "Korean School of Columbia booth with two student-made display boards",
    caption:
      "Introducing the Korean School at the annual Korean festival in Columbia, SC. My students built both boards, choosing what about Korea they wanted to share.",
    width: 1206,
    height: 1496,
  },
];

function PhotoGallery({ photos, label }: { photos: AboutPhoto[]; label: string }) {
  return (
    <details className="about-photo-disclosure">
      <summary>View photos</summary>
      <div className="about-photo-grid" aria-label={label}>
        {photos.map((photo) => (
          <figure className="about-photo" key={photo.src}>
            <div
              className={
                photo.squareCrop
                  ? "about-photo__frame about-photo__frame--square"
                  : "about-photo__frame"
              }
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </details>
  );
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader active="about" />

      <header className="about-page__opening">
        <h1 className="visually-hidden">About Me</h1>
        <div className="about-values__copy">
          <h2>
            <q>Understanding is where justice begins.</q>
          </h2>
          <p>
            For me, this is more than a research statement. It is a way of
            approaching students, communities, and collaboration: listen
            carefully, make overlooked experiences legible, and build responses
            that people can actually reach.
          </p>
        </div>
      </header>

      <section className="about-story" aria-labelledby="about-beginning-title">
        <div className="about-story__content">
          <h2 id="about-beginning-title">
            Where it started, curiosity about people
          </h2>
          <PhotoGallery
            photos={beginningPhotos}
            label="Where it started photo gallery"
          />
          <div className="about-page__prose">
            <p>
              I have been curious about people for as long as I can remember,
              and I have always liked listening to their stories. In college I
              spent as much time outside my classes as in them, volunteering and
              joining programs, and I ended up hearing from people whose lives
              had very little in common with mine.
            </p>
            <p>
              In 2015 I began volunteering as an assistant instructor at the
              Vietnamese Saturday School, run by Kids of Asia at Save the
              Children in Seoul. My job was to help with language and cultural
              activity classes, and at first that was mostly what it was to me. I
              liked the program and I liked playing with the kids.
            </p>
            <p>
              What changed things was talking to the parents at drop-off and
              pick-up. They kept telling me how much the program mattered to
              them, because it helped them stay connected to their own children.
              Connected to their children? I remember thinking that could not be
              the hard part. I did not know anything yet.
            </p>
            <p>
              The children were fluent only in Korean. Their parents, who had
              come from Vietnam, were not, and the gap between them was widening
              a little every year. The parents were also cut off from their own
              language and community, and increasingly from their own kids. At
              the time South Korea had very few multicultural families and few
              services built for them, in a country that still described itself
              as a 단일민족 국가 (<em>danilminjok gukga</em>), a single-ethnicity
              nation.
            </p>
            <p>
              Two things came out of that year. One was obvious in hindsight:
              these families needed to be part of the society they lived in, and
              almost nothing was set up to help with that. The other took longer.
              What they needed was not what I would have guessed. It was not more
              Korean lessons. It was somewhere they could stay a family and
              still belong. I would not have known that from the outside. I only
              knew and understood because I stood at the door for a year and
              asked. After that I kept paying attention to people who fall
              outside what services are designed for, and to what it takes for
              anyone to build those services in the first place.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-justice-title">
        <div className="about-story__content">
          <h2 id="about-justice-title">How I found justice</h2>
          <PhotoGallery
            photos={justicePhotos}
            label="How I found justice photo gallery"
          />
          <div className="about-page__prose">
            <p>
              Around graduation I picked up a book in a bookstore. It was about
              people who had committed crimes and were now living unnoticed in
              ordinary life. I had been fairly punitive about crime until then,
              and the book made me want to know how people actually arrive at
              it. Its argument was that condemning people accomplishes very
              little, and that public safety depends on understanding how
              someone gets there and what keeps them from going back. The author
              later became my master’s program advisor. I wanted to do what she
              did, which was sit with these people and listen.
            </p>
            <p>
              So I studied Forensic Psychology. For the next few years I sat
              across from people serving sentences, people who had just been
              released, people on probation, and teenagers who had been
              arrested, and listened to them account for how they had ended up
              in front of me. I worked on projects and ran programs. What I kept
              coming back to was not what any of them had done. It was what had
              been missing beforehand, and what could have been in place.
            </p>
            <p>
              The question I cared about changed. It stopped being how people
              should be punished and became how they could be brought back in.
            </p>
            <p>
              That question took me to a Ph.D. in Criminology and Criminal
              Justice. The pandemic delayed my start, which felt like bad luck at
              the time and turned out not to be. I spent those months at ECPAT
              Korea working on the Korean edition of the Luxembourg Guidelines.
              The work was terminology, deciding what each harm should be called
              in Korean. What a harm is called in the law determines whether it
              can be charged at all, and whether anyone is protected from it.
              That work is where I understood how much rests on a single word in
              a statute.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-community-title">
        <div className="about-story__content">
          <h2 id="about-community-title">What community keeps teaching me</h2>
          <PhotoGallery
            photos={communityPhotos}
            label="What community keeps teaching me photo gallery"
          />
          <div className="about-page__prose">
            <p>
              Moving to the United States made me a minority for the first time.
              I wanted to find something I could do in the community, even as a
              foreigner. I started teaching at the Korean School of Columbia,
              and the classroom looked more familiar than I expected.
            </p>
            <p>
              The students were Korean American children and others with Korean
              heritage, there to learn the language and culture their families
              had brought with them. Their parents were watching the same slow
              drift I had seen in Seoul ten years earlier. I had assumed the
              Vietnamese Saturday School was about something specific to Korea.
              It was not.
            </p>
            <p>
              Sharing language and culture does not look like much, but it holds
              a lot together. It keeps families able to connect deeply to each
              other, and it gives people somewhere to belong while they work out
              what to keep and what to let go. I expect to keep doing it wherever
              I end up.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
