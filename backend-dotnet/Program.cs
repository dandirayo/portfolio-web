using backend_dotnet.Options;
using backend_dotnet.Services;
using backend_dotnet.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5050);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<ContactEmailOptions>(
    builder.Configuration.GetSection(ContactEmailOptions.SectionName));
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

var app = builder.Build();

await PortfolioDatabaseInitializer.InitializeAsync(app.Services, app.Logger);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendPolicy");
app.UseAuthorization();
app.MapControllers();
app.Run();
