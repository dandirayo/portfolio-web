using System.Text.Json;
using backend_dotnet.Models;
using backend_dotnet.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace backend_dotnet.Data
{
    public static class PortfolioDatabaseInitializer
    {
        public static async Task InitializeAsync(IServiceProvider services, ILogger logger)
        {
            using var scope = services.CreateScope();
            var options = scope.ServiceProvider.GetRequiredService<IOptions<PortfolioDatabaseOptions>>().Value;

            if (!options.AutoInitialize)
            {
                return;
            }

            try
            {
                var context = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
                await context.Database.EnsureCreatedAsync();
                await SeedAsync(context);
            }
            catch (Exception exception)
            {
                logger.LogWarning(
                    exception,
                    "Portfolio database could not be initialized. Start XAMPP MySQL/MariaDB or import backend-dotnet/database/portfolio_web.sql.");
            }
        }

        private static async Task SeedAsync(PortfolioDbContext context)
        {
            if (!await context.PortfolioProfiles.AnyAsync())
            {
                context.PortfolioProfiles.Add(new PortfolioProfile
                {
                    Name = "Dandi Prayogatama",
                    Title = "Technical Support L2 | UI/UX Designer | Creative Technologist",
                    Headline = "I design intuitive user experiences and engineer reliable technical solutions.",
                    Subheadline = "Bridging human-centered design, IT operations, data thinking, and multimedia execution for products that feel clear, stable, and useful.",
                    Location = "Jakarta, Indonesia",
                    Email = "dandi@gmail.com",
                    Phone = "0815-9933-123",
                    Linkedin = "https://linkedin.com/in/dandirayo",
                    Github = "https://github.com/dandirayo",
                    PortfolioNode = "dandirayo.art",
                    CvUrl = "/cv-dandi-prayogatama.pdf",
                    ImageUrl = "/media/placeholders/profile-placeholder.webp",
                });
            }

            if (!await context.ExpertiseItems.AnyAsync())
            {
                context.ExpertiseItems.AddRange(
                    new ExpertiseItem
                    {
                        SortOrder = 1,
                        Title = "UI/UX & Product Design",
                        Eyebrow = "Research to Prototype",
                        Description = "Turning user pain points into clear digital flows through research, persona development, wireframing, and high-fidelity prototyping.",
                        ToolsJson = JsonArray("Figma", "Wireframing", "Usability Testing", "Design Systems"),
                    },
                    new ExpertiseItem
                    {
                        SortOrder = 2,
                        Title = "IT Systems & Technical Support",
                        Eyebrow = "L2 Operations",
                        Description = "Resolving escalated issues, supporting critical applications, testing patches, and monitoring system reliability in production environments.",
                        ToolsJson = JsonArray("Troubleshooting", "Monitoring", "Ticketing", "System Testing"),
                    },
                    new ExpertiseItem
                    {
                        SortOrder = 3,
                        Title = "Multimedia & Game Development",
                        Eyebrow = "Visual + Interactive",
                        Description = "Creating interactive game prototypes, visual assets, video edits, and social media content with a practical production mindset.",
                        ToolsJson = JsonArray("Unity", "C#", "Adobe Creative Suite", "CapCut"),
                    });
            }

            if (!await context.PortfolioProjects.AnyAsync())
            {
                context.PortfolioProjects.AddRange(
                    new PortfolioProject
                    {
                        SortOrder = 1,
                        DisplayOrder = 1,
                        ProjectId = "peduli-donasi",
                        Slug = "peduli-donasi",
                        Title = "Peduli Donasi - Donation Application",
                        Category = "UI/UX Design",
                        Year = "2023",
                        Type = "Thesis Project",
                        Summary = "End-to-end UI/UX case study for a mobile donation flow that helps donors understand how to donate goods to social foundations.",
                        VisualLabel = "Mobile app mockup / Figma prototype",
                        ImageUrl = "/media/placeholders/project-uiux.webp",
                        GalleryJson = JsonGallery(("image", "/media/placeholders/project-uiux.webp", "Neutral UI UX placeholder for Peduli Donasi", "Temporary visual placeholder while final project screens are being prepared.")),
                        Context = "Designed an end-to-end mobile donation application to help donors contribute goods to social foundations in a simpler and more accessible way.",
                        Problem = "People who want to donate physical goods often face unclear donation flows, fragmented foundation information, and low transparency around validation status.",
                        Solution = "Created a user-friendly donation flow with accessible layouts, social engagement touchpoints, and clearer status tracking for donated goods.",
                        Role = "End-to-End UI/UX Designer",
                        ResponsibilitiesJson = JsonArray("User research", "Persona development", "Wireframing", "High-fidelity prototyping", "Usability-focused interface design"),
                        ToolsJson = JsonArray("Figma", "UI Research", "Prototype", "Accessibility"),
                        ResultsJson = JsonArray("Produced a structured mobile donation flow from research through high-fidelity prototype.", "Clarified donation status and foundation information in the interface concept."),
                        LessonsLearnedJson = JsonArray("Donation products need trust signals and clear status feedback.", "Physical-good donation flows should reduce ambiguity before users commit to an action."),
                        LinksJson = JsonLinks(),
                        Featured = true,
                    },
                    new PortfolioProject
                    {
                        SortOrder = 2,
                        DisplayOrder = 2,
                        ProjectId = "android-paraphrasing-app",
                        Slug = "android-paraphrasing-app",
                        Title = "Android Paraphrasing Application",
                        Category = "UI/UX Design",
                        Year = "2021",
                        Type = "Kampus Merdeka Internship",
                        Summary = "Android UI/UX exploration for a writing-support tool, covering research, wireframes, prototype flow, and usability-oriented refinements.",
                        VisualLabel = "Low-fi to high-fi comparison",
                        ImageUrl = "/media/placeholders/project-uiux.webp",
                        GalleryJson = JsonGallery(("image", "/media/placeholders/project-uiux.webp", "Neutral UI UX placeholder for Android paraphrasing app", "Temporary visual placeholder while wireframe and prototype screenshots are being prepared.")),
                        Context = "Conducted research and interface design for an Android paraphrasing tool, focused on usability, readability, and user engagement.",
                        Problem = "Users needed a simple writing-support tool that could be understood quickly and used comfortably on Android devices.",
                        Solution = "Built wireframes and interactive prototypes aligned with Android design patterns, then refined the flow through usability testing.",
                        Role = "UI/UX Designer",
                        ResponsibilitiesJson = JsonArray("User research", "Usability testing", "Android UI flow design", "Wireframe creation", "Interactive Figma prototype"),
                        ToolsJson = JsonArray("Figma", "Android Design Guidelines", "Usability Testing"),
                        ResultsJson = JsonArray("Translated writing-support requirements into Android-friendly screen flows.", "Created prototype artifacts that can be reused as portfolio evidence once visuals are available."),
                        LessonsLearnedJson = JsonArray("Mobile writing tools need low-friction input and readable output states.", "Usability testing is most useful when prototype flows are simple enough for users to finish unaided."),
                        LinksJson = JsonLinks(),
                        Featured = true,
                    },
                    new PortfolioProject
                    {
                        SortOrder = 3,
                        DisplayOrder = 3,
                        ProjectId = "agate-game-prototype",
                        Slug = "agate-game-prototype",
                        Title = "Interactive Game Prototype",
                        Category = "Video & Game",
                        Year = "2021 - 2022",
                        Type = "PT. Agate International Internship",
                        Summary = "Prototype-focused game development work combining concept documentation, UI exploration, character/interface design, and Unity implementation.",
                        VisualLabel = "Gameplay clip / UI screen recording",
                        ImageUrl = "/media/placeholders/project-creative.webp",
                        GalleryJson = JsonGallery(("image", "/media/placeholders/project-creative.webp", "Neutral creative project placeholder for game prototype", "Temporary visual placeholder while approved gameplay or prototype visuals are being prepared.")),
                        Context = "Translated game concepts into design documents, UI prototypes, and Unity-based interactive implementations.",
                        Problem = "Raw gameplay ideas needed to become testable prototypes with readable interfaces, clear character behavior, and stable interaction loops.",
                        Solution = "Designed interfaces and characters in Figma, documented the game concept, then implemented and tested prototype mechanics in Unity using C#.",
                        Role = "Game Programmer and Prototype Designer",
                        ResponsibilitiesJson = JsonArray("Game concept documentation", "Interface and character prototyping", "Unity implementation", "C# scripting", "Playtesting and debugging"),
                        ToolsJson = JsonArray("Unity", "C#", "Figma", "Game Design Document"),
                        ResultsJson = JsonArray("Converted concept ideas into playable prototype work and supporting documentation.", "Practiced bridging design intent with implementation constraints in Unity."),
                        LessonsLearnedJson = JsonArray("Prototype scope needs to be small enough for fast testing.", "Game UI decisions become clearer when tested inside an actual interaction loop."),
                        LinksJson = JsonLinks(),
                        Featured = true,
                    },
                    new PortfolioProject
                    {
                        SortOrder = 4,
                        DisplayOrder = 4,
                        ProjectId = "bni-l2-operations",
                        Slug = "technical-support-l2-operations",
                        Title = "Technical Support L2 Operations",
                        Category = "IT & Data",
                        Year = "2025 - Present",
                        Type = "PT. Bank Negara Indonesia",
                        Summary = "Non-sensitive case study framing L2 support work: troubleshooting, escalation handling, patch testing, monitoring, and coordination.",
                        VisualLabel = "Non-sensitive system flowchart",
                        ImageUrl = "/media/placeholders/project-it-data.webp",
                        GalleryJson = JsonGallery(("image", "/media/placeholders/project-it-data.webp", "Neutral IT data placeholder for L2 support operations", "Temporary visual placeholder for a future non-sensitive workflow diagram.")),
                        Context = "Supporting banking systems and applications through L2 troubleshooting, escalation handling, monitoring, and system testing.",
                        Problem = "Critical systems require fast issue analysis, reliable coordination, and careful patch validation without exposing sensitive operational data.",
                        Solution = "Handled escalated issues, collaborated with development teams and vendors, tested updates, monitored system performance, and documented ticket status.",
                        Role = "Technical Support L2",
                        ResponsibilitiesJson = JsonArray("Troubleshooting banking applications", "Escalation handling from L1 support", "Patch and update testing", "Monitoring and reporting", "Vendor and developer coordination"),
                        ToolsJson = JsonArray("Monitoring Tools", "Ticket Reports", "System Testing", "Incident Analysis"),
                        ResultsJson = JsonArray("Supported escalated issue handling and cross-team coordination in an L2 operations context.", "Kept the portfolio presentation non-sensitive by focusing on process, role, and communication patterns."),
                        LessonsLearnedJson = JsonArray("Operational support work should be documented without exposing internal system details.", "Reliable incident handling depends on clear escalation, testing discipline, and concise status reporting."),
                        LinksJson = JsonLinks(),
                        Featured = true,
                    },
                    new PortfolioProject
                    {
                        SortOrder = 5,
                        DisplayOrder = 5,
                        ProjectId = "data-analytics-g2academy",
                        Slug = "data-analytics-predictive-modeling",
                        Title = "Data Analytics & Predictive Modeling",
                        Category = "IT & Data",
                        Year = "Course Project",
                        Type = "G2Academy",
                        Summary = "Course project portfolio entry covering data cleaning, exploratory analysis, SQL/Python practice, predictive modeling basics, and Tableau visualization.",
                        VisualLabel = "Tableau dashboard / Python notebook",
                        ImageUrl = "/media/placeholders/project-it-data.webp",
                        GalleryJson = JsonGallery(("image", "/media/placeholders/project-it-data.webp", "Neutral IT data placeholder for analytics project", "Temporary visual placeholder while dashboard or notebook previews are being prepared.")),
                        Context = "Applied data cleaning, exploratory data analysis, Python scripting, machine learning basics, SQL, and Tableau visualization.",
                        Problem = "Raw datasets need structured staging, analysis, and clear visualization before they can support meaningful decisions.",
                        Solution = "Used SQL and Python to prepare and analyze data, then translated findings into clean visual dashboards and presentation-ready insights.",
                        Role = "Data Analyst Learner",
                        ResponsibilitiesJson = JsonArray("SQL data cleaning", "Exploratory data analysis", "Python scripting", "Predictive modeling", "Tableau visualization"),
                        ToolsJson = JsonArray("SQL", "Python", "Machine Learning", "Tableau"),
                        ResultsJson = JsonArray("Built a practice workflow from raw data preparation to visualization.", "Created a project structure that can later link to a GitHub notebook or dashboard export."),
                        LessonsLearnedJson = JsonArray("Analysis is easier to communicate when cleaning decisions are documented.", "Dashboards need a clear question before charts become useful."),
                        LinksJson = JsonLinks(),
                        Featured = false,
                    },
                    new PortfolioProject
                    {
                        SortOrder = 6,
                        DisplayOrder = 6,
                        ProjectId = "reycom-print-design",
                        Slug = "reycom-print-production-design",
                        Title = "Print Production & Warehouse Design",
                        Category = "Video & Game",
                        Year = "2024",
                        Type = "PT. Reycom Document Solusi",
                        Summary = "Production-oriented design work for print materials, supported by Excel-based warehouse data organization.",
                        VisualLabel = "Print layout samples",
                        ImageUrl = "/media/placeholders/project-creative.webp",
                        GalleryJson = JsonGallery(("image", "/media/placeholders/project-creative.webp", "Neutral creative placeholder for print production design", "Temporary visual placeholder while approved print samples are being prepared.")),
                        Context = "Designed and prepared envelope, map, certificate, case, and cover materials while organizing warehouse data in Excel.",
                        Problem = "Print production requires accurate layouting, consistent file preparation, and clean data organization to reduce production errors.",
                        Solution = "Refined designs for printing standards and organized supporting warehouse data for better operational clarity.",
                        Role = "Warehouse Design Intern",
                        ResponsibilitiesJson = JsonArray("Print layouting", "Design refinement", "Excel data organization", "Production accuracy checking"),
                        ToolsJson = JsonArray("Adobe Photoshop", "Adobe Illustrator", "Excel", "Print Production"),
                        ResultsJson = JsonArray("Prepared print-oriented design assets with attention to production accuracy.", "Connected visual preparation with supporting warehouse data organization."),
                        LessonsLearnedJson = JsonArray("Print work rewards careful file setup more than decorative complexity.", "Operational data organization can reduce friction in production workflows."),
                        LinksJson = JsonLinks(),
                        Featured = false,
                    },
                    new PortfolioProject
                    {
                        SortOrder = 7,
                        DisplayOrder = 7,
                        ProjectId = "rich-music-video",
                        Slug = "social-media-video-production",
                        Title = "Social Media Video Production",
                        Category = "Video & Game",
                        Year = "2024",
                        Type = "Rich Music Freelance",
                        Summary = "Short-form video production and editing work for music/event social media content, covering camera operation and post-production.",
                        VisualLabel = "Instagram video / showreel",
                        ImageUrl = "/media/placeholders/project-creative.webp",
                        GalleryJson = JsonGallery(("image", "/media/placeholders/project-creative.webp", "Neutral creative placeholder for social media video production", "Temporary visual placeholder while approved clips or a showreel thumbnail are being prepared.")),
                        Context = "Produced and edited short-form music/event content for social media using camera production and post-production tools.",
                        Problem = "Social content needs to capture attention quickly while staying clean, rhythmic, and suitable for Instagram consumption.",
                        Solution = "Shot footage using a Sony A7 Mark II and edited compact social media outputs with Photoshop and CapCut.",
                        Role = "Videographer and Video Editor",
                        ResponsibilitiesJson = JsonArray("Camera operation", "Video production", "Short-form editing", "Social media export preparation"),
                        ToolsJson = JsonArray("Sony A7 Mark II", "Photoshop", "CapCut", "Instagram"),
                        ResultsJson = JsonArray("Produced short-form social media video assets from capture through editing.", "Created a portfolio-ready structure for adding showreel links once final clips are approved."),
                        LessonsLearnedJson = JsonArray("Short-form edits need rhythm, clarity, and fast visual context.", "Approved thumbnails and clips matter as much as written project descriptions for multimedia work."),
                        LinksJson = JsonLinks(),
                        Featured = false,
                    });
            }

            if (!await context.SkillGroups.AnyAsync())
            {
                context.SkillGroups.AddRange(
                    new SkillGroup { SortOrder = 1, Title = "UI/UX Design & Prototyping", Score = 0, Level = "Project Experience", Usage = "Used for research, wireframes, high-fidelity prototypes, usability-focused flows, and portfolio case study preparation.", Tools = "Figma, Canva, Adobe Photoshop, Adobe Illustrator" },
                    new SkillGroup { SortOrder = 2, Title = "IT Support, Infrastructure & Troubleshooting", Score = 0, Level = "Professional Experience", Usage = "Used in L2 support, escalation handling, monitoring, patch/update testing, incident analysis, and reporting.", Tools = "L2 support, monitoring, escalation, system testing" },
                    new SkillGroup { SortOrder = 3, Title = "Game Development & Programming", Score = 0, Level = "Internship / Prototype Experience", Usage = "Used for Unity prototypes, C# scripting, game concept documentation, interface prototyping, and debugging.", Tools = "Unity, C#, Java OOP, HTML, CSS, JavaScript" },
                    new SkillGroup { SortOrder = 4, Title = "Data Analytics & Scripting", Score = 0, Level = "Course / Practice Experience", Usage = "Used for SQL practice, Python analysis, exploratory data work, predictive modeling basics, Tableau, and Excel organization.", Tools = "SQL, Python, Machine Learning, Tableau, Excel" });
            }

            if (!await context.TimelineItems.AnyAsync())
            {
                context.TimelineItems.AddRange(
                    new TimelineItem { SortOrder = 1, Period = "Jul 2025 - Present", Title = "Technical Support L2", Org = "PT. Bank Negara Indonesia", Description = "Troubleshooting systems, handling escalations, testing patches, monitoring performance, and reporting ticket status." },
                    new TimelineItem { SortOrder = 2, Period = "Aug 2024 - Nov 2024", Title = "Warehouse Design Intern", Org = "PT. Reycom Document Solusi", Description = "Prepared print layouts and organized warehouse data with an accuracy-focused production workflow." },
                    new TimelineItem { SortOrder = 3, Period = "May 2024 - Jun 2024", Title = "Videographer and Video Editor", Org = "Rich Music", Description = "Produced and edited short-form visual content for social media publication." },
                    new TimelineItem { SortOrder = 4, Period = "Sep 2021 - Jan 2022", Title = "Game Programmer Intern", Org = "PT. Agate International", Description = "Created game concepts, Figma prototypes, Unity implementations, and C# scripts with playtesting and debugging." },
                    new TimelineItem { SortOrder = 5, Period = "Feb 2021 - Jun 2021", Title = "Mobile Development Path Intern", Org = "Kampus Merdeka", Description = "Conducted user research, usability testing, and Android UI/UX prototyping using Figma." });
            }

            await context.SaveChangesAsync();
        }

        private static string JsonArray(params string[] values)
        {
            return JsonSerializer.Serialize(values);
        }

        private static string JsonLinks(params (string Label, string Url)[] links)
        {
            return JsonSerializer.Serialize(
                links.Select(link => new ProjectLinkSeed(link.Label, link.Url)));
        }

        private static string JsonGallery(params (string Type, string Url, string Alt, string Caption)[] gallery)
        {
            return JsonSerializer.Serialize(
                gallery.Select(item => new ProjectGallerySeed(item.Type, item.Url, item.Alt, item.Caption)));
        }

        private sealed record ProjectLinkSeed(string Label, string Url);

        private sealed record ProjectGallerySeed(string Type, string Url, string Alt, string Caption);
    }
}
