namespace backend_dotnet.Options
{
    public class AdminOptions
    {
        public const string SectionName = "Admin";

        public bool Enabled { get; set; } = true;

        public string ApiKey { get; set; } = string.Empty;

        public string Username { get; set; } = "admin";

        public string Password { get; set; } = "admin";

        public bool AllowLocalWithoutApiKey { get; set; }
    }
}
