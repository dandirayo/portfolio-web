using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Models
{
    public class ContactSubmission
    {
        public int Id { get; set; }

        [Required]
        [StringLength(80)]
        public string Topic { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(254)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        public DateTime CreatedAtUtc { get; set; }

        [StringLength(80)]
        public string SourceIp { get; set; } = string.Empty;

        [StringLength(500)]
        public string UserAgent { get; set; } = string.Empty;

        [StringLength(80)]
        public string EmailDeliveryStatus { get; set; } = string.Empty;
    }
}
