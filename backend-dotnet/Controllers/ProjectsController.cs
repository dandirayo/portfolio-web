using Microsoft.AspNetCore.Mvc;
using backend_dotnet.Models;

namespace backend_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private static readonly List<Project> Projects = new List<Project>
        {
            new Project
            {
                Id = 1,
                Title = "Portfolio Website",
                Description = "Built with React.js & Tailwind",
                Date = "Mei 2024",
                MediaType = "image",
                MediaUrl = "https://via.placeholder.com/600x400",
                ProjectUrl = "https://yourportfolio.com"
            },
            new Project
            {
                Id = 2,
                Title = "Video Editing Showreel",
                Description = "Short video montage for social media",
                Date = "April 2024",
                MediaType = "video",
                MediaUrl = "https://www.youtube.com/embed/yourvideoid",
                ProjectUrl = "https://youtube.com/yourchannel"
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Project>> Get()
        {
            return Ok(Projects);
        }
    }
}
