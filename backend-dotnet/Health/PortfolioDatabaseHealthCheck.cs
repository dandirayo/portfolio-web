using backend_dotnet.Data;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace backend_dotnet.Health
{
    public class PortfolioDatabaseHealthCheck : IHealthCheck
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public PortfolioDatabaseHealthCheck(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(
            HealthCheckContext context,
            CancellationToken cancellationToken = default)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
                var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);

                return canConnect
                    ? HealthCheckResult.Healthy("Database connection is available.")
                    : HealthCheckResult.Unhealthy("Database connection is unavailable.");
            }
            catch (Exception exception)
            {
                return HealthCheckResult.Unhealthy(
                    "Database connection is unavailable.",
                    exception);
            }
        }
    }
}
