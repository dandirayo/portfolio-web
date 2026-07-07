import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import { usePortfolioData } from "../hooks/usePortfolioData";

const filters = ["All", "UI/UX Design", "IT & Data", "Video & Game"];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { data } = usePortfolioData();
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
            description="Each card is structured as context, problem, solution, role, tools, and evidence link placeholders."
          />

          <div className="filter-bar justify-content-center mb-5">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`btn rounded-pill ${activeFilter === filter ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filteredProjects.map((project) => (
              <div className="col-lg-6" key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
