import { Link, useParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import DataStateBanner from "../components/DataStateBanner";
import { usePortfolioData } from "../hooks/usePortfolioData";

function DetailList({ title, items }) {
  if (!items?.length) return null;

  return (
    <section className="detail-panel">
      <h2>{title}</h2>
      <ul className="detail-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ProjectDetail() {
  const { slug } = useParams();
  const { data, isLoading, source } = usePortfolioData();
  const projects = data.projects ?? [];
  const project = projects.find((item) => item.slug === slug || item.id === slug);

  if (isLoading) {
    return (
      <main className="page-shell">
        <section className="section-padding">
          <div className="container">
            <DataStateBanner>Loading case study...</DataStateBanner>
          </div>
        </section>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="page-shell">
        <section className="section-padding">
          <div className="container">
            <div className="empty-state">
              <h1>Project not found.</h1>
              <p>The case study may have been moved, renamed, or not published yet.</p>
              <Link to="/portfolio" className="btn btn-dark rounded-pill px-4">
                Back to Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const gallery = project.gallery?.length
    ? project.gallery
    : project.image
      ? [
          {
            type: "image",
            url: project.image,
            alt: project.visualLabel,
            caption: "Temporary visual placeholder.",
          },
        ]
      : [];
  const evidenceLinks = [
    project.githubUrl && { label: "GitHub Repository", url: project.githubUrl },
    project.liveDemoUrl && { label: "Live Demo", url: project.liveDemoUrl },
    ...(project.links ?? []).filter((link) => link.url),
  ].filter(Boolean);

  return (
    <main className="page-shell">
      <section className="project-detail-hero">
        <div className="container">
          <Link to="/portfolio" className="back-link">
            Back to Portfolio
          </Link>

          {source === "local" && (
            <DataStateBanner type="warning">Showing local fallback content because the API or database is not available.</DataStateBanner>
          )}

          <div className="row align-items-end gy-4">
            <div className="col-lg-8">
              <span className="eyebrow">{project.category}</span>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
            </div>
            <div className="col-lg-4">
              <div className="detail-meta">
                <span>{project.year}</span>
                <strong>{project.type}</strong>
                <p>{project.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container">
          <div className="detail-gallery">
            {gallery.map((item) => (
              <figure key={`${item.url}-${item.caption}`} className="gallery-item">
                {item.type === "video" ? (
                  <video src={item.url} poster={project.image || undefined} controls playsInline preload="metadata" />
                ) : (
                  <img src={item.url} alt={item.alt || project.title} loading="lazy" width="960" height="600" />
                )}
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="detail-grid">
            <section className="detail-panel">
              <h2>Context</h2>
              <p>{project.context}</p>
            </section>
            <section className="detail-panel">
              <h2>Problem</h2>
              <p>{project.problem}</p>
            </section>
            <section className="detail-panel">
              <h2>Solution</h2>
              <p>{project.solution}</p>
            </section>
            <section className="detail-panel">
              <h2>Role</h2>
              <p>{project.role}</p>
              <div className="tag-list mt-3">
                {(project.tools ?? []).map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </section>
          </div>

          <div className="detail-grid mt-4">
            <DetailList title="Responsibilities" items={project.responsibilities} />
            <DetailList title="Results" items={project.results} />
            <DetailList title="Lessons Learned" items={project.lessonsLearned} />
            <section className="detail-panel">
              <h2>Evidence</h2>
              {evidenceLinks.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {evidenceLinks.map((link) => (
                    <a key={link.label} href={link.url} className="btn btn-dark rounded-pill px-3" target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : (
                <p>
                  External evidence is not available yet. GitHub, live demo, Figma, approved video, or PDF links can be added when the assets are ready.
                </p>
              )}
            </section>
          </div>

          <div className="next-work">
            <SectionTitle
              align="left"
              eyebrow="Next"
              title="Need the broader portfolio view?"
              description="Return to the project list to compare categories, roles, and available evidence."
            />
            <Link to="/portfolio" className="btn btn-outline-dark rounded-pill px-4">
              All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetail;
