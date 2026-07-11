const placeholderImages = {
  profile: "/media/placeholders/profile-placeholder.webp",
  uiux: "/media/placeholders/project-uiux.webp",
  itData: "/media/placeholders/project-it-data.webp",
  creative: "/media/placeholders/project-creative.webp",
};

const galleryItem = (url, alt, caption, type = "image") => ({
  type,
  url,
  alt,
  caption,
});

export const profile = {
  name: "Dandi Prayogatama",
  title: "Technical Support L2 | UI/UX Designer | Creative Technologist",
  headline:
    "I design intuitive user experiences and engineer reliable technical solutions.",
  subheadline:
    "Bridging human-centered design, IT operations, data thinking, and multimedia execution for products that feel clear, stable, and useful.",
  location: "Jakarta, Indonesia",
  email: "dandi@gmail.com",
  phone: "0815-9933-123",
  linkedin: "https://linkedin.com/in/dandirayo",
  github: "https://github.com/dandirayo",
  portfolioNode: "dandirayo.art",
  cvUrl: "/cv-dandi-prayogatama.pdf",
  image: placeholderImages.profile,
};

export const expertise = [
  {
    title: "UI/UX & Product Design",
    eyebrow: "Research to Prototype",
    description:
      "Turning user pain points into clear digital flows through research, persona development, wireframing, and high-fidelity prototyping.",
    tools: ["Figma", "Wireframing", "Usability Testing", "Design Systems"],
  },
  {
    title: "IT Systems & Technical Support",
    eyebrow: "L2 Operations",
    description:
      "Resolving escalated issues, supporting critical applications, testing patches, and monitoring system reliability in production environments.",
    tools: ["Troubleshooting", "Monitoring", "Ticketing", "System Testing"],
  },
  {
    title: "Multimedia & Game Development",
    eyebrow: "Visual + Interactive",
    description:
      "Creating interactive game prototypes, visual assets, video edits, and social media content with a practical production mindset.",
    tools: ["Unity", "C#", "Adobe Creative Suite", "CapCut"],
  },
];

export const projects = [
  {
    id: "peduli-donasi",
    slug: "peduli-donasi",
    title: "Peduli Donasi - Donation Application",
    summary:
      "End-to-end UI/UX case study for a mobile donation flow that helps donors understand how to donate goods to social foundations.",
    category: "UI/UX Design",
    year: "2023",
    type: "Thesis Project",
    visualLabel: "Mobile app mockup / Figma prototype",
    image: placeholderImages.uiux,
    video: "",
    gallery: [
      galleryItem(
        placeholderImages.uiux,
        "Neutral UI UX placeholder for Peduli Donasi",
        "Replace with real app screens or Figma export."
      ),
    ],
    context:
      "Designed an end-to-end mobile donation application to help donors contribute goods to social foundations in a simpler and more accessible way.",
    problem:
      "People who want to donate physical goods often face unclear donation flows, fragmented foundation information, and low transparency around validation status.",
    solution:
      "Created a user-friendly donation flow with accessible layouts, social engagement touchpoints, and clearer status tracking for donated goods.",
    role: "End-to-End UI/UX Designer",
    responsibilities: [
      "User research",
      "Persona development",
      "Wireframing",
      "High-fidelity prototyping",
      "Usability-focused interface design",
    ],
    tools: ["Figma", "UI Research", "Prototype", "Accessibility"],
    results: [
      "Produced a structured mobile donation flow from research through high-fidelity prototype.",
      "Clarified donation status and foundation information in the interface concept.",
    ],
    lessonsLearned: [
      "Donation products need trust signals and clear status feedback.",
      "Physical-good donation flows should reduce ambiguity before users commit to an action.",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    links: [],
    featured: true,
    displayOrder: 1,
  },
  {
    id: "android-paraphrasing-app",
    slug: "android-paraphrasing-app",
    title: "Android Paraphrasing Application",
    summary:
      "Android UI/UX exploration for a writing-support tool, covering research, wireframes, prototype flow, and usability-oriented refinements.",
    category: "UI/UX Design",
    year: "2021",
    type: "Kampus Merdeka Internship",
    visualLabel: "Low-fi to high-fi comparison",
    image: placeholderImages.uiux,
    video: "",
    gallery: [
      galleryItem(
        placeholderImages.uiux,
        "Neutral UI UX placeholder for Android paraphrasing app",
        "Replace with wireframe and prototype screenshots."
      ),
    ],
    context:
      "Conducted research and interface design for an Android paraphrasing tool, focused on usability, readability, and user engagement.",
    problem:
      "Users needed a simple writing-support tool that could be understood quickly and used comfortably on Android devices.",
    solution:
      "Built wireframes and interactive prototypes aligned with Android design patterns, then refined the flow through usability testing.",
    role: "UI/UX Designer",
    responsibilities: [
      "User research",
      "Usability testing",
      "Android UI flow design",
      "Wireframe creation",
      "Interactive Figma prototype",
    ],
    tools: ["Figma", "Android Design Guidelines", "Usability Testing"],
    results: [
      "Translated writing-support requirements into Android-friendly screen flows.",
      "Created prototype artifacts that can be reused as portfolio evidence once visuals are available.",
    ],
    lessonsLearned: [
      "Mobile writing tools need low-friction input and readable output states.",
      "Usability testing is most useful when prototype flows are simple enough for users to finish unaided.",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    links: [],
    featured: true,
    displayOrder: 2,
  },
  {
    id: "agate-game-prototype",
    slug: "agate-game-prototype",
    title: "Interactive Game Prototype",
    summary:
      "Prototype-focused game development work combining concept documentation, UI exploration, character/interface design, and Unity implementation.",
    category: "Video & Game",
    year: "2021 - 2022",
    type: "PT. Agate International Internship",
    visualLabel: "Gameplay clip / UI screen recording",
    image: placeholderImages.creative,
    video: "",
    gallery: [
      galleryItem(
        placeholderImages.creative,
        "Neutral creative project placeholder for game prototype",
        "Replace with gameplay clip, UI screens, or safe prototype screenshots."
      ),
    ],
    context:
      "Translated game concepts into design documents, UI prototypes, and Unity-based interactive implementations.",
    problem:
      "Raw gameplay ideas needed to become testable prototypes with readable interfaces, clear character behavior, and stable interaction loops.",
    solution:
      "Designed interfaces and characters in Figma, documented the game concept, then implemented and tested prototype mechanics in Unity using C#.",
    role: "Game Programmer and Prototype Designer",
    responsibilities: [
      "Game concept documentation",
      "Interface and character prototyping",
      "Unity implementation",
      "C# scripting",
      "Playtesting and debugging",
    ],
    tools: ["Unity", "C#", "Figma", "Game Design Document"],
    results: [
      "Converted concept ideas into playable prototype work and supporting documentation.",
      "Practiced bridging design intent with implementation constraints in Unity.",
    ],
    lessonsLearned: [
      "Prototype scope needs to be small enough for fast testing.",
      "Game UI decisions become clearer when tested inside an actual interaction loop.",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    links: [],
    featured: true,
    displayOrder: 3,
  },
  {
    id: "bni-l2-operations",
    slug: "technical-support-l2-operations",
    title: "Technical Support L2 Operations",
    summary:
      "Non-sensitive case study framing L2 support work: troubleshooting, escalation handling, patch testing, monitoring, and coordination.",
    category: "IT & Data",
    year: "2025 - Present",
    type: "PT. Bank Negara Indonesia",
    visualLabel: "Non-sensitive system flowchart",
    image: placeholderImages.itData,
    video: "",
    gallery: [
      galleryItem(
        placeholderImages.itData,
        "Neutral IT data placeholder for L2 support operations",
        "Replace with a non-sensitive workflow diagram only."
      ),
    ],
    context:
      "Supporting banking systems and applications through L2 troubleshooting, escalation handling, monitoring, and system testing.",
    problem:
      "Critical systems require fast issue analysis, reliable coordination, and careful patch validation without exposing sensitive operational data.",
    solution:
      "Handled escalated issues, collaborated with development teams and vendors, tested updates, monitored system performance, and documented ticket status.",
    role: "Technical Support L2",
    responsibilities: [
      "Troubleshooting banking applications",
      "Escalation handling from L1 support",
      "Patch and update testing",
      "Monitoring and reporting",
      "Vendor and developer coordination",
    ],
    tools: ["Monitoring Tools", "Ticket Reports", "System Testing", "Incident Analysis"],
    results: [
      "Supported escalated issue handling and cross-team coordination in an L2 operations context.",
      "Kept the portfolio presentation non-sensitive by focusing on process, role, and communication patterns.",
    ],
    lessonsLearned: [
      "Operational support work should be documented without exposing internal system details.",
      "Reliable incident handling depends on clear escalation, testing discipline, and concise status reporting.",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    links: [],
    featured: true,
    displayOrder: 4,
  },
  {
    id: "data-analytics-g2academy",
    slug: "data-analytics-predictive-modeling",
    title: "Data Analytics & Predictive Modeling",
    summary:
      "Course project portfolio entry covering data cleaning, exploratory analysis, SQL/Python practice, predictive modeling basics, and Tableau visualization.",
    category: "IT & Data",
    year: "Course Project",
    type: "G2Academy",
    visualLabel: "Tableau dashboard / Python notebook",
    image: placeholderImages.itData,
    video: "",
    gallery: [
      galleryItem(
        placeholderImages.itData,
        "Neutral IT data placeholder for analytics project",
        "Replace with dashboard screenshot or notebook preview."
      ),
    ],
    context:
      "Applied data cleaning, exploratory data analysis, Python scripting, machine learning basics, SQL, and Tableau visualization.",
    problem:
      "Raw datasets need structured staging, analysis, and clear visualization before they can support meaningful decisions.",
    solution:
      "Used SQL and Python to prepare and analyze data, then translated findings into clean visual dashboards and presentation-ready insights.",
    role: "Data Analyst Learner",
    responsibilities: [
      "SQL data cleaning",
      "Exploratory data analysis",
      "Python scripting",
      "Predictive modeling",
      "Tableau visualization",
    ],
    tools: ["SQL", "Python", "Machine Learning", "Tableau"],
    results: [
      "Built a practice workflow from raw data preparation to visualization.",
      "Created a project structure that can later link to a GitHub notebook or dashboard export.",
    ],
    lessonsLearned: [
      "Analysis is easier to communicate when cleaning decisions are documented.",
      "Dashboards need a clear question before charts become useful.",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    links: [],
    featured: false,
    displayOrder: 5,
  },
  {
    id: "reycom-print-design",
    slug: "reycom-print-production-design",
    title: "Print Production & Warehouse Design",
    summary:
      "Production-oriented design work for print materials, supported by Excel-based warehouse data organization.",
    category: "Video & Game",
    year: "2024",
    type: "PT. Reycom Document Solusi",
    visualLabel: "Print layout samples",
    image: placeholderImages.creative,
    video: "",
    gallery: [
      galleryItem(
        placeholderImages.creative,
        "Neutral creative placeholder for print production design",
        "Replace with approved print samples only."
      ),
    ],
    context:
      "Designed and prepared envelope, map, certificate, case, and cover materials while organizing warehouse data in Excel.",
    problem:
      "Print production requires accurate layouting, consistent file preparation, and clean data organization to reduce production errors.",
    solution:
      "Refined designs for printing standards and organized supporting warehouse data for better operational clarity.",
    role: "Warehouse Design Intern",
    responsibilities: [
      "Print layouting",
      "Design refinement",
      "Excel data organization",
      "Production accuracy checking",
    ],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Excel", "Print Production"],
    results: [
      "Prepared print-oriented design assets with attention to production accuracy.",
      "Connected visual preparation with supporting warehouse data organization.",
    ],
    lessonsLearned: [
      "Print work rewards careful file setup more than decorative complexity.",
      "Operational data organization can reduce friction in production workflows.",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    links: [],
    featured: false,
    displayOrder: 6,
  },
  {
    id: "rich-music-video",
    slug: "social-media-video-production",
    title: "Social Media Video Production",
    summary:
      "Short-form video production and editing work for music/event social media content, covering camera operation and post-production.",
    category: "Video & Game",
    year: "2024",
    type: "Rich Music Freelance",
    visualLabel: "Instagram video / showreel",
    image: placeholderImages.creative,
    video: "",
    gallery: [
      galleryItem(
        placeholderImages.creative,
        "Neutral creative placeholder for social media video production",
        "Replace with approved clips or showreel thumbnail."
      ),
    ],
    context:
      "Produced and edited short-form music/event content for social media using camera production and post-production tools.",
    problem:
      "Social content needs to capture attention quickly while staying clean, rhythmic, and suitable for Instagram consumption.",
    solution:
      "Shot footage using a Sony A7 Mark II and edited compact social media outputs with Photoshop and CapCut.",
    role: "Videographer and Video Editor",
    responsibilities: [
      "Camera operation",
      "Video production",
      "Short-form editing",
      "Social media export preparation",
    ],
    tools: ["Sony A7 Mark II", "Photoshop", "CapCut", "Instagram"],
    results: [
      "Produced short-form social media video assets from capture through editing.",
      "Created a portfolio-ready structure for adding showreel links once final clips are approved.",
    ],
    lessonsLearned: [
      "Short-form edits need rhythm, clarity, and fast visual context.",
      "Approved thumbnails and clips matter as much as written project descriptions for multimedia work.",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    links: [],
    featured: false,
    displayOrder: 7,
  },
];

export const skillGroups = [
  {
    title: "UI/UX Design & Prototyping",
    level: "Project Experience",
    usage:
      "Used for research, wireframes, high-fidelity prototypes, usability-focused flows, and portfolio case study preparation.",
    tools: "Figma, Canva, Adobe Photoshop, Adobe Illustrator",
  },
  {
    title: "IT Support, Infrastructure & Troubleshooting",
    level: "Professional Experience",
    usage:
      "Used in L2 support, escalation handling, monitoring, patch/update testing, incident analysis, and reporting.",
    tools: "L2 support, monitoring, escalation, system testing",
  },
  {
    title: "Game Development & Programming",
    level: "Internship / Prototype Experience",
    usage:
      "Used for Unity prototypes, C# scripting, game concept documentation, interface prototyping, and debugging.",
    tools: "Unity, C#, Java OOP, HTML, CSS, JavaScript",
  },
  {
    title: "Data Analytics & Scripting",
    level: "Course / Practice Experience",
    usage:
      "Used for SQL practice, Python analysis, exploratory data work, predictive modeling basics, Tableau, and Excel organization.",
    tools: "SQL, Python, Machine Learning, Tableau, Excel",
  },
];

export const timeline = [
  {
    period: "Jul 2025 - Present",
    title: "Technical Support L2",
    org: "PT. Bank Negara Indonesia",
    description:
      "Troubleshooting systems, handling escalations, testing patches, monitoring performance, and reporting ticket status.",
  },
  {
    period: "Aug 2024 - Nov 2024",
    title: "Warehouse Design Intern",
    org: "PT. Reycom Document Solusi",
    description:
      "Prepared print layouts and organized warehouse data with an accuracy-focused production workflow.",
  },
  {
    period: "May 2024 - Jun 2024",
    title: "Videographer and Video Editor",
    org: "Rich Music",
    description:
      "Produced and edited short-form visual content for social media publication.",
  },
  {
    period: "Sep 2021 - Jan 2022",
    title: "Game Programmer Intern",
    org: "PT. Agate International",
    description:
      "Created game concepts, Figma prototypes, Unity implementations, and C# scripts with playtesting and debugging.",
  },
  {
    period: "Feb 2021 - Jun 2021",
    title: "Mobile Development Path Intern",
    org: "Kampus Merdeka",
    description:
      "Conducted user research, usability testing, and Android UI/UX prototyping using Figma.",
  },
];

export const portfolioData = {
  profile,
  expertise,
  projects,
  skillGroups,
  timeline,
};
