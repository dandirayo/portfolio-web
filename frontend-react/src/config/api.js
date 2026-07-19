const fallbackApiBaseUrl = "http://localhost:5050";

export const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl
).replace(/\/$/, "");

export const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";

export const apiEndpoints = {
  admin: {
    contacts: `${apiBaseUrl}/api/admin/contacts`,
    expertise: `${apiBaseUrl}/api/admin/expertise`,
    profile: `${apiBaseUrl}/api/admin/profile`,
    projects: `${apiBaseUrl}/api/admin/projects`,
    skills: `${apiBaseUrl}/api/admin/skills`,
    snapshot: `${apiBaseUrl}/api/admin/snapshot`,
    timeline: `${apiBaseUrl}/api/admin/timeline`,
  },
  contact: `${apiBaseUrl}/api/contact`,
  portfolio: `${apiBaseUrl}/api/portfolio`,
};
