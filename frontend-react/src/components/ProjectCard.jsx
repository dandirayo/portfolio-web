import { Link } from "react-router-dom";
import { getCategoryLabel } from "../data/projectCategories";

function ProjectCard({ project }) {
  const slug = project.slug || project.id;
  const isPlaceholder = project.image?.includes("/media/placeholders/");
  const evidenceLinks = [
    project.githubUrl && { label: "GitHub", url: project.githubUrl },
    project.liveDemoUrl && { label: "Live Demo", url: project.liveDemoUrl },
    ...(project.links ?? []).filter((link) => link.url),
  ].filter(Boolean);
  const primaryEvidenceLink = evidenceLinks[0];

  return (
    <article className="project-card">
      <div className="project-visual">
        {project.video ? (
          <video src={project.video} poster={project.image || undefined} controls muted playsInline preload="metadata" />
        ) : project.image ? (
          <img src={project.image} alt={project.visualLabel || project.title} loading="lazy" width="960" height="600" />
        ) : (
          <span className="project-visual-empty" aria-hidden="true">✦</span>
        )}
        <span className="project-visual-label">{isPlaceholder ? "CONCEPT VISUAL · " : ""}{project.visualLabel || "PROJECT VISUAL"}</span>
      </div>
      <div className="project-card-body">
        <div className="project-meta"><span>{getCategoryLabel(project.category)}</span><span>{project.year}</span></div>
        <h3>{project.title}</h3>
        <p className="project-type">{project.type} / {project.role}</p>
        <p className="project-context">{project.summary}</p>
        <div className="tag-list">{(project.tools ?? []).slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}</div>
        <div className="project-card-actions">
          <Link to={`/portfolio/${slug}`} className="project-link">VIEW CASE STUDY <span aria-hidden="true">↗︎</span></Link>
          {primaryEvidenceLink && <a href={primaryEvidenceLink.url} target="_blank" rel="noreferrer">{primaryEvidenceLink.label} ↗︎</a>}
          {!primaryEvidenceLink && <span className="evidence-note">Evidence pending</span>}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
