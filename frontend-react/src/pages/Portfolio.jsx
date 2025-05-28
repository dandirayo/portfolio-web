import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5050/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Portfolio Projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
