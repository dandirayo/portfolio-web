using backend_dotnet.Models;

namespace backend_dotnet.Services
{
    public interface IContactEmailSender
    {
        Task<ContactEmailDeliveryResult> SendAsync(
            ContactMessage message,
            CancellationToken cancellationToken);
    }

    public record ContactEmailDeliveryResult(bool Sent, string Status);
}
