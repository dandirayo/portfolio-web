export function getProfileVisual(profile) {
  const isPlaceholder = !profile?.image || profile.image.includes("profile-placeholder");

  return {
    src: isPlaceholder ? "/media/editorial-portrait.png" : profile.image,
    alt: isPlaceholder
      ? "Conceptual editorial illustration representing Dandi's creative and technical work"
      : `Portrait of ${profile.name || "Dandi Prayogatama"}`,
    isPlaceholder,
  };
}
