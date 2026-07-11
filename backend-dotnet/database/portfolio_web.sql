CREATE DATABASE IF NOT EXISTS portfolio_web
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_web;

CREATE TABLE IF NOT EXISTS portfolio_profiles (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(150) NOT NULL,
  Title varchar(180) NOT NULL,
  Headline varchar(300) NOT NULL,
  Subheadline varchar(600) NOT NULL,
  Location varchar(120) NOT NULL,
  Email varchar(254) NOT NULL,
  Phone varchar(50) NOT NULL,
  Linkedin varchar(300) NOT NULL,
  Github varchar(300) NOT NULL,
  PortfolioNode varchar(120) NOT NULL,
  CvUrl varchar(300) NOT NULL,
  ImageUrl varchar(500) NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE IF NOT EXISTS expertise_items (
  Id int NOT NULL AUTO_INCREMENT,
  SortOrder int NOT NULL,
  Title varchar(150) NOT NULL,
  Eyebrow varchar(100) NOT NULL,
  Description varchar(600) NOT NULL,
  ToolsJson longtext NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  Id int NOT NULL AUTO_INCREMENT,
  ProjectId varchar(100) NOT NULL,
  Slug varchar(100) NOT NULL,
  SortOrder int NOT NULL,
  DisplayOrder int NOT NULL,
  Title varchar(180) NOT NULL,
  Summary longtext NOT NULL,
  Category varchar(80) NOT NULL,
  Year varchar(50) NOT NULL,
  Type varchar(120) NOT NULL,
  VisualLabel varchar(160) NOT NULL,
  ImageUrl varchar(500) NOT NULL,
  VideoUrl varchar(500) NOT NULL,
  GalleryJson longtext NOT NULL,
  Context longtext NOT NULL,
  Problem longtext NOT NULL,
  Solution longtext NOT NULL,
  Role varchar(160) NOT NULL,
  ResponsibilitiesJson longtext NOT NULL,
  ToolsJson longtext NOT NULL,
  ResultsJson longtext NOT NULL,
  LessonsLearnedJson longtext NOT NULL,
  GithubUrl varchar(500) NOT NULL,
  LiveDemoUrl varchar(500) NOT NULL,
  LinksJson longtext NOT NULL,
  Featured tinyint(1) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY IX_portfolio_projects_ProjectId (ProjectId),
  UNIQUE KEY IX_portfolio_projects_Slug (Slug)
);

CREATE TABLE IF NOT EXISTS skill_groups (
  Id int NOT NULL AUTO_INCREMENT,
  SortOrder int NOT NULL,
  Title varchar(180) NOT NULL,
  Score int NOT NULL,
  `Level` varchar(120) NOT NULL,
  `Usage` varchar(500) NOT NULL,
  Tools varchar(300) NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE IF NOT EXISTS timeline_items (
  Id int NOT NULL AUTO_INCREMENT,
  SortOrder int NOT NULL,
  Period varchar(80) NOT NULL,
  Title varchar(150) NOT NULL,
  Org varchar(150) NOT NULL,
  Description varchar(600) NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  Id int NOT NULL AUTO_INCREMENT,
  Topic varchar(80) NOT NULL,
  Name varchar(100) NOT NULL,
  Email varchar(254) NOT NULL,
  Message longtext NOT NULL,
  CreatedAtUtc datetime(6) NOT NULL,
  SourceIp varchar(80) NOT NULL,
  UserAgent varchar(500) NOT NULL,
  EmailDeliveryStatus varchar(80) NOT NULL,
  PRIMARY KEY (Id)
);

INSERT INTO portfolio_profiles
  (Id, Name, Title, Headline, Subheadline, Location, Email, Phone, Linkedin, Github, PortfolioNode, CvUrl, ImageUrl)
VALUES
  (1, 'Dandi Prayogatama', 'Technical Support L2 | UI/UX Designer | Creative Technologist', 'I design intuitive user experiences and engineer reliable technical solutions.', 'Bridging human-centered design, IT operations, data thinking, and multimedia execution for products that feel clear, stable, and useful.', 'Jakarta, Indonesia', 'dandi@gmail.com', '0815-9933-123', 'https://linkedin.com/in/dandirayo', 'https://github.com/dandirayo', 'dandirayo.art', '/cv-dandi-prayogatama.pdf', '/media/placeholders/profile-placeholder.webp')
ON DUPLICATE KEY UPDATE
  Name = VALUES(Name),
  Title = VALUES(Title),
  Headline = VALUES(Headline),
  Subheadline = VALUES(Subheadline),
  Location = VALUES(Location),
  Email = VALUES(Email),
  Phone = VALUES(Phone),
  Linkedin = VALUES(Linkedin),
  Github = VALUES(Github),
  PortfolioNode = VALUES(PortfolioNode),
  CvUrl = VALUES(CvUrl),
  ImageUrl = VALUES(ImageUrl);

INSERT INTO expertise_items
  (Id, SortOrder, Title, Eyebrow, Description, ToolsJson)
VALUES
  (1, 1, 'UI/UX & Product Design', 'Research to Prototype', 'Turning user pain points into clear digital flows through research, persona development, wireframing, and high-fidelity prototyping.', '["Figma","Wireframing","Usability Testing","Design Systems"]'),
  (2, 2, 'IT Systems & Technical Support', 'L2 Operations', 'Resolving escalated issues, supporting critical applications, testing patches, and monitoring system reliability in production environments.', '["Troubleshooting","Monitoring","Ticketing","System Testing"]'),
  (3, 3, 'Multimedia & Game Development', 'Visual + Interactive', 'Creating interactive game prototypes, visual assets, video edits, and social media content with a practical production mindset.', '["Unity","C#","Adobe Creative Suite","CapCut"]')
ON DUPLICATE KEY UPDATE
  SortOrder = VALUES(SortOrder),
  Title = VALUES(Title),
  Eyebrow = VALUES(Eyebrow),
  Description = VALUES(Description),
  ToolsJson = VALUES(ToolsJson);

INSERT INTO portfolio_projects
  (Id, ProjectId, Slug, SortOrder, DisplayOrder, Title, Summary, Category, Year, Type, VisualLabel, ImageUrl, VideoUrl, GalleryJson, Context, Problem, Solution, Role, ResponsibilitiesJson, ToolsJson, ResultsJson, LessonsLearnedJson, GithubUrl, LiveDemoUrl, LinksJson, Featured)
VALUES
  (1, 'peduli-donasi', 'peduli-donasi', 1, 1, 'Peduli Donasi - Donation Application', 'End-to-end UI/UX case study for a mobile donation flow that helps donors understand how to donate goods to social foundations.', 'UI/UX Design', '2023', 'Thesis Project', 'Mobile app mockup / Figma prototype', '/media/placeholders/project-uiux.webp', '', '[{"type":"image","url":"/media/placeholders/project-uiux.webp","alt":"Neutral UI UX placeholder for Peduli Donasi","caption":"Replace with real app screens or Figma export."}]', 'Designed an end-to-end mobile donation application to help donors contribute goods to social foundations in a simpler and more accessible way.', 'People who want to donate physical goods often face unclear donation flows, fragmented foundation information, and low transparency around validation status.', 'Created a user-friendly donation flow with accessible layouts, social engagement touchpoints, and clearer status tracking for donated goods.', 'End-to-End UI/UX Designer', '["User research","Persona development","Wireframing","High-fidelity prototyping","Usability-focused interface design"]', '["Figma","UI Research","Prototype","Accessibility"]', '["Produced a structured mobile donation flow from research through high-fidelity prototype.","Clarified donation status and foundation information in the interface concept."]', '["Donation products need trust signals and clear status feedback.","Physical-good donation flows should reduce ambiguity before users commit to an action."]', '', '', '[]', 1),
  (2, 'android-paraphrasing-app', 'android-paraphrasing-app', 2, 2, 'Android Paraphrasing Application', 'Android UI/UX exploration for a writing-support tool, covering research, wireframes, prototype flow, and usability-oriented refinements.', 'UI/UX Design', '2021', 'Kampus Merdeka Internship', 'Low-fi to high-fi comparison', '/media/placeholders/project-uiux.webp', '', '[{"type":"image","url":"/media/placeholders/project-uiux.webp","alt":"Neutral UI UX placeholder for Android paraphrasing app","caption":"Replace with wireframe and prototype screenshots."}]', 'Conducted research and interface design for an Android paraphrasing tool, focused on usability, readability, and user engagement.', 'Users needed a simple writing-support tool that could be understood quickly and used comfortably on Android devices.', 'Built wireframes and interactive prototypes aligned with Android design patterns, then refined the flow through usability testing.', 'UI/UX Designer', '["User research","Usability testing","Android UI flow design","Wireframe creation","Interactive Figma prototype"]', '["Figma","Android Design Guidelines","Usability Testing"]', '["Translated writing-support requirements into Android-friendly screen flows.","Created prototype artifacts that can be reused as portfolio evidence once visuals are available."]', '["Mobile writing tools need low-friction input and readable output states.","Usability testing is most useful when prototype flows are simple enough for users to finish unaided."]', '', '', '[]', 1),
  (3, 'agate-game-prototype', 'agate-game-prototype', 3, 3, 'Interactive Game Prototype', 'Prototype-focused game development work combining concept documentation, UI exploration, character/interface design, and Unity implementation.', 'Video & Game', '2021 - 2022', 'PT. Agate International Internship', 'Gameplay clip / UI screen recording', '/media/placeholders/project-creative.webp', '', '[{"type":"image","url":"/media/placeholders/project-creative.webp","alt":"Neutral creative project placeholder for game prototype","caption":"Replace with gameplay clip, UI screens, or safe prototype screenshots."}]', 'Translated game concepts into design documents, UI prototypes, and Unity-based interactive implementations.', 'Raw gameplay ideas needed to become testable prototypes with readable interfaces, clear character behavior, and stable interaction loops.', 'Designed interfaces and characters in Figma, documented the game concept, then implemented and tested prototype mechanics in Unity using C#.', 'Game Programmer and Prototype Designer', '["Game concept documentation","Interface and character prototyping","Unity implementation","C# scripting","Playtesting and debugging"]', '["Unity","C#","Figma","Game Design Document"]', '["Converted concept ideas into playable prototype work and supporting documentation.","Practiced bridging design intent with implementation constraints in Unity."]', '["Prototype scope needs to be small enough for fast testing.","Game UI decisions become clearer when tested inside an actual interaction loop."]', '', '', '[]', 1),
  (4, 'bni-l2-operations', 'technical-support-l2-operations', 4, 4, 'Technical Support L2 Operations', 'Non-sensitive case study framing L2 support work: troubleshooting, escalation handling, patch testing, monitoring, and coordination.', 'IT & Data', '2025 - Present', 'PT. Bank Negara Indonesia', 'Non-sensitive system flowchart', '/media/placeholders/project-it-data.webp', '', '[{"type":"image","url":"/media/placeholders/project-it-data.webp","alt":"Neutral IT data placeholder for L2 support operations","caption":"Replace with a non-sensitive workflow diagram only."}]', 'Supporting banking systems and applications through L2 troubleshooting, escalation handling, monitoring, and system testing.', 'Critical systems require fast issue analysis, reliable coordination, and careful patch validation without exposing sensitive operational data.', 'Handled escalated issues, collaborated with development teams and vendors, tested updates, monitored system performance, and documented ticket status.', 'Technical Support L2', '["Troubleshooting banking applications","Escalation handling from L1 support","Patch and update testing","Monitoring and reporting","Vendor and developer coordination"]', '["Monitoring Tools","Ticket Reports","System Testing","Incident Analysis"]', '["Supported escalated issue handling and cross-team coordination in an L2 operations context.","Kept the portfolio presentation non-sensitive by focusing on process, role, and communication patterns."]', '["Operational support work should be documented without exposing internal system details.","Reliable incident handling depends on clear escalation, testing discipline, and concise status reporting."]', '', '', '[]', 1),
  (5, 'data-analytics-g2academy', 'data-analytics-predictive-modeling', 5, 5, 'Data Analytics & Predictive Modeling', 'Course project portfolio entry covering data cleaning, exploratory analysis, SQL/Python practice, predictive modeling basics, and Tableau visualization.', 'IT & Data', 'Course Project', 'G2Academy', 'Tableau dashboard / Python notebook', '/media/placeholders/project-it-data.webp', '', '[{"type":"image","url":"/media/placeholders/project-it-data.webp","alt":"Neutral IT data placeholder for analytics project","caption":"Replace with dashboard screenshot or notebook preview."}]', 'Applied data cleaning, exploratory data analysis, Python scripting, machine learning basics, SQL, and Tableau visualization.', 'Raw datasets need structured staging, analysis, and clear visualization before they can support meaningful decisions.', 'Used SQL and Python to prepare and analyze data, then translated findings into clean visual dashboards and presentation-ready insights.', 'Data Analyst Learner', '["SQL data cleaning","Exploratory data analysis","Python scripting","Predictive modeling","Tableau visualization"]', '["SQL","Python","Machine Learning","Tableau"]', '["Built a practice workflow from raw data preparation to visualization.","Created a project structure that can later link to a GitHub notebook or dashboard export."]', '["Analysis is easier to communicate when cleaning decisions are documented.","Dashboards need a clear question before charts become useful."]', '', '', '[]', 0),
  (6, 'reycom-print-design', 'reycom-print-production-design', 6, 6, 'Print Production & Warehouse Design', 'Production-oriented design work for print materials, supported by Excel-based warehouse data organization.', 'Video & Game', '2024', 'PT. Reycom Document Solusi', 'Print layout samples', '/media/placeholders/project-creative.webp', '', '[{"type":"image","url":"/media/placeholders/project-creative.webp","alt":"Neutral creative placeholder for print production design","caption":"Replace with approved print samples only."}]', 'Designed and prepared envelope, map, certificate, case, and cover materials while organizing warehouse data in Excel.', 'Print production requires accurate layouting, consistent file preparation, and clean data organization to reduce production errors.', 'Refined designs for printing standards and organized supporting warehouse data for better operational clarity.', 'Warehouse Design Intern', '["Print layouting","Design refinement","Excel data organization","Production accuracy checking"]', '["Adobe Photoshop","Adobe Illustrator","Excel","Print Production"]', '["Prepared print-oriented design assets with attention to production accuracy.","Connected visual preparation with supporting warehouse data organization."]', '["Print work rewards careful file setup more than decorative complexity.","Operational data organization can reduce friction in production workflows."]', '', '', '[]', 0),
  (7, 'rich-music-video', 'social-media-video-production', 7, 7, 'Social Media Video Production', 'Short-form video production and editing work for music/event social media content, covering camera operation and post-production.', 'Video & Game', '2024', 'Rich Music Freelance', 'Instagram video / showreel', '/media/placeholders/project-creative.webp', '', '[{"type":"image","url":"/media/placeholders/project-creative.webp","alt":"Neutral creative placeholder for social media video production","caption":"Replace with approved clips or showreel thumbnail."}]', 'Produced and edited short-form music/event content for social media using camera production and post-production tools.', 'Social content needs to capture attention quickly while staying clean, rhythmic, and suitable for Instagram consumption.', 'Shot footage using a Sony A7 Mark II and edited compact social media outputs with Photoshop and CapCut.', 'Videographer and Video Editor', '["Camera operation","Video production","Short-form editing","Social media export preparation"]', '["Sony A7 Mark II","Photoshop","CapCut","Instagram"]', '["Produced short-form social media video assets from capture through editing.","Created a portfolio-ready structure for adding showreel links once final clips are approved."]', '["Short-form edits need rhythm, clarity, and fast visual context.","Approved thumbnails and clips matter as much as written project descriptions for multimedia work."]', '', '', '[]', 0)
ON DUPLICATE KEY UPDATE
  ProjectId = VALUES(ProjectId),
  Slug = VALUES(Slug),
  SortOrder = VALUES(SortOrder),
  DisplayOrder = VALUES(DisplayOrder),
  Title = VALUES(Title),
  Summary = VALUES(Summary),
  Category = VALUES(Category),
  Year = VALUES(Year),
  Type = VALUES(Type),
  VisualLabel = VALUES(VisualLabel),
  ImageUrl = VALUES(ImageUrl),
  VideoUrl = VALUES(VideoUrl),
  GalleryJson = VALUES(GalleryJson),
  Context = VALUES(Context),
  Problem = VALUES(Problem),
  Solution = VALUES(Solution),
  Role = VALUES(Role),
  ResponsibilitiesJson = VALUES(ResponsibilitiesJson),
  ToolsJson = VALUES(ToolsJson),
  ResultsJson = VALUES(ResultsJson),
  LessonsLearnedJson = VALUES(LessonsLearnedJson),
  GithubUrl = VALUES(GithubUrl),
  LiveDemoUrl = VALUES(LiveDemoUrl),
  LinksJson = VALUES(LinksJson),
  Featured = VALUES(Featured);

INSERT INTO skill_groups
  (Id, SortOrder, Title, Score, `Level`, `Usage`, Tools)
VALUES
  (1, 1, 'UI/UX Design & Prototyping', 0, 'Project Experience', 'Used for research, wireframes, high-fidelity prototypes, usability-focused flows, and portfolio case study preparation.', 'Figma, Canva, Adobe Photoshop, Adobe Illustrator'),
  (2, 2, 'IT Support, Infrastructure & Troubleshooting', 0, 'Professional Experience', 'Used in L2 support, escalation handling, monitoring, patch/update testing, incident analysis, and reporting.', 'L2 support, monitoring, escalation, system testing'),
  (3, 3, 'Game Development & Programming', 0, 'Internship / Prototype Experience', 'Used for Unity prototypes, C# scripting, game concept documentation, interface prototyping, and debugging.', 'Unity, C#, Java OOP, HTML, CSS, JavaScript'),
  (4, 4, 'Data Analytics & Scripting', 0, 'Course / Practice Experience', 'Used for SQL practice, Python analysis, exploratory data work, predictive modeling basics, Tableau, and Excel organization.', 'SQL, Python, Machine Learning, Tableau, Excel')
ON DUPLICATE KEY UPDATE
  SortOrder = VALUES(SortOrder),
  Title = VALUES(Title),
  Score = VALUES(Score),
  `Level` = VALUES(`Level`),
  `Usage` = VALUES(`Usage`),
  Tools = VALUES(Tools);

INSERT INTO timeline_items
  (Id, SortOrder, Period, Title, Org, Description)
VALUES
  (1, 1, 'Jul 2025 - Present', 'Technical Support L2', 'PT. Bank Negara Indonesia', 'Troubleshooting systems, handling escalations, testing patches, monitoring performance, and reporting ticket status.'),
  (2, 2, 'Aug 2024 - Nov 2024', 'Warehouse Design Intern', 'PT. Reycom Document Solusi', 'Prepared print layouts and organized warehouse data with an accuracy-focused production workflow.'),
  (3, 3, 'May 2024 - Jun 2024', 'Videographer and Video Editor', 'Rich Music', 'Produced and edited short-form visual content for social media publication.'),
  (4, 4, 'Sep 2021 - Jan 2022', 'Game Programmer Intern', 'PT. Agate International', 'Created game concepts, Figma prototypes, Unity implementations, and C# scripts with playtesting and debugging.'),
  (5, 5, 'Feb 2021 - Jun 2021', 'Mobile Development Path Intern', 'Kampus Merdeka', 'Conducted user research, usability testing, and Android UI/UX prototyping using Figma.')
ON DUPLICATE KEY UPDATE
  SortOrder = VALUES(SortOrder),
  Period = VALUES(Period),
  Title = VALUES(Title),
  Org = VALUES(Org),
  Description = VALUES(Description);
