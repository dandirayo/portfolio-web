namespace backend_dotnet.Options
{
    public class PortfolioDatabaseOptions
    {
        public const string SectionName = "PortfolioDatabase";

        public bool AutoInitialize { get; set; } = true;

        public string ServerVersion { get; set; } = "10.4.32";

        public string ServerType { get; set; } = "mariadb";
    }
}
