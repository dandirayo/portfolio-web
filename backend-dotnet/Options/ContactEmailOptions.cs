namespace backend_dotnet.Options
{
    public class ContactEmailOptions
    {
        public const string SectionName = "ContactEmail";

        public string SmtpHost { get; set; } = string.Empty;
        public int SmtpPort { get; set; } = 587;
        public bool UseStartTls { get; set; } = true;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FromEmail { get; set; } = string.Empty;
        public string FromName { get; set; } = "Portfolio Contact";
        public string ToEmail { get; set; } = string.Empty;
        public string ToName { get; set; } = "Dandi Prayogatama";

        public string EffectiveFromEmail =>
            string.IsNullOrWhiteSpace(FromEmail) ? Username : FromEmail;

        public bool IsConfigured =>
            !string.IsNullOrWhiteSpace(SmtpHost) &&
            SmtpPort > 0 &&
            !string.IsNullOrWhiteSpace(Username) &&
            !string.IsNullOrWhiteSpace(Password) &&
            !string.IsNullOrWhiteSpace(EffectiveFromEmail) &&
            !string.IsNullOrWhiteSpace(ToEmail);
    }
}
