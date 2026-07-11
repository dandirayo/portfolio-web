import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { usePortfolioData } from "../hooks/usePortfolioData";

function Home() {
  const { data, source } = usePortfolioData();
  const { expertise, profile, projects } = data;
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-7">
              <span className="eyebrow">Portfolio / Technical Support / UI UX</span>
              <h1>{profile.headline}</h1>
              <p className="hero-copy">{profile.subheadline}</p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/portfolio" className="btn btn-dark btn-lg rounded-pill px-4">
                  Explore My Work
                </Link>
                <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-lg rounded-pill px-4">
                  View Interactive CV
                </a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-card">
                <div className="profile-orb">DP</div>
                <p className="mb-1 text-uppercase small text-muted">Currently</p>
                <h2>Technical Support L2</h2>
                <p>
                  Solving escalated system issues while bringing a UI/UX mindset to technical workflows and product experiences.
                </p>
                <div className="hero-stats">
                  <div>
                    <strong>7+</strong>
                    <span>Portfolio cases</span>
                  </div>
                  <div>
                    <strong>4</strong>
                    <span>Core domains</span>
                  </div>
                  <div>
                    <strong>2025</strong>
                    <span>L2 operations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionTitle
            eyebrow="Core Expertise"
            title="A portfolio built around one useful combination."
            description="Design sensitivity, technical support discipline, data literacy, and multimedia execution."
          />

          <div className="row g-4 mt-2">
            {expertise.map((item) => (
              <div className="col-md-6 col-lg-4" key={item.title}>
                <div className="expertise-card h-100">
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="tag-list">
                    {item.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
            <SectionTitle
              align="left"
              eyebrow="Featured Work"
              title="Selected case studies"
              description="A quick look at case studies with role, problem, solution, results, and next evidence states."
            />
            <Link to="/portfolio" className="btn btn-outline-dark rounded-pill px-4 align-self-start align-self-lg-end">
              See All Projects
            </Link>
          </div>

          {source === "local" && (
            <p className="data-state">Showing local portfolio content while the API or database is unavailable.</p>
          )}

          <div className="row g-4">
            {featuredProjects.map((project) => (
              <div className="col-lg-4" key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
