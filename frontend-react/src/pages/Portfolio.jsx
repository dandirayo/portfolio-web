import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import { usePortfolioData } from "../hooks/usePortfolioData";

const filters = ["All", "UI/UX Design", "IT & Data", "Video & Game"];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { data, isLoading, source } = usePortfolioData();
  const projects = data.projects ?? [];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="page-shell">
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            eyebrow="Portfolio"
            title="Case studies connected to my CV experience."
            description="Each project now has a case-study structure with honest evidence states, role clarity, results, and lessons learned."
          />

          {isLoading && <p className="data-state">Loading portfolio data...</p>}
          {!isLoading && source === "local" && (
            <p className="data-state">Using local fallback content because the API or database is not available.</p>
          )}

          <div className="filter-bar justify-content-center mb-5" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`btn rounded-pill ${activeFilter === filter ? "btn-dark" : "btn-outline-dark"}`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="row g-4">
              {filteredProjects.map((project) => (
                <div className="col-lg-6" key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No projects in this category yet.</h3>
              <p>Try another filter or add a new case study from the database.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
