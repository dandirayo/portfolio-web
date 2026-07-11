using backend_dotnet.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options)
        {
        }

        public DbSet<PortfolioProfile> PortfolioProfiles => Set<PortfolioProfile>();

        public DbSet<ExpertiseItem> ExpertiseItems => Set<ExpertiseItem>();

        public DbSet<PortfolioProject> PortfolioProjects => Set<PortfolioProject>();

        public DbSet<SkillGroup> SkillGroups => Set<SkillGroup>();

        public DbSet<TimelineItem> TimelineItems => Set<TimelineItem>();

        public DbSet<ContactSubmission> ContactSubmissions => Set<ContactSubmission>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PortfolioProfile>(entity =>
            {
                entity.ToTable("portfolio_profiles");
            });

            modelBuilder.Entity<ExpertiseItem>(entity =>
            {
                entity.ToTable("expertise_items");
                entity.Property(item => item.ToolsJson).HasColumnType("longtext");
            });

            modelBuilder.Entity<PortfolioProject>(entity =>
            {
                entity.ToTable("portfolio_projects");
                entity.HasIndex(project => project.ProjectId).IsUnique();
                entity.HasIndex(project => project.Slug).IsUnique();
                entity.Property(project => project.Summary).HasColumnType("longtext");
                entity.Property(project => project.GalleryJson).HasColumnType("longtext");
                entity.Property(project => project.Context).HasColumnType("longtext");
                entity.Property(project => project.Problem).HasColumnType("longtext");
                entity.Property(project => project.Solution).HasColumnType("longtext");
                entity.Property(project => project.ResponsibilitiesJson).HasColumnType("longtext");
                entity.Property(project => project.ToolsJson).HasColumnType("longtext");
                entity.Property(project => project.ResultsJson).HasColumnType("longtext");
                entity.Property(project => project.LessonsLearnedJson).HasColumnType("longtext");
                entity.Property(project => project.LinksJson).HasColumnType("longtext");
            });

            modelBuilder.Entity<SkillGroup>(entity =>
            {
                entity.ToTable("skill_groups");
            });

            modelBuilder.Entity<TimelineItem>(entity =>
            {
                entity.ToTable("timeline_items");
            });

            modelBuilder.Entity<ContactSubmission>(entity =>
            {
                entity.ToTable("contact_submissions");
                entity.Property(message => message.Message).HasColumnType("longtext");
            });
        }
    }
}
