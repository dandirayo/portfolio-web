using System.Diagnostics;
using System.Threading.RateLimiting;
using backend_dotnet.Data;
using backend_dotnet.Health;
using backend_dotnet.Models;
using backend_dotnet.Options;
using backend_dotnet.Services;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5050);
});

var frontendCorsOptions = builder.Configuration
    .GetSection(FrontendCorsOptions.SectionName)
    .Get<FrontendCorsOptions>() ?? new FrontendCorsOptions();
var allowedFrontendOrigins = frontendCorsOptions.AllowedOrigins.Length > 0
    ? frontendCorsOptions.AllowedOrigins
    : FrontendCorsOptions.DefaultAllowedOrigins;
var contactRateLimitOptions = builder.Configuration
    .GetSection(ContactRateLimitOptions.SectionName)
    .Get<ContactRateLimitOptions>() ?? new ContactRateLimitOptions();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins(allowedFrontendOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();
builder.Services.Configure<ContactEmailOptions>(
    builder.Configuration.GetSection(ContactEmailOptions.SectionName));
builder.Services.Configure<ContactRateLimitOptions>(
    builder.Configuration.GetSection(ContactRateLimitOptions.SectionName));
builder.Services.Configure<FrontendCorsOptions>(
    builder.Configuration.GetSection(FrontendCorsOptions.SectionName));
builder.Services.Configure<PortfolioDatabaseOptions>(
    builder.Configuration.GetSection(PortfolioDatabaseOptions.SectionName));
builder.Services.AddDbContext<PortfolioDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("PortfolioDatabase");
    var databaseOptions = builder.Configuration
        .GetSection(PortfolioDatabaseOptions.SectionName)
        .Get<PortfolioDatabaseOptions>() ?? new PortfolioDatabaseOptions();
    var serverVersion = ServerVersion.Parse(
        $"{databaseOptions.ServerVersion}-{databaseOptions.ServerType}");

    options.UseMySql(connectionString, serverVersion);
});
builder.Services.AddTransient<IContactEmailSender, SmtpContactEmailSender>();
builder.Services.AddHealthChecks()
    .AddCheck<PortfolioDatabaseHealthCheck>("portfolio_database");
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = async (context, cancellationToken) =>
    {
        var traceId = Activity.Current?.Id ?? context.HttpContext.TraceIdentifier;

        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        await context.HttpContext.Response.WriteAsJsonAsync(
            new ApiErrorResponse(
                "rate_limited",
                "Too many contact requests. Please try again later.",
                traceId),
            cancellationToken);
    };

    options.AddPolicy("contact-form", httpContext =>
    {
        var partitionKey = httpContext.Connection.RemoteIpAddress?.ToString() ?? "anonymous";

        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = Math.Max(1, contactRateLimitOptions.PermitLimit),
                Window = TimeSpan.FromMinutes(Math.Max(1, contactRateLimitOptions.WindowMinutes)),
                QueueLimit = 0,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                AutoReplenishment = true,
            });
    });
});

var app = builder.Build();

await PortfolioDatabaseInitializer.InitializeAsync(app.Services, app.Logger);

app.UseExceptionHandler(exceptionApp =>
{
    exceptionApp.Run(async context =>
    {
        var traceId = Activity.Current?.Id ?? context.TraceIdentifier;

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(
            new ApiErrorResponse(
                "server_error",
                "Unexpected server error.",
                traceId));
    });
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendPolicy");
app.UseRateLimiter();
app.UseAuthorization();
app.MapHealthChecks("/health");
app.MapControllers();
app.Run();
