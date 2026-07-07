using System.Text.Json;
using backend_dotnet.Data;
using backend_dotnet.Dtos;
using backend_dotnet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
        private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

        private readonly PortfolioDbContext _context;
        private readonly ILogger<PortfolioController> _logger;

        public PortfolioController(
            PortfolioDbContext context,
            ILogger<PortfolioController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PortfolioResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
        public async Task<ActionResult<PortfolioResponseDto>> Get(CancellationToken cancellationToken)
        {
            try
            {
                var profile = await _context.PortfolioProfiles
                    .AsNoTracking()
                    .OrderBy(item => item.Id)
                    .FirstOrDefaultAsync(cancellationToken);

                if (profile is null)
                {
                    return NotFound(new { status = "portfolio_profile_not_found" });
                }

                var expertise = await _context.ExpertiseItems
                    .AsNoTracking()
                    .OrderBy(item => item.SortOrder)
                    .ThenBy(item => item.Id)
                    .ToListAsync(cancellationToken);

                var projects = await _context.PortfolioProjects
                    .AsNoTracking()
                    .OrderBy(item => item.SortOrder)
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

                return Ok(new PortfolioResponseDto(
                    ToDto(profile),
                    expertise.Select(ToDto).ToList(),
                    projects.Select(ToDto).ToList(),
                    skillGroups.Select(ToDto).ToList(),
                    timeline.Select(ToDto).ToList()));
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to load portfolio data from database.");
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    new { status = "database_unavailable" });
            }
        }

        [HttpGet("projects")]
        [ProducesResponseType(typeof(IReadOnlyList<ProjectDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
        public async Task<ActionResult<IReadOnlyList<ProjectDto>>> GetProjects(CancellationToken cancellationToken)
        {
            try
            {
                var projects = await _context.PortfolioProjects
                    .AsNoTracking()
                    .OrderBy(item => item.SortOrder)
                    .ThenBy(item => item.Id)
                    .ToListAsync(cancellationToken);

                return Ok(projects.Select(ToDto).ToList());
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to load portfolio projects from database.");
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    new { status = "database_unavailable" });
            }
        }

        [HttpGet("projects/{projectId}")]
        [ProducesResponseType(typeof(ProjectDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
        public async Task<ActionResult<ProjectDto>> GetProject(
            string projectId,
            CancellationToken cancellationToken)
        {
            try
            {
                var project = await _context.PortfolioProjects
                    .AsNoTracking()
                    .FirstOrDefaultAsync(
                        item => item.ProjectId == projectId,
                        cancellationToken);

                if (project is null)
                {
                    return NotFound(new { status = "project_not_found" });
                }

                return Ok(ToDto(project));
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to load portfolio project {ProjectId}.", projectId);
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    new { status = "database_unavailable" });
            }
        }

        private static ProfileDto ToDto(PortfolioProfile profile)
        {
            return new ProfileDto(
                profile.Name,
                profile.Title,
                profile.Headline,
                profile.Subheadline,
                profile.Location,
                profile.Email,
                profile.Phone,
                profile.Linkedin,
                profile.Github,
                profile.PortfolioNode,
                profile.CvUrl,
                profile.ImageUrl);
        }

        private static ExpertiseDto ToDto(ExpertiseItem item)
        {
            return new ExpertiseDto(
                item.Title,
                item.Eyebrow,
                item.Description,
                ReadStringList(item.ToolsJson));
        }

        private static ProjectDto ToDto(PortfolioProject project)
        {
            return new ProjectDto(
                project.ProjectId,
                project.Title,
                project.Category,
                project.Year,
                project.Type,
                project.VisualLabel,
                project.ImageUrl,
                project.VideoUrl,
                project.Context,
                project.Problem,
                project.Solution,
                project.Role,
                ReadStringList(project.ResponsibilitiesJson),
                ReadStringList(project.ToolsJson),
                ReadLinks(project.LinksJson),
                project.Featured);
        }

        private static SkillGroupDto ToDto(SkillGroup item)
        {
            return new SkillGroupDto(item.Title, item.Score, item.Tools);
        }

        private static TimelineItemDto ToDto(TimelineItem item)
        {
            return new TimelineItemDto(item.Period, item.Title, item.Org, item.Description);
        }

        private static IReadOnlyList<string> ReadStringList(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return [];
            }

            return JsonSerializer.Deserialize<IReadOnlyList<string>>(value, JsonOptions) ?? [];
        }

        private static IReadOnlyList<ProjectLinkDto> ReadLinks(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return [];
            }

            return JsonSerializer.Deserialize<IReadOnlyList<ProjectLinkDto>>(value, JsonOptions) ?? [];
        }
    }
}
