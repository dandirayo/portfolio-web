namespace backend_dotnet.Options
{
    public class ContactRateLimitOptions
    {
        public const string SectionName = "ContactRateLimit";

        public int PermitLimit { get; set; } = 5;

        public int WindowMinutes { get; set; } = 10;
    }
}
