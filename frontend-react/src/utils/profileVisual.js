export function getProfileVisual(profile) {
  const isPlaceholder = !profile?.image || profile.image.includes("profile-placeholder");
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;

  return {
    src: isPlaceholder
      ? `${cleanBase}media/editorial-portrait.png`
      : profile.image?.startsWith("/")
        ? `${cleanBase}${profile.image.replace(/^\//, "")}`
        : profile.image || `${cleanBase}media/editorial-portrait.png`,
    alt: isPlaceholder
      ? "Conceptual editorial illustration representing Dandi's creative and technical work"
      : `Portrait of ${profile.name || "Dandi Prayogatama"}`,
    isPlaceholder,
  };
}
