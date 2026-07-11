import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndpoints } from "../config/api";
import { portfolioData } from "../data/portfolioData";

const normalizeProject = (project) => {
  const slug = project?.slug || project?.id || "";

  return {
    ...project,
    id: project?.id || slug,
    slug,
    summary: project?.summary || project?.context || "",
    image: project?.image || "",
    video: project?.video || "",
    gallery: project?.gallery ?? [],
    responsibilities: project?.responsibilities ?? [],
    tools: project?.tools ?? [],
    results: project?.results ?? [],
    lessonsLearned: project?.lessonsLearned ?? [],
    githubUrl: project?.githubUrl || "",
    liveDemoUrl: project?.liveDemoUrl || "",
    links: project?.links ?? [],
    displayOrder: project?.displayOrder ?? project?.sortOrder ?? 999,
  };
};

const normalizeSkillGroup = (skill) => ({
  ...skill,
  level: skill?.level || "Experience",
  usage: skill?.usage || skill?.tools || "",
});

const normalizePortfolioData = (data) => {
  const projects = (data?.projects ?? portfolioData.projects)
    .map(normalizeProject)
    .sort((left, right) => left.displayOrder - right.displayOrder);

  return {
    profile: data?.profile ?? portfolioData.profile,
    expertise: data?.expertise ?? portfolioData.expertise,
    projects,
    skillGroups: (data?.skillGroups ?? portfolioData.skillGroups).map(normalizeSkillGroup),
    timeline: data?.timeline ?? portfolioData.timeline,
  };
};

export function usePortfolioData() {
  const [state, setState] = useState({
    data: normalizePortfolioData(portfolioData),
    isLoading: true,
    error: "",
    source: "local",
  });

  useEffect(() => {
    let isMounted = true;

    axios
      .get(apiEndpoints.portfolio, { timeout: 4000 })
      .then((response) => {
        if (!isMounted) return;

        setState({
          data: normalizePortfolioData(response.data),
          isLoading: false,
          error: "",
          source: "api",
        });
      })
      .catch(() => {
        if (!isMounted) return;

        setState({
          data: normalizePortfolioData(portfolioData),
          isLoading: false,
          error: "Portfolio API is unavailable. Showing local fallback content.",
          source: "local",
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
