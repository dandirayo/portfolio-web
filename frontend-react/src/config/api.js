const fallbackApiBaseUrl = "http://localhost:5050";

export const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl
).replace(/\/$/, "");

export const apiEndpoints = {
  contact: `${apiBaseUrl}/api/contact`,
};
