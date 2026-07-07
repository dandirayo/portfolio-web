using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_dotnet.Data;
using backend_dotnet.Models;
using backend_dotnet.Services;

namespace backend_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ContactController> _logger;
        private readonly IContactEmailSender _emailSender;
        private readonly PortfolioDbContext _context;

        public ContactController(
            ILogger<ContactController> logger,
            IContactEmailSender emailSender,
            PortfolioDbContext context)
        {
            _logger = logger;
            _emailSender = emailSender;
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
        public async Task<IActionResult> Post(
            [FromBody] ContactMessage message,
            CancellationToken cancellationToken)
        {
            message.Topic = string.IsNullOrWhiteSpace(message.Topic)
                ? "General Question"
                : message.Topic.Trim();
            message.Name = message.Name.Trim();
            message.Email = message.Email.Trim();
            message.Message = message.Message.Trim();

            if (string.IsNullOrWhiteSpace(message.Name) ||
                string.IsNullOrWhiteSpace(message.Email) ||
                string.IsNullOrWhiteSpace(message.Message))
            {
                return ValidationProblem("Name, email, and message are required.");
            }

            _logger.LogInformation(
                "Contact message received from {Name} <{Email}> with {MessageLength} characters.",
                message.Name,
                message.Email,
                message.Message.Length);

            var submission = new ContactSubmission
            {
                Topic = message.Topic,
                Name = message.Name,
                Email = message.Email,
                Message = message.Message,
                CreatedAtUtc = DateTime.UtcNow,
                SourceIp = HttpContext.Connection.RemoteIpAddress?.ToString() ?? string.Empty,
                UserAgent = Request.Headers.UserAgent.ToString(),
                EmailDeliveryStatus = "pending",
            };

            try
            {
                _context.ContactSubmissions.Add(submission);
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch (Exception exception) when (exception is DbUpdateException or InvalidOperationException)
            {
                _logger.LogError(
                    exception,
                    "Failed to store contact message from {Email}.",
                    message.Email);

                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    new { status = "database_unavailable" });
            }

            var deliveryStatus = "email_failed";

            try
            {
                var delivery = await _emailSender.SendAsync(message, cancellationToken);
                deliveryStatus = delivery.Status;
            }
            catch (Exception exception)
            {
                _logger.LogError(
                    exception,
                    "Failed to deliver contact email from {Email}.",
                    message.Email);
            }

            try
            {
                submission.EmailDeliveryStatus = deliveryStatus;
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch (Exception exception)
            {
                _logger.LogWarning(
                    exception,
                    "Contact message {ContactId} was stored but delivery status could not be updated.",
                    submission.Id);
            }

            return Ok(new
            {
                status = "received",
                stored = true,
                delivery = deliveryStatus,
                contactId = submission.Id,
            });
        }
    }
}
