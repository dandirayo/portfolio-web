import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  const links = project.links ?? [];
  const tools = project.tools ?? [];
  const slug = project.slug || project.id;
  const evidenceLinks = [
    project.githubUrl && { label: "GitHub", url: project.githubUrl },
    project.liveDemoUrl && { label: "Live Demo", url: project.liveDemoUrl },
    ...links.filter((link) => link.url),
  ].filter(Boolean);
  const primaryEvidenceLink = evidenceLinks[0];

  return (
    <article className="project-card h-100">
      <div className={`project-visual ${project.image || project.video ? "has-image" : ""}`}>
        {project.video ? (
          <video src={project.video} poster={project.image || undefined} controls muted playsInline preload="metadata" />
        ) : (
          project.image && <img src={project.image} alt={project.visualLabel || ""} loading="lazy" width="960" height="600" />
        )}
        <span>{project.visualLabel}</span>
      </div>

      <div className="project-card-body">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="project-badge">{project.category}</span>
          <span className="project-badge muted">{project.year}</span>
        </div>

        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-context">{project.summary}</p>

        <div className="case-grid">
          <div>
            <strong>Problem</strong>
            <p>{project.problem}</p>
          </div>
          <div>
            <strong>Solution</strong>
            <p>{project.solution}</p>
          </div>
        </div>

        <div className="mt-3">
          <strong className="small-heading">My Role</strong>
          <p className="mb-2">{project.role}</p>
          <div className="tag-list mb-3">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>

        <div className="project-card-actions">
          <Link to={`/portfolio/${slug}`} className="btn btn-dark btn-sm rounded-pill">
            View Case Study
          </Link>
          {primaryEvidenceLink && (
            <a href={primaryEvidenceLink.url} className="btn btn-outline-dark btn-sm rounded-pill" target="_blank" rel="noreferrer">
              {primaryEvidenceLink.label}
            </a>
          )}
          {!primaryEvidenceLink && <span className="evidence-note">Evidence pending.</span>}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
