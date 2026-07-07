using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Models
{
    public class PortfolioProfile
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(180)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(300)]
        public string Headline { get; set; } = string.Empty;

        [Required]
        [StringLength(600)]
        public string Subheadline { get; set; } = string.Empty;

        [StringLength(120)]
        public string Location { get; set; } = string.Empty;

        [StringLength(254)]
        public string Email { get; set; } = string.Empty;

        [StringLength(50)]
        public string Phone { get; set; } = string.Empty;

        [StringLength(300)]
        public string Linkedin { get; set; } = string.Empty;

        [StringLength(300)]
        public string Github { get; set; } = string.Empty;

        [StringLength(120)]
        public string PortfolioNode { get; set; } = string.Empty;

        [StringLength(300)]
        public string CvUrl { get; set; } = string.Empty;

        [StringLength(500)]
        public string ImageUrl { get; set; } = string.Empty;
    }
}
