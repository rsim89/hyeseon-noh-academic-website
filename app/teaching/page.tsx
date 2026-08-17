import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { courses, teachingAssistantCourses } from "../data/siteContent";
import { buildPageMetadata } from "../lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata(
    "Teaching | Hyeseon Noh",
    "Experiential, evidence-centered teaching organized around one recurring question: Who gets heard?",
  );
}

function formatActivityText(text: string) {
  const [before, after] = text.split("13th");

  if (after === undefined) {
    return text;
  }

  return (
    <>
      {before}
      <em>13th</em>
      {after}
    </>
  );
}

export default function TeachingPage() {
  return (
    <main>
      <SiteHeader active="teaching" />
      <header
        className="teaching-editorial-hero"
        aria-labelledby="teaching-page-title"
      >
        <h1 id="teaching-page-title" className="teaching-editorial-hero__title">
          Teaching
        </h1>
        <p className="teaching-editorial-hero__intro">
          I bring research to life by connecting concepts to students&apos;
          own lives and communities.
        </p>
      </header>

      <section
        className="teaching-philosophy teaching-editorial-philosophy"
        aria-labelledby="teaching-philosophy-title"
      >
        <header className="teaching-editorial-philosophy__header">
          <h2 id="teaching-philosophy-title">Teaching Philosophy</h2>
          <p className="teaching-editorial-philosophy__statement">
            Learning is transformative when it brings research to life.
          </p>
        </header>
        <div className="teaching-editorial-philosophy__body">
          <p>
            As a scholar–educator, my role is not only to create knowledge
            through research but also to share it through teaching. I believe
            in the transformative power of learning that brings research to
            life, connecting concepts to students&apos; own lives and
            communities. I view teaching as an opportunity to cultivate
            critical thinkers, data-literate citizens, and ethically
            responsible practitioners.
          </p>
          <blockquote>
            “Ultimately, I want students to become thoughtful participants in
            civic life who carry the question of who gets heard into their own
            communities.”
          </blockquote>
        </div>
      </section>

      <section
        className="courses-section teaching-course-collection"
        aria-labelledby="courses-title"
      >
        <div className="section-title-row">
          <div>
            <h2 id="courses-title">Courses Taught</h2>
          </div>
        </div>

        <div className="teaching-course-collection__list teaching-course-list">
          {courses.map((course, index) => {
            const courseTitleId = `course-${index + 1}-title`;

            return (
              <article
                className="teaching-course teaching-course-row"
                key={course.code}
                aria-labelledby={courseTitleId}
              >
                <div className="teaching-course-row__description">
                  <div>
                    <p className="eyebrow">{course.code}</p>
                    <h3 id={courseTitleId}>{course.title}</h3>
                    <p>{course.description}</p>
                  </div>
                </div>
                <dl className="teaching-course-row__metadata">
                  <div>
                    <dt>Term</dt>
                    <dd>{course.terms}</dd>
                  </div>
                  <div>
                    <dt>Level</dt>
                    <dd>{course.level}</dd>
                  </div>
                  <div>
                    <dt>Format</dt>
                    <dd>{course.format}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="teaching-activity-programs"
        aria-labelledby="selected-activities-title"
      >
        <header className="teaching-activity-programs__header">
          <h2 id="selected-activities-title">
            Selected Classroom Activities
          </h2>
        </header>

        <div className="teaching-activity-programs__list">
          {courses.map((course, index) => {
            const groupTitleId = `activity-group-${index + 1}-title`;
            const activityTitleId = `activity-group-${index + 1}-activity`;

            return (
              <article
                className="teaching-activity-program"
                key={course.code}
                aria-labelledby={groupTitleId}
              >
                <header className="teaching-activity-program__course">
                  <p className="eyebrow">{course.code}</p>
                  <h3 id={groupTitleId}>{course.title}</h3>
                </header>
                <div className="teaching-activity-program__activity">
                  <h4 id={activityTitleId}>{course.activity.title}</h4>
                  <p>{formatActivityText(course.activity.text)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="ta-section teaching-additional teaching-assistant-experience"
        aria-labelledby="teaching-assistant-title"
      >
        <header className="ta-intro teaching-additional__header teaching-assistant-experience__header">
          <h2 id="teaching-assistant-title">Teaching Assistant Experience</h2>
        </header>
        <div className="ta-list teaching-additional__list teaching-assistant-experience__list">
          {teachingAssistantCourses.map((course) => (
            <article key={course.title}>
              <div>
                <h3>{course.title}</h3>
                <p>{course.code}</p>
              </div>
              <span>{course.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-cta closing-cta--coral teaching-closing">
        <p className="eyebrow">Research and teaching, connected</p>
        <h2>Understanding begins with listening.</h2>
        <a className="button button-dark-outline" href="/research">
          Explore the research
        </a>
      </section>
      <SiteFooter contact={false} />
    </main>
  );
}
