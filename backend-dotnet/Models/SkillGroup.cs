using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Models
{
    public class SkillGroup
    {
        public int Id { get; set; }

        public int SortOrder { get; set; }

        [Required]
        [StringLength(180)]
        public string Title { get; set; } = string.Empty;

        public int Score { get; set; }

        [Required]
        [StringLength(120)]
        public string Level { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Usage { get; set; } = string.Empty;

        [Required]
        [StringLength(300)]
        public string Tools { get; set; } = string.Empty;
    }
}
