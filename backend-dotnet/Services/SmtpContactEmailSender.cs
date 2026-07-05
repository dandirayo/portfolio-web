using backend_dotnet.Models;
using backend_dotnet.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace backend_dotnet.Services
{
    public class SmtpContactEmailSender : IContactEmailSender
    {
        private readonly ContactEmailOptions _options;
        private readonly ILogger<SmtpContactEmailSender> _logger;

        public SmtpContactEmailSender(
            IOptions<ContactEmailOptions> options,
            ILogger<SmtpContactEmailSender> logger)
        {
            _options = options.Value;
            _logger = logger;
        }

        public async Task<ContactEmailDeliveryResult> SendAsync(
            ContactMessage message,
            CancellationToken cancellationToken)
        {
            if (!_options.IsConfigured)
            {
                _logger.LogWarning(
                    "Contact email delivery is not configured. Message from {Email} was logged only.",
                    message.Email);

                return new ContactEmailDeliveryResult(false, "logged_only");
            }

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_options.FromName, _options.EffectiveFromEmail));
            email.To.Add(new MailboxAddress(_options.ToName, _options.ToEmail));
            email.ReplyTo.Add(new MailboxAddress(message.Name, message.Email));
            email.Subject = $"Portfolio contact request from {message.Name}";
            email.Body = new TextPart("plain")
            {
                Text =
                    $"Name: {message.Name}\n" +
                    $"Email: {message.Email}\n\n" +
                    "Message:\n" +
                    message.Message
            };

            using var smtp = new SmtpClient();
            var socketOptions = _options.UseStartTls
                ? SecureSocketOptions.StartTls
                : SecureSocketOptions.Auto;

            await smtp.ConnectAsync(
                _options.SmtpHost,
                _options.SmtpPort,
                socketOptions,
                cancellationToken);

            await smtp.AuthenticateAsync(
                _options.Username,
                _options.Password,
                cancellationToken);

            await smtp.SendAsync(email, cancellationToken);
            await smtp.DisconnectAsync(true, cancellationToken);

            return new ContactEmailDeliveryResult(true, "email_sent");
        }
    }
}
