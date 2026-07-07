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
  SortOrder int NOT NULL,
  Title varchar(180) NOT NULL,
  Category varchar(80) NOT NULL,
  Year varchar(50) NOT NULL,
  Type varchar(120) NOT NULL,
  VisualLabel varchar(160) NOT NULL,
  ImageUrl varchar(500) NOT NULL,
  VideoUrl varchar(500) NOT NULL,
  Context longtext NOT NULL,
  Problem longtext NOT NULL,
  Solution longtext NOT NULL,
  Role varchar(160) NOT NULL,
  ResponsibilitiesJson longtext NOT NULL,
  ToolsJson longtext NOT NULL,
  LinksJson longtext NOT NULL,
  Featured tinyint(1) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY IX_portfolio_projects_ProjectId (ProjectId)
);

CREATE TABLE IF NOT EXISTS skill_groups (
  Id int NOT NULL AUTO_INCREMENT,
  SortOrder int NOT NULL,
  Title varchar(180) NOT NULL,
  Score int NOT NULL,
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
  (Id, ProjectId, SortOrder, Title, Category, Year, Type, VisualLabel, ImageUrl, VideoUrl, Context, Problem, Solution, Role, ResponsibilitiesJson, ToolsJson, LinksJson, Featured)
VALUES
  (1, 'peduli-donasi', 1, 'Peduli Donasi - Donation Application', 'UI/UX Design', '2023', 'Thesis Project', 'Mobile app mockup / Figma prototype', '/media/placeholders/project-uiux.webp', '', 'Designed an end-to-end mobile donation application to help donors contribute goods to social foundations in a simpler and more accessible way.', 'People who want to donate physical goods often face unclear donation flows, fragmented foundation information, and low transparency around validation status.', 'Created a user-friendly donation flow with accessible layouts, social engagement touchpoints, and clearer status tracking for donated goods.', 'End-to-End UI/UX Designer', '["User research","Persona development","Wireframing","High-fidelity prototyping","Usability-focused interface design"]', '["Figma","UI Research","Prototype","Accessibility"]', '[{"label":"Add Figma Prototype","url":""},{"label":"Add Case Study PDF","url":""}]', 1),
  (2, 'android-paraphrasing-app', 2, 'Android Paraphrasing Application', 'UI/UX Design', '2021', 'Kampus Merdeka Internship', 'Low-fi to high-fi comparison', '/media/placeholders/project-uiux.webp', '', 'Conducted research and interface design for an Android paraphrasing tool, focused on usability, readability, and user engagement.', 'Users needed a simple writing-support tool that could be understood quickly and used comfortably on Android devices.', 'Built wireframes and interactive prototypes aligned with Android design patterns, then refined the flow through usability testing.', 'UI/UX Designer', '["User research","Usability testing","Android UI flow design","Wireframe creation","Interactive Figma prototype"]', '["Figma","Android Design Guidelines","Usability Testing"]', '[{"label":"Add Design System Case Study","url":""}]', 1),
  (3, 'agate-game-prototype', 3, 'Interactive Game Prototype', 'Video & Game', '2021 - 2022', 'PT. Agate International Internship', 'Gameplay clip / UI screen recording', '/media/placeholders/project-creative.webp', '', 'Translated game concepts into design documents, UI prototypes, and Unity-based interactive implementations.', 'Raw gameplay ideas needed to become testable prototypes with readable interfaces, clear character behavior, and stable interaction loops.', 'Designed interfaces and characters in Figma, documented the game concept, then implemented and tested prototype mechanics in Unity using C#.', 'Game Programmer and Prototype Designer', '["Game concept documentation","Interface and character prototyping","Unity implementation","C# scripting","Playtesting and debugging"]', '["Unity","C#","Figma","Game Design Document"]', '[{"label":"Add Game Design Documentation","url":""}]', 1),
  (4, 'bni-l2-operations', 4, 'Technical Support L2 Operations', 'IT & Data', '2025 - Present', 'PT. Bank Negara Indonesia', 'Non-sensitive system flowchart', '/media/placeholders/project-it-data.webp', '', 'Supporting banking systems and applications through L2 troubleshooting, escalation handling, monitoring, and system testing.', 'Critical systems require fast issue analysis, reliable coordination, and careful patch validation without exposing sensitive operational data.', 'Handled escalated issues, collaborated with development teams and vendors, tested updates, monitored system performance, and documented ticket status.', 'Technical Support L2', '["Troubleshooting banking applications","Escalation handling from L1 support","Patch and update testing","Monitoring and reporting","Vendor and developer coordination"]', '["Monitoring Tools","Ticket Reports","System Testing","Incident Analysis"]', '[{"label":"Add Methodology Note","url":""}]', 1),
  (5, 'data-analytics-g2academy', 5, 'Data Analytics & Predictive Modeling', 'IT & Data', 'Course Project', 'G2Academy', 'Tableau dashboard / Python notebook', '/media/placeholders/project-it-data.webp', '', 'Applied data cleaning, exploratory data analysis, Python scripting, machine learning basics, SQL, and Tableau visualization.', 'Raw datasets need structured staging, analysis, and clear visualization before they can support meaningful decisions.', 'Used SQL and Python to prepare and analyze data, then translated findings into clean visual dashboards and presentation-ready insights.', 'Data Analyst Learner', '["SQL data cleaning","Exploratory data analysis","Python scripting","Predictive modeling","Tableau visualization"]', '["SQL","Python","Machine Learning","Tableau"]', '[{"label":"Add GitHub Repository","url":""}]', 0),
  (6, 'reycom-print-design', 6, 'Print Production & Warehouse Design', 'Video & Game', '2024', 'PT. Reycom Document Solusi', 'Print layout samples', '/media/placeholders/project-creative.webp', '', 'Designed and prepared envelope, map, certificate, case, and cover materials while organizing warehouse data in Excel.', 'Print production requires accurate layouting, consistent file preparation, and clean data organization to reduce production errors.', 'Refined designs for printing standards and organized supporting warehouse data for better operational clarity.', 'Warehouse Design Intern', '["Print layouting","Design refinement","Excel data organization","Production accuracy checking"]', '["Adobe Photoshop","Adobe Illustrator","Excel","Print Production"]', '[{"label":"Add Design Samples","url":""}]', 0),
  (7, 'rich-music-video', 7, 'Social Media Video Production', 'Video & Game', '2024', 'Rich Music Freelance', 'Instagram video / showreel', '/media/placeholders/project-creative.webp', '', 'Produced and edited short-form music/event content for social media using camera production and post-production tools.', 'Social content needs to capture attention quickly while staying clean, rhythmic, and suitable for Instagram consumption.', 'Shot footage using a Sony A7 Mark II and edited compact social media outputs with Photoshop and CapCut.', 'Videographer and Video Editor', '["Camera operation","Video production","Short-form editing","Social media export preparation"]', '["Sony A7 Mark II","Photoshop","CapCut","Instagram"]', '[{"label":"Add Showreel","url":""}]', 0)
ON DUPLICATE KEY UPDATE
  ProjectId = VALUES(ProjectId),
  SortOrder = VALUES(SortOrder),
  Title = VALUES(Title),
  Category = VALUES(Category),
  Year = VALUES(Year),
  Type = VALUES(Type),
  VisualLabel = VALUES(VisualLabel),
  ImageUrl = VALUES(ImageUrl),
  VideoUrl = VALUES(VideoUrl),
  Context = VALUES(Context),
  Problem = VALUES(Problem),
  Solution = VALUES(Solution),
  Role = VALUES(Role),
  ResponsibilitiesJson = VALUES(ResponsibilitiesJson),
  ToolsJson = VALUES(ToolsJson),
  LinksJson = VALUES(LinksJson),
  Featured = VALUES(Featured);

INSERT INTO skill_groups
  (Id, SortOrder, Title, Score, Tools)
VALUES
  (1, 1, 'UI/UX Design & Prototyping', 95, 'Figma, Canva, Adobe Photoshop, Adobe Illustrator'),
  (2, 2, 'IT Support, Infrastructure & Troubleshooting', 90, 'L2 support, monitoring, escalation, system testing'),
  (3, 3, 'Game Development & Programming', 85, 'Unity, C#, Java OOP, HTML, CSS, JavaScript'),
  (4, 4, 'Data Analytics & Scripting', 80, 'SQL, Python, Tableau, Excel')
ON DUPLICATE KEY UPDATE
  SortOrder = VALUES(SortOrder),
  Title = VALUES(Title),
  Score = VALUES(Score),
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
