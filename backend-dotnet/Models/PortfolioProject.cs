using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Models
{
    public class PortfolioProject
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string ProjectId { get; set; } = string.Empty;

        public int SortOrder { get; set; }

        [Required]
        [StringLength(180)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(80)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Year { get; set; } = string.Empty;

        [Required]
        [StringLength(120)]
        public string Type { get; set; } = string.Empty;

        [Required]
        [StringLength(160)]
        public string VisualLabel { get; set; } = string.Empty;

        [StringLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        [StringLength(500)]
        public string VideoUrl { get; set; } = string.Empty;

        public string Context { get; set; } = string.Empty;

        public string Problem { get; set; } = string.Empty;

        public string Solution { get; set; } = string.Empty;

        [Required]
        [StringLength(160)]
        public string Role { get; set; } = string.Empty;

        public string ResponsibilitiesJson { get; set; } = "[]";

        public string ToolsJson { get; set; } = "[]";

        public string LinksJson { get; set; } = "[]";

        public bool Featured { get; set; }
    }
}
