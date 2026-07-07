import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndpoints } from "../config/api";
import { portfolioData } from "../data/portfolioData";

const normalizePortfolioData = (data) => ({
  profile: data?.profile ?? portfolioData.profile,
  expertise: data?.expertise ?? portfolioData.expertise,
  projects: data?.projects ?? portfolioData.projects,
  skillGroups: data?.skillGroups ?? portfolioData.skillGroups,
  timeline: data?.timeline ?? portfolioData.timeline,
});

export function usePortfolioData() {
  const [state, setState] = useState({
    data: portfolioData,
    isLoading: true,
    source: "local",
  });

  useEffect(() => {
    let isMounted = true;

    axios
      .get(apiEndpoints.portfolio)
      .then((response) => {
        if (!isMounted) return;

        setState({
          data: normalizePortfolioData(response.data),
          isLoading: false,
          source: "api",
        });
      })
      .catch(() => {
        if (!isMounted) return;

        setState({
          data: portfolioData,
          isLoading: false,
          source: "local",
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
