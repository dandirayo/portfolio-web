namespace backend_dotnet.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Date { get; set; } // Misalnya: "Mei 2024"
        public string? MediaType { get; set; } // "image" atau "video"
        public string? MediaUrl { get; set; }  // URL foto/video
        public string? ProjectUrl { get; set; }
    }
}

