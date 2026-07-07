using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Models
{
    public class TimelineItem
    {
        public int Id { get; set; }

        public int SortOrder { get; set; }

        [Required]
        [StringLength(80)]
        public string Period { get; set; } = string.Empty;

        [Required]
        [StringLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(150)]
        public string Org { get; set; } = string.Empty;

        [Required]
        [StringLength(600)]
        public string Description { get; set; } = string.Empty;
    }
}
