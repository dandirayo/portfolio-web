using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Models
{
    public class ExpertiseItem
    {
        public int Id { get; set; }

        public int SortOrder { get; set; }

        [Required]
        [StringLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Eyebrow { get; set; } = string.Empty;

        [Required]
        [StringLength(600)]
        public string Description { get; set; } = string.Empty;

        public string ToolsJson { get; set; } = "[]";
    }
}
