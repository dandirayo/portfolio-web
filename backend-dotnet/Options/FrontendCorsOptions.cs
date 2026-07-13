namespace backend_dotnet.Options
{
    public class FrontendCorsOptions
    {
        public const string SectionName = "FrontendCors";

        public static readonly string[] DefaultAllowedOrigins =
        [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ];

        public string[] AllowedOrigins { get; set; } = [];
    }
}
