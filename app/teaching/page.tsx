import { PageHero } from "../components/PageHero";
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
      <PageHero
        index="02"
        eyebrow="Teaching"
        title="Who gets heard?"
        intro="I bring research to life by connecting concepts to students’ own lives and communities—cultivating critical thinkers, data-literate citizens, and ethically responsible practitioners."
      />

      <section className="teaching-philosophy">
        <p className="section-number">01 / Philosophy</p>
        <div>
          <h2>Learning becomes transformative when evidence meets experience.</h2>
          <p>
            As a scholar, my role is not only to create knowledge through
            research but also to share it through teaching. I design learning
            experiences that make abstract concepts tangible, invite students
            to examine what official accounts include and omit, and prepare
            them to carry careful listening into civic life.
          </p>
        </div>
        <blockquote>
          “The classroom is where students practice recognizing whose
          experience counts as evidence.”
        </blockquote>
      </section>

      <section className="courses-section">
        <div className="section-title-row">
          <p className="section-number">02 / Courses taught</p>
          <p>Selected undergraduate teaching</p>
        </div>

        <div className="course-list">
          {courses.map((course, index) => (
            <article className="course" key={course.code}>
              <div className="course__meta">
                <span>0{index + 1}</span>
                <p>{course.code}</p>
                <small>
                  {course.level}
                  <br />
                  {course.format}
                </small>
              </div>
              <div className="course__main">
                <p className="course__term">
                  <span>{course.status}</span> · {course.terms}
                </p>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
              </div>
              <div className="course__activity">
                <p className="eyebrow">Featured activity</p>
                <h3>{course.activity.title}</h3>
                <p>{course.activity.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ta-section">
        <div className="ta-intro">
          <p className="section-number">03 / Additional teaching</p>
          <h2>Courses supported as a teaching assistant</h2>
        </div>
        <div className="ta-list">
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

      <section className="closing-cta closing-cta--coral">
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
