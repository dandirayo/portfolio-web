using Microsoft.AspNetCore.Mvc;
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

        public ContactController(
            ILogger<ContactController> logger,
            IContactEmailSender emailSender)
        {
            _logger = logger;
            _emailSender = emailSender;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
        public async Task<IActionResult> Post(
            [FromBody] ContactMessage message,
            CancellationToken cancellationToken)
        {
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

            try
            {
                var delivery = await _emailSender.SendAsync(message, cancellationToken);
                if (!delivery.Sent)
                {
                    return StatusCode(
                        StatusCodes.Status503ServiceUnavailable,
                        new { status = delivery.Status });
                }

                return Ok(new { status = "received", delivery = delivery.Status });
            }
            catch (Exception exception)
            {
                _logger.LogError(
                    exception,
                    "Failed to deliver contact email from {Email}.",
                    message.Email);

                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    new { status = "email_failed" });
            }
        }
    }
}
