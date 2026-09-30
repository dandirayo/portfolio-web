export const projectCategories = [
  {
    value: "UI/UX Design",
    label: "UI/UX Design",
    description: "Research, user flows, and usable prototypes.",
    shortDescription: "Research to prototype",
    tone: "mint",
  },
  {
    value: "IT & Data",
    label: "Technical Support & Data",
    description: "Reliable operations, troubleshooting, and analysis.",
    shortDescription: "Operations and analysis",
    tone: "lilac",
  },
  {
    value: "Video & Game",
    label: "Creative Tech & Media",
    description: "Interactive prototypes, video, and visual production.",
    shortDescription: "Games, video, and print",
    tone: "coral",
  },
];

export const getCategoryLabel = (value) =>
  projectCategories.find((category) => category.value === value)?.label || value;
