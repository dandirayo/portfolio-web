using System.Net;
using System.Text.Json;
using System.Text.RegularExpressions;
using backend_dotnet.Data;
using backend_dotnet.Dtos;
using backend_dotnet.Models;
using backend_dotnet.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace backend_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

        private readonly PortfolioDbContext _context;
        private readonly ILogger<AdminController> _logger;
        private readonly AdminOptions _options;

        public AdminController(
            PortfolioDbContext context,
            ILogger<AdminController> logger,
            IOptions<AdminOptions> options)
        {
            _context = context;
            _logger = logger;
            _options = options.Value;
        }

        [HttpGet("snapshot")]
        [ProducesResponseType(typeof(AdminDashboardDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetSnapshot(CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            try
            {
                var profile = await GetProfileAsync(cancellationToken);
                var expertise = await _context.ExpertiseItems
                    .AsNoTracking()
                    .OrderBy(item => item.SortOrder)
                    .ThenBy(item => item.Id)
                    .ToListAsync(cancellationToken);
                var projects = await _context.PortfolioProjects
                    .AsNoTracking()
                    .OrderBy(item => item.DisplayOrder)
                    .ThenBy(item => item.SortOrder)
                    .ThenBy(item => item.Id)
                    .ToListAsync(cancellationToken);
                var skillGroups = await _context.SkillGroups
                    .AsNoTracking()
                    .OrderBy(item => item.SortOrder)
                    .ThenBy(item => item.Id)
                    .ToListAsync(cancellationToken);
                var timeline = await _context.TimelineItems
                    .AsNoTracking()
                    .OrderBy(item => item.SortOrder)
                    .ThenBy(item => item.Id)
                    .ToListAsync(cancellationToken);
                var messages = await _context.ContactSubmissions
                    .AsNoTracking()
                    .OrderByDescending(item => item.CreatedAtUtc)
                    .Take(50)
                    .ToListAsync(cancellationToken);

                return Ok(new AdminDashboardDto
                {
                    Profile = ToAdminDto(profile),
                    Expertise = expertise.Select(ToAdminDto).ToList(),
                    Projects = projects.Select(ToAdminDto).ToList(),
                    SkillGroups = skillGroups.Select(ToAdminDto).ToList(),
                    Timeline = timeline.Select(ToAdminDto).ToList(),
                    ContactMessages = messages.Select(ToAdminDto).ToList(),
                });
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to load admin dashboard data.");
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    new ApiErrorResponse(
                        "database_unavailable",
                        "Admin dashboard data could not be loaded right now."));
            }
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(
            [FromBody] AdminProfileDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            if (string.IsNullOrWhiteSpace(input.Name) ||
                string.IsNullOrWhiteSpace(input.Title) ||
                string.IsNullOrWhiteSpace(input.Headline) ||
                string.IsNullOrWhiteSpace(input.Subheadline))
            {
                return ValidationProblem("Name, title, headline, and subheadline are required.");
            }

            var profile = await _context.PortfolioProfiles
                .OrderBy(item => item.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (profile is null)
            {
                profile = new PortfolioProfile();
                _context.PortfolioProfiles.Add(profile);
            }

            profile.Name = Clean(input.Name);
            profile.Title = Clean(input.Title);
            profile.Headline = Clean(input.Headline);
            profile.Subheadline = Clean(input.Subheadline);
            profile.Location = Clean(input.Location);
            profile.Email = Clean(input.Email);
            profile.Phone = Clean(input.Phone);
            profile.Linkedin = Clean(input.Linkedin);
            profile.Github = Clean(input.Github);
            profile.PortfolioNode = Clean(input.PortfolioNode);
            profile.CvUrl = Clean(input.CvUrl);
            profile.ImageUrl = Clean(input.Image);

            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(profile));
        }

        [HttpPost("projects")]
        public async Task<IActionResult> CreateProject(
            [FromBody] AdminProjectDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var project = new PortfolioProject();

            try
            {
                await ApplyProjectAsync(project, input, cancellationToken);
            }
            catch (InvalidOperationException exception)
            {
                return Conflict(new ApiErrorResponse("project_conflict", exception.Message));
            }

            _context.PortfolioProjects.Add(project);
            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(project));
        }

        [HttpPut("projects/{id:int}")]
        public async Task<IActionResult> UpdateProject(
            int id,
            [FromBody] AdminProjectDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var project = await _context.PortfolioProjects
                .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

            if (project is null)
            {
                return NotFound(new ApiErrorResponse("project_not_found", "Project was not found."));
            }

            try
            {
                await ApplyProjectAsync(project, input, cancellationToken);
            }
            catch (InvalidOperationException exception)
            {
                return Conflict(new ApiErrorResponse("project_conflict", exception.Message));
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(project));
        }

        [HttpDelete("projects/{id:int}")]
        public async Task<IActionResult> DeleteProject(int id, CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var project = await _context.PortfolioProjects
                .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

            if (project is null)
            {
                return NotFound(new ApiErrorResponse("project_not_found", "Project was not found."));
            }

            _context.PortfolioProjects.Remove(project);
            await _context.SaveChangesAsync(cancellationToken);

            return NoContent();
        }

        [HttpPost("expertise")]
        public async Task<IActionResult> CreateExpertise(
            [FromBody] AdminExpertiseDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = new ExpertiseItem();
            ApplyExpertise(item, input);
            _context.ExpertiseItems.Add(item);
            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(item));
        }

        [HttpPut("expertise/{id:int}")]
        public async Task<IActionResult> UpdateExpertise(
            int id,
            [FromBody] AdminExpertiseDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = await _context.ExpertiseItems
                .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

            if (item is null)
            {
                return NotFound(new ApiErrorResponse("expertise_not_found", "Expertise item was not found."));
            }

            ApplyExpertise(item, input);
            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(item));
        }

        [HttpDelete("expertise/{id:int}")]
        public async Task<IActionResult> DeleteExpertise(int id, CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = await _context.ExpertiseItems
                .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

            if (item is null)
            {
                return NotFound(new ApiErrorResponse("expertise_not_found", "Expertise item was not found."));
            }

            _context.ExpertiseItems.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);

            return NoContent();
        }

        [HttpPost("skills")]
        public async Task<IActionResult> CreateSkill(
            [FromBody] AdminSkillGroupDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = new SkillGroup();
            ApplySkill(item, input);
            _context.SkillGroups.Add(item);
            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(item));
        }

        [HttpPut("skills/{id:int}")]
        public async Task<IActionResult> UpdateSkill(
            int id,
            [FromBody] AdminSkillGroupDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = await _context.SkillGroups
                .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

            if (item is null)
            {
                return NotFound(new ApiErrorResponse("skill_not_found", "Skill group was not found."));
            }

            ApplySkill(item, input);
            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(item));
        }

        [HttpDelete("skills/{id:int}")]
        public async Task<IActionResult> DeleteSkill(int id, CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = await _context.SkillGroups
                .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

            if (item is null)
            {
                return NotFound(new ApiErrorResponse("skill_not_found", "Skill group was not found."));
            }

            _context.SkillGroups.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);

            return NoContent();
        }

        [HttpPost("timeline")]
        public async Task<IActionResult> CreateTimelineItem(
            [FromBody] AdminTimelineItemDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = new TimelineItem();
            ApplyTimeline(item, input);
            _context.TimelineItems.Add(item);
            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(item));
        }

        [HttpPut("timeline/{id:int}")]
        public async Task<IActionResult> UpdateTimelineItem(
            int id,
            [FromBody] AdminTimelineItemDto input,
            CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = await _context.TimelineItems
                .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

            if (item is null)
            {
                return NotFound(new ApiErrorResponse("timeline_not_found", "Timeline item was not found."));
            }

            ApplyTimeline(item, input);
            await _context.SaveChangesAsync(cancellationToken);

            return Ok(ToAdminDto(item));
        }

        [HttpDelete("timeline/{id:int}")]
        public async Task<IActionResult> DeleteTimelineItem(int id, CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = await _context.TimelineItems
                .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

            if (item is null)
            {
                return NotFound(new ApiErrorResponse("timeline_not_found", "Timeline item was not found."));
            }

            _context.TimelineItems.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);

            return NoContent();
        }

        [HttpGet("contacts")]
        public async Task<IActionResult> GetContacts(CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var messages = await _context.ContactSubmissions
                .AsNoTracking()
                .OrderByDescending(item => item.CreatedAtUtc)
                .Take(100)
                .ToListAsync(cancellationToken);

            return Ok(messages.Select(ToAdminDto).ToList());
        }

        [HttpDelete("contacts/{id:int}")]
        public async Task<IActionResult> DeleteContact(int id, CancellationToken cancellationToken)
        {
            if (RequireAdmin() is { } unauthorized)
            {
                return unauthorized;
            }

            var item = await _context.ContactSubmissions
                .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

            if (item is null)
            {
                return NotFound(new ApiErrorResponse("message_not_found", "Contact message was not found."));
            }

            _context.ContactSubmissions.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);

            return NoContent();
        }

        private IActionResult? RequireAdmin()
        {
            if (!_options.Enabled)
            {
                return NotFound(new ApiErrorResponse("admin_disabled", "Admin access is disabled."));
            }

            if (!string.IsNullOrWhiteSpace(_options.ApiKey))
            {
                return Request.Headers.TryGetValue("X-Admin-Key", out var suppliedKey) &&
                    string.Equals(suppliedKey.ToString(), _options.ApiKey, StringComparison.Ordinal)
                        ? null
                        : Unauthorized(new ApiErrorResponse(
                            "admin_unauthorized",
                            "Admin access requires a valid X-Admin-Key header."));
            }

            return _options.AllowLocalWithoutApiKey && IsLocalRequest()
                ? null
                : Unauthorized(new ApiErrorResponse(
                    "admin_unauthorized",
                    "Admin access requires an API key outside localhost."));
        }

        private bool IsLocalRequest()
        {
            var remoteIp = HttpContext.Connection.RemoteIpAddress;

            if (remoteIp is null)
            {
                return false;
            }

            if (remoteIp.IsIPv4MappedToIPv6)
            {
                remoteIp = remoteIp.MapToIPv4();
            }

            return IPAddress.IsLoopback(remoteIp);
        }

        private async Task<PortfolioProfile> GetProfileAsync(CancellationToken cancellationToken)
        {
            var profile = await _context.PortfolioProfiles
                .AsNoTracking()
                .OrderBy(item => item.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (profile is null)
            {
                throw new InvalidOperationException("Portfolio profile has not been initialized.");
            }

            return profile;
        }

        private async Task ApplyProjectAsync(
            PortfolioProject project,
            AdminProjectDto input,
            CancellationToken cancellationToken)
        {
            var title = CleanOrDefault(input.Title, "Untitled Project");
            var slug = NormalizeSlug(input.Slug, title);
            var projectId = NormalizeSlug(input.ProjectId, title);

            if (await _context.PortfolioProjects.AnyAsync(
                item => item.Id != project.Id && (item.Slug == slug || item.ProjectId == projectId),
                cancellationToken))
            {
                throw new InvalidOperationException("Project slug or project id already exists.");
            }

            project.ProjectId = projectId;
            project.Slug = slug;
            project.SortOrder = input.SortOrder;
            project.DisplayOrder = input.DisplayOrder <= 0 ? input.SortOrder : input.DisplayOrder;
            project.Title = title;
            project.Summary = CleanOrDefault(input.Summary, "Draft project summary.");
            project.Category = CleanOrDefault(input.Category, "UI/UX Design");
            project.Year = CleanOrDefault(input.Year, "Draft");
            project.Type = CleanOrDefault(input.Type, "Case Study");
            project.VisualLabel = CleanOrDefault(input.VisualLabel, "Project visual");
            project.ImageUrl = Clean(input.Image);
            project.VideoUrl = Clean(input.Video);
            project.GalleryJson = Serialize(input.Gallery);
            project.Context = Clean(input.Context);
            project.Problem = Clean(input.Problem);
            project.Solution = Clean(input.Solution);
            project.Role = CleanOrDefault(input.Role, "Contributor");
            project.ResponsibilitiesJson = Serialize(input.Responsibilities);
            project.ToolsJson = Serialize(input.Tools);
            project.ResultsJson = Serialize(input.Results);
            project.LessonsLearnedJson = Serialize(input.LessonsLearned);
            project.GithubUrl = Clean(input.GithubUrl);
            project.LiveDemoUrl = Clean(input.LiveDemoUrl);
            project.LinksJson = Serialize(input.Links);
            project.Featured = input.Featured;
        }

        private static void ApplyExpertise(ExpertiseItem item, AdminExpertiseDto input)
        {
            item.SortOrder = input.SortOrder;
            item.Title = CleanOrDefault(input.Title, "Untitled Expertise");
            item.Eyebrow = CleanOrDefault(input.Eyebrow, "Focus");
            item.Description = CleanOrDefault(input.Description, "Describe this expertise area.");
            item.ToolsJson = Serialize(input.Tools);
        }

        private static void ApplySkill(SkillGroup item, AdminSkillGroupDto input)
        {
            item.SortOrder = input.SortOrder;
            item.Title = CleanOrDefault(input.Title, "Untitled Skill");
            item.Score = input.Score;
            item.Level = CleanOrDefault(input.Level, "Experience");
            item.Usage = CleanOrDefault(input.Usage, "Describe how this skill is used.");
            item.Tools = CleanOrDefault(input.Tools, "Tools");
        }

        private static void ApplyTimeline(TimelineItem item, AdminTimelineItemDto input)
        {
            item.SortOrder = input.SortOrder;
            item.Period = CleanOrDefault(input.Period, "Period");
            item.Title = CleanOrDefault(input.Title, "Untitled Role");
            item.Org = CleanOrDefault(input.Org, "Organization");
            item.Description = CleanOrDefault(input.Description, "Describe this experience.");
        }

        private static AdminProfileDto ToAdminDto(PortfolioProfile profile)
        {
            return new AdminProfileDto
            {
                Id = profile.Id,
                Name = profile.Name,
                Title = profile.Title,
                Headline = profile.Headline,
                Subheadline = profile.Subheadline,
                Location = profile.Location,
                Email = profile.Email,
                Phone = profile.Phone,
                Linkedin = profile.Linkedin,
                Github = profile.Github,
                PortfolioNode = profile.PortfolioNode,
                CvUrl = profile.CvUrl,
                Image = profile.ImageUrl,
            };
        }

        private static AdminExpertiseDto ToAdminDto(ExpertiseItem item)
        {
            return new AdminExpertiseDto
            {
                Id = item.Id,
                SortOrder = item.SortOrder,
                Title = item.Title,
                Eyebrow = item.Eyebrow,
                Description = item.Description,
                Tools = ReadList(item.ToolsJson),
            };
        }

        private static AdminProjectDto ToAdminDto(PortfolioProject project)
        {
            return new AdminProjectDto
            {
                Id = project.Id,
                ProjectId = project.ProjectId,
                Slug = project.Slug,
                SortOrder = project.SortOrder,
                DisplayOrder = project.DisplayOrder,
                Title = project.Title,
                Summary = project.Summary,
                Category = project.Category,
                Year = project.Year,
                Type = project.Type,
                VisualLabel = project.VisualLabel,
                Image = project.ImageUrl,
                Video = project.VideoUrl,
                Gallery = ReadGallery(project.GalleryJson),
                Context = project.Context,
                Problem = project.Problem,
                Solution = project.Solution,
                Role = project.Role,
                Responsibilities = ReadList(project.ResponsibilitiesJson),
                Tools = ReadList(project.ToolsJson),
                Results = ReadList(project.ResultsJson),
                LessonsLearned = ReadList(project.LessonsLearnedJson),
                GithubUrl = project.GithubUrl,
                LiveDemoUrl = project.LiveDemoUrl,
                Links = ReadLinks(project.LinksJson),
                Featured = project.Featured,
            };
        }

        private static AdminSkillGroupDto ToAdminDto(SkillGroup item)
        {
            return new AdminSkillGroupDto
            {
                Id = item.Id,
                SortOrder = item.SortOrder,
                Title = item.Title,
                Score = item.Score,
                Level = item.Level,
                Usage = item.Usage,
                Tools = item.Tools,
            };
        }

        private static AdminTimelineItemDto ToAdminDto(TimelineItem item)
        {
            return new AdminTimelineItemDto
            {
                Id = item.Id,
                SortOrder = item.SortOrder,
                Period = item.Period,
                Title = item.Title,
                Org = item.Org,
                Description = item.Description,
            };
        }

        private static AdminContactSubmissionDto ToAdminDto(ContactSubmission item)
        {
            return new AdminContactSubmissionDto
            {
                Id = item.Id,
                Topic = item.Topic,
                Name = item.Name,
                Email = item.Email,
                Message = item.Message,
                CreatedAtUtc = item.CreatedAtUtc,
                SourceIp = item.SourceIp,
                UserAgent = item.UserAgent,
                EmailDeliveryStatus = item.EmailDeliveryStatus,
            };
        }

        private static List<string> ReadList(string value)
        {
            return string.IsNullOrWhiteSpace(value)
                ? []
                : JsonSerializer.Deserialize<List<string>>(value, JsonOptions) ?? [];
        }

        private static List<ProjectLinkDto> ReadLinks(string value)
        {
            return string.IsNullOrWhiteSpace(value)
                ? []
                : JsonSerializer.Deserialize<List<ProjectLinkDto>>(value, JsonOptions) ?? [];
        }

        private static List<ProjectGalleryItemDto> ReadGallery(string value)
        {
            return string.IsNullOrWhiteSpace(value)
                ? []
                : JsonSerializer.Deserialize<List<ProjectGalleryItemDto>>(value, JsonOptions) ?? [];
        }

        private static string Serialize<T>(IEnumerable<T>? value)
        {
            return JsonSerializer.Serialize(value ?? [], JsonOptions);
        }

        private static string Clean(string? value)
        {
            return value?.Trim() ?? string.Empty;
        }

        private static string CleanOrDefault(string? value, string fallback)
        {
            var clean = Clean(value);
            return string.IsNullOrWhiteSpace(clean) ? fallback : clean;
        }

        private static string NormalizeSlug(string? value, string fallback)
        {
            var source = CleanOrDefault(value, fallback).ToLowerInvariant();
            var slug = Regex.Replace(source, "[^a-z0-9]+", "-").Trim('-');

            return string.IsNullOrWhiteSpace(slug) ? "untitled-project" : slug;
        }
    }
}
