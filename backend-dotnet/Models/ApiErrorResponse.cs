namespace backend_dotnet.Models
{
    public record ApiErrorResponse(string Status, string Message, string? TraceId = null);
}
