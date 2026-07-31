import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import DataStateBanner from "../components/DataStateBanner";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { isDemoMode } from "../config/api";

function Home() {
  const { data, isLoading, source } = usePortfolioData();
  const { expertise, profile, projects } = data;
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-7">
              <span className="eyebrow">Portfolio / Technical Support L2 / UI UX</span>
              <p className="hero-name">{profile.name}</p>
              <h1>{profile.title}</h1>
              <p className="hero-value">{profile.headline}</p>
              <p className="hero-copy">{profile.subheadline}</p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/portfolio" className="btn btn-dark btn-lg rounded-pill px-4">
                  View My Work
                </Link>
                {profile.cvUrl && (
                  <a href={profile.cvUrl} download className="btn btn-outline-dark btn-lg rounded-pill px-4">
                    Download CV
                  </a>
                )}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-card">
                <img
                  className="hero-portrait"
                  src={profile.image}
                  alt="Temporary profile visual for Dandi Prayogatama"
                  width="640"
                  height="720"
                />
                <p className="mb-1 text-uppercase small text-muted">Current Focus</p>
                <h2>Reliable systems, clearer interfaces.</h2>
                <p>
                  Solving escalated support issues while turning design, data, and multimedia work into readable case studies.
                </p>
                <div className="hero-stats">
                  <div>
                    <strong>{projects.length}</strong>
                    <span>Case studies</span>
                  </div>
                  <div>
                    <strong>L2</strong>
                    <span>Support role</span>
                  </div>
                  <div>
                    <strong>UX</strong>
                    <span>Design lens</span>
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

          {isLoading && <DataStateBanner>Loading featured case studies...</DataStateBanner>}
          {!isLoading && source === "local" && !isDemoMode && (
            <DataStateBanner type="warning">Showing local portfolio content while the API or database is unavailable.</DataStateBanner>
          )}
          {!isLoading && source === "local" && isDemoMode && (
            <DataStateBanner type="success">Demo mode is active. Content is loaded from local portfolio data.</DataStateBanner>
          )}

          {featuredProjects.length > 0 ? (
            <div className="row g-4">
              {featuredProjects.map((project) => (
                <div className="col-lg-4" key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No featured case studies yet.</h3>
              <p>Add or feature a project from the database to populate this section.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
