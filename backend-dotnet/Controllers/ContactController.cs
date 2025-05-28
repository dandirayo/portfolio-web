using Microsoft.AspNetCore.Mvc;
using backend_dotnet.Models;

namespace backend_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post(ContactMessage message)
        {
            // Untuk sekarang, kita hanya log dan return OK
            Console.WriteLine($"Pesan dari {message.Name} - {message.Email}: {message.Message}");
            return Ok(new { status = "received" });
        }
    }
}
