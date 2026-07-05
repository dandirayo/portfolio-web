function ProjectCard({ project }) {
  return (
    <article className="project-card h-100">
      <div className={`project-visual ${project.image ? "has-image" : ""}`}>
        {project.image && <img src={project.image} alt="" loading="lazy" />}
        <span>{project.visualLabel}</span>
      </div>

      <div className="project-card-body">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="project-badge">{project.category}</span>
          <span className="project-badge muted">{project.year}</span>
        </div>

        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-context">{project.context}</p>

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
            {project.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>

        <details className="project-details">
          <summary>View responsibilities</summary>
          <ul>
            {project.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>

        <div className="d-flex flex-wrap gap-2 mt-4">
          {project.links.map((link) =>
            link.url ? (
              <a key={link.label} href={link.url} className="btn btn-dark btn-sm rounded-pill" target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ) : (
              <button key={link.label} className="btn btn-outline-secondary btn-sm rounded-pill" disabled>
                {link.label}
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
