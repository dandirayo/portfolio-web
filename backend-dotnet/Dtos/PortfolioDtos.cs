namespace backend_dotnet.Dtos
{
    public record PortfolioResponseDto(
        ProfileDto Profile,
        IReadOnlyList<ExpertiseDto> Expertise,
        IReadOnlyList<ProjectDto> Projects,
        IReadOnlyList<SkillGroupDto> SkillGroups,
        IReadOnlyList<TimelineItemDto> Timeline);

    public record ProfileDto(
        string Name,
        string Title,
        string Headline,
        string Subheadline,
        string Location,
        string Email,
        string Phone,
        string Linkedin,
        string Github,
        string PortfolioNode,
        string CvUrl,
        string Image);

    public record ExpertiseDto(
        string Title,
        string Eyebrow,
        string Description,
        IReadOnlyList<string> Tools);

    public record ProjectDto(
        string Id,
        string Slug,
        string Title,
        string Summary,
        string Category,
        string Year,
        string Type,
        string VisualLabel,
        string Image,
        string Video,
        IReadOnlyList<ProjectGalleryItemDto> Gallery,
        string Context,
        string Problem,
        string Solution,
        string Role,
        IReadOnlyList<string> Responsibilities,
        IReadOnlyList<string> Tools,
        IReadOnlyList<string> Results,
        IReadOnlyList<string> LessonsLearned,
        string GithubUrl,
        string LiveDemoUrl,
        IReadOnlyList<ProjectLinkDto> Links,
        bool Featured,
        int DisplayOrder);

    public record ProjectLinkDto(string Label, string Url);

    public record ProjectGalleryItemDto(
        string Type,
        string Url,
        string Alt,
        string Caption);

    public record SkillGroupDto(string Title, string Level, string Usage, string Tools);

    public record TimelineItemDto(
        string Period,
        string Title,
        string Org,
        string Description);
}
