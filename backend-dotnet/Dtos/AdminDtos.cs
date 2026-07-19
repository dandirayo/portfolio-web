namespace backend_dotnet.Dtos
{
    public class AdminDashboardDto
    {
        public AdminProfileDto Profile { get; set; } = new();
        public List<AdminExpertiseDto> Expertise { get; set; } = [];
        public List<AdminProjectDto> Projects { get; set; } = [];
        public List<AdminSkillGroupDto> SkillGroups { get; set; } = [];
        public List<AdminTimelineItemDto> Timeline { get; set; } = [];
        public List<AdminContactSubmissionDto> ContactMessages { get; set; } = [];
    }

    public class AdminProfileDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Headline { get; set; } = string.Empty;
        public string Subheadline { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Linkedin { get; set; } = string.Empty;
        public string Github { get; set; } = string.Empty;
        public string PortfolioNode { get; set; } = string.Empty;
        public string CvUrl { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }

    public class AdminExpertiseDto
    {
        public int Id { get; set; }
        public int SortOrder { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Eyebrow { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Tools { get; set; } = [];
    }

    public class AdminProjectDto
    {
        public int Id { get; set; }
        public string ProjectId { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public int SortOrder { get; set; }
        public int DisplayOrder { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string VisualLabel { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Video { get; set; } = string.Empty;
        public List<ProjectGalleryItemDto> Gallery { get; set; } = [];
        public string Context { get; set; } = string.Empty;
        public string Problem { get; set; } = string.Empty;
        public string Solution { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public List<string> Responsibilities { get; set; } = [];
        public List<string> Tools { get; set; } = [];
        public List<string> Results { get; set; } = [];
        public List<string> LessonsLearned { get; set; } = [];
        public string GithubUrl { get; set; } = string.Empty;
        public string LiveDemoUrl { get; set; } = string.Empty;
        public List<ProjectLinkDto> Links { get; set; } = [];
        public bool Featured { get; set; }
    }

    public class AdminSkillGroupDto
    {
        public int Id { get; set; }
        public int SortOrder { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Score { get; set; }
        public string Level { get; set; } = string.Empty;
        public string Usage { get; set; } = string.Empty;
        public string Tools { get; set; } = string.Empty;
    }

    public class AdminTimelineItemDto
    {
        public int Id { get; set; }
        public int SortOrder { get; set; }
        public string Period { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Org { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class AdminContactSubmissionDto
    {
        public int Id { get; set; }
        public string Topic { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedAtUtc { get; set; }
        public string SourceIp { get; set; } = string.Empty;
        public string UserAgent { get; set; } = string.Empty;
        public string EmailDeliveryStatus { get; set; } = string.Empty;
    }
}
