import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import DataStateBanner from "../components/DataStateBanner";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { isDemoMode } from "../config/api";

const filters = ["All", "UI/UX Design", "IT & Data", "Video & Game"];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, source } = usePortfolioData();
  const projects = data.projects ?? [];
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === "All" || project.category === activeFilter;
    const searchableText = [
      project.title,
      project.summary,
      project.category,
      project.year,
      project.type,
      project.role,
      ...(project.tools ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return matchesFilter && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  return (
    <main className="page-shell">
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            eyebrow="Portfolio"
            title="Case studies connected to my CV experience."
            description="Each project now has a case-study structure with honest evidence states, role clarity, results, and lessons learned."
          />

          {isLoading && <DataStateBanner>Loading portfolio data...</DataStateBanner>}
          {!isLoading && source === "local" && !isDemoMode && (
            <DataStateBanner type="warning">Using local fallback content because the API or database is not available.</DataStateBanner>
          )}
          {!isLoading && source === "local" && isDemoMode && (
            <DataStateBanner type="success">Demo mode is active. Projects are shown from local portfolio data.</DataStateBanner>
          )}

          <div className="portfolio-controls">
            <label className="portfolio-search">
              <span>Search projects</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by role, tool, or project"
              />
            </label>
            <p className="portfolio-count">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          <div className="filter-bar justify-content-center mb-5" role="group" aria-label="Filter projects by category">
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
              <h3>No matching projects.</h3>
              <p>Try a different filter or search keyword.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
