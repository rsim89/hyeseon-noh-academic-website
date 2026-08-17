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

export default function TeachingPage() {
  return (
    <main>
      <SiteHeader active="teaching" />
      <header
        className="teaching-editorial-hero"
        aria-labelledby="teaching-page-title"
      >
        <p className="section-number academic-page-hero__index" hidden>
          03 / Teaching
        </p>
        <h1 id="teaching-page-title" className="teaching-editorial-hero__title">
          Teaching
        </h1>
        <p className="teaching-editorial-hero__question">Who gets heard?</p>
        <p className="teaching-editorial-hero__intro">
          I bring research to life by connecting concepts to students’ own
          lives and communities—cultivating critical thinkers, data-literate
          citizens, and ethically responsible practitioners.
        </p>
      </header>

      <section
        className="teaching-philosophy teaching-editorial-philosophy"
        aria-labelledby="teaching-philosophy-title"
      >
        <header className="teaching-editorial-philosophy__header">
          <p className="section-number">01 / Teaching philosophy</p>
          <h2 id="teaching-philosophy-title">Teaching Philosophy</h2>
          <p className="teaching-editorial-philosophy__statement">
            Learning becomes transformative when evidence meets experience.
          </p>
        </header>
        <div className="teaching-editorial-philosophy__body">
          <p>
            As a scholar, my role is not only to create knowledge through
            research but also to share it through teaching. I design learning
            experiences that make abstract concepts tangible, invite students
            to examine what official accounts include and omit, and prepare
            them to carry careful listening into civic life.
          </p>
          <blockquote>
            “The classroom is where students practice recognizing whose
            experience counts as evidence.”
          </blockquote>
        </div>
      </section>

      <section
        className="courses-section teaching-course-collection"
        aria-labelledby="courses-title"
      >
        <div className="section-title-row">
          <div>
            <p className="section-number">02 / Courses taught</p>
            <h2 id="courses-title">Courses</h2>
          </div>
          <p>Selected undergraduate teaching</p>
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
                  <p className="teaching-course-row__number">0{index + 1}</p>
                  <div>
                    <p className="eyebrow">{course.code}</p>
                    <h3 id={courseTitleId}>{course.title}</h3>
                    <p>{course.description}</p>
                  </div>
                </div>
                <dl className="teaching-course-row__metadata">
                  <div>
                    <dt>Status</dt>
                    <dd>{course.status}</dd>
                  </div>
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
          <p className="section-number">03 / Classroom practice</p>
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
                  <p className="eyebrow">Featured activity</p>
                  <h4 id={activityTitleId}>{course.activity.title}</h4>
                  <p>{course.activity.text}</p>
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
          <p className="section-number">04 / Additional teaching</p>
          <h2 id="teaching-assistant-title">Teaching Assistant Experience</h2>
          <p>Courses supported as a teaching assistant</p>
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
          Explore the research <span aria-hidden="true">↗</span>
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
