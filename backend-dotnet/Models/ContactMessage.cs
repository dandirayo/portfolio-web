using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Models
{
    public class ContactMessage
    {
        [StringLength(80)]
        public string Topic { get; set; } = "General Question";

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(254)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(2000)]
        public string Message { get; set; } = string.Empty;
    }
}
