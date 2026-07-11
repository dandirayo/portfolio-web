import SectionTitle from "../components/SectionTitle";
import { usePortfolioData } from "../hooks/usePortfolioData";

function About() {
  const { data } = usePortfolioData();
  const { profile, skillGroups, timeline } = data;

  return (
    <main className="page-shell">
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-5">
              <div className="portrait-card">
                <img className="portrait-image" src={profile.image} alt="Abstract profile visual for Dandi Prayogatama" />
                <p className="mb-0">
                  A portfolio shaped around reliable systems, clear interfaces, and practical creative execution.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <SectionTitle align="left" eyebrow="About Me" title="Technology should run reliably and feel natural to use." />
              <p className="lead about-quote">
                I believe great technology should not only work perfectly in the background. It should also feel clear, accessible, and natural for the human using it.
              </p>
              <p>
                I hold a Bachelor's degree in Computer Science from Bina Nusantara University and build my career across UI/UX design, L2 technical support, game prototyping, data analytics, and multimedia production. My strength is connecting user-facing clarity with technical execution.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="btn btn-dark rounded-pill px-4">
                  Open CV
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline-dark rounded-pill px-4">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container">
          <SectionTitle
            eyebrow="Skill Snapshot"
            title="Balanced between design, operations, code, and data."
            description="A practical, evidence-based view of how each skill area is used instead of subjective percentage scores."
          />
          <div className="row g-4 mt-2">
            {skillGroups.map((skill) => (
              <div className="col-md-6" key={skill.title}>
                <div className="skill-card">
                  <div className="d-flex flex-wrap justify-content-between gap-3">
                    <h3>{skill.title}</h3>
                    <strong className="skill-level">{skill.level}</strong>
                  </div>
                  <p>{skill.usage}</p>
                  <p>{skill.tools}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container">
          <SectionTitle align="left" eyebrow="Experience Timeline" title="CV experience, translated into a portfolio story." />
          <div className="timeline-list">
            {timeline.map((item) => (
              <div className="timeline-item" key={`${item.period}-${item.title}`}>
                <span>{item.period}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
