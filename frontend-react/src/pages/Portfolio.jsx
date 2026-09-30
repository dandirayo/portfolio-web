import { useSearchParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import DataStateBanner from "../components/DataStateBanner";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { isDemoMode } from "../config/api";
import { projectCategories, getCategoryLabel } from "../data/projectCategories";

function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, source } = usePortfolioData();
  const projects = data.projects ?? [];
  const searchQuery = searchParams.get("q") || "";
  const requestedCategory = searchParams.get("category");
  const activeFilter = projectCategories.some((item) => item.value === requestedCategory)
    ? requestedCategory
    : "All";
  const selectedCategory = projectCategories.find((item) => item.value === activeFilter);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const updateSearch = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const updateFilter = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "All") next.delete("category");
    else next.set("category", value);
    setSearchParams(next);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === "All" || project.category === activeFilter;
    const searchableText = [
      project.title,
      project.summary,
      project.category,
      getCategoryLabel(project.category),
      project.year,
      project.type,
      project.role,
      ...(project.tools ?? []),
    ].join(" ").toLowerCase();

    return matchesFilter && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  const categoryOptions = [
    { value: "All", label: "All projects", description: "Browse every case study.", tone: "lemon" },
    ...projectCategories,
  ];

  return (
    <main className="page-shell">
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            eyebrow="PORTFOLIO / EXPLORE"
            title={selectedCategory?.label || "Find the work that matters to you."}
            description={selectedCategory
              ? `${selectedCategory.description} Open a case study to see the problem, my role, the solution, and available evidence.`
              : "Choose a discipline, then open a case study for the problem, my role, the solution, and available evidence."}
          />

          <div className="portfolio-controls">
            <label className="portfolio-search">
              <span>Looking for a specific project or tool?</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Try Figma, Unity, support, or analytics"
              />
            </label>
            <p className="portfolio-count">{filteredProjects.length} of {projects.length} case studies</p>
          </div>

          <div className="portfolio-category-nav" role="group" aria-label="Filter projects by discipline">
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                type="button"
                className={`category-option tone-${category.tone} ${activeFilter === category.value ? "is-active" : ""}`}
                aria-pressed={activeFilter === category.value}
                onClick={() => updateFilter(category.value)}
              >
                <span className="category-option-title">{category.label}</span>
                <small>{category.description}</small>
                <span className="category-option-count">{category.value === "All" ? projects.length : projects.filter((project) => project.category === category.value).length} PROJECTS <span aria-hidden="true">↗︎</span></span>
              </button>
            ))}
          </div>

          <div className="portfolio-results-heading" aria-live="polite">
            <div><span className="micro-label">NOW SHOWING</span><h2>{activeFilter === "All" ? "All case studies" : getCategoryLabel(activeFilter)}</h2></div>
            <span>{filteredProjects.length} {filteredProjects.length === 1 ? "PROJECT" : "PROJECTS"}</span>
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
              <p>Try another field or search term.</p>
              <button type="button" className="button-outline" onClick={() => setSearchParams({})}>SHOW ALL PROJECTS</button>
            </div>
          )}
          <div className="portfolio-data-note">
            {isLoading && <DataStateBanner>Loading portfolio data...</DataStateBanner>}
            {!isLoading && source === "local" && !isDemoMode && (
              <DataStateBanner type="warning">Using local fallback content because the API or database is not available.</DataStateBanner>
            )}
            {!isLoading && source === "local" && isDemoMode && (
              <DataStateBanner type="success">Demo mode is active. Projects are shown from local portfolio data.</DataStateBanner>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
