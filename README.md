# Portfolio Web

Personal portfolio project with a React/Vite frontend and an ASP.NET Core Web API backend.

## Structure

```txt
backend-dotnet/   ASP.NET Core 8 Web API
frontend-react/   React 19 + Vite portfolio frontend
```

## Requirements

- Node.js and npm
- .NET 8 SDK
- XAMPP with MySQL/MariaDB and phpMyAdmin

## First Setup

Install frontend dependencies:

```powershell
cd frontend-react
npm.cmd install
```

Create a local frontend environment file:

```powershell
Copy-Item .env.example .env
```

The default API URL is:

```txt
VITE_API_BASE_URL=http://localhost:5050
```

## Database Setup With XAMPP/phpMyAdmin

Start Apache and MySQL from XAMPP, then open phpMyAdmin:

```txt
http://localhost/phpmyadmin
```

Import this SQL file:

```txt
backend-dotnet/database/portfolio_web.sql
```

The default backend connection string matches a fresh XAMPP install:

```txt
Server=localhost;Port=3306;Database=portfolio_web;User=root;Password=;Connection Timeout=3;
```

If your MySQL user/password is different, set this before running the backend:

```powershell
$env:ConnectionStrings__PortfolioDatabase = "Server=localhost;Port=3306;Database=portfolio_web;User=root;Password=your-password;Connection Timeout=3;"
```

The backend also tries to create and seed the database automatically when MySQL is running. Manual phpMyAdmin import is still useful because you can inspect and edit the data directly.

## Run Locally

Start the backend:

```powershell
cd backend-dotnet
dotnet run
```

Start the frontend in another terminal:

```powershell
cd frontend-react
npm.cmd run dev
```

Open:

```txt
http://localhost:5173
```

Swagger is available in development mode at:

```txt
http://localhost:5050/swagger
```

## Contact Form Email Delivery

The contact form posts to the backend `/api/contact` endpoint. Messages are saved to the `contact_submissions` table first. The backend also forwards messages through SMTP when these environment variables are configured:

```powershell
$env:ContactEmail__SmtpHost = "smtp.gmail.com"
$env:ContactEmail__SmtpPort = "587"
$env:ContactEmail__UseStartTls = "true"
$env:ContactEmail__Username = "your-email@gmail.com"
$env:ContactEmail__Password = "your-app-password"
$env:ContactEmail__FromEmail = "your-email@gmail.com"
$env:ContactEmail__ToEmail = "your-email@gmail.com"
```

For Gmail, use an App Password instead of your normal account password. For a custom domain email, use the SMTP settings from the email provider.

If SMTP is not configured or delivery fails, the message still stays in phpMyAdmin as long as MySQL is running.

## Portfolio Data

The frontend loads portfolio data from:

```txt
GET http://localhost:5050/api/portfolio
```

Edit these tables in phpMyAdmin:

```txt
portfolio_profiles
expertise_items
portfolio_projects
skill_groups
timeline_items
contact_submissions
```

`frontend-react/src/data/portfolioData.js` is now the fallback if the backend or MySQL is offline.

Project rows are structured as case studies. Important fields in `portfolio_projects`:

```txt
Slug              URL path for /portfolio/<slug>
Summary           Short HR-friendly project summary
Context           Background of the work
Problem           Problem being solved
Solution          What was designed, built, or improved
Role              Your role in the project
ResponsibilitiesJson  JSON array of responsibilities
ToolsJson             JSON array of tools
GalleryJson           JSON array of media items
ResultsJson           JSON array of factual outcomes
LessonsLearnedJson    JSON array of reflections
GithubUrl         Optional repository URL
LiveDemoUrl       Optional live/demo URL
Featured          1 for homepage highlight, 0 otherwise
DisplayOrder      Sort order in portfolio lists
```

Project detail pages are available at:

```txt
http://localhost:5173/portfolio/<slug>
```

Do not add placeholder URLs for public visitors. Leave `GithubUrl`, `LiveDemoUrl`, or extra link URLs empty until real evidence is available.

## Media Folder

Use public media paths so database values and browser URLs stay in sync:

```txt
frontend-react/public/media/profile/profile-photo.jpg
frontend-react/public/media/projects/<project-id>/cover.webp
frontend-react/public/media/projects/<project-id>/demo.mp4
frontend-react/public/media/projects/<project-id>/case-study.pdf
frontend-react/public/media/placeholders/*.webp
```

Example database values in `portfolio_projects`:

```txt
ImageUrl = /media/projects/peduli-donasi/cover.webp
VideoUrl = /media/projects/peduli-donasi/demo.mp4
```

## Useful Checks

Frontend lint:

```powershell
cd frontend-react
npm.cmd run lint
```

Frontend production build:

```powershell
cd frontend-react
npm.cmd run build
```

Backend build:

```powershell
cd backend-dotnet
dotnet build
```

## Notes

- Build artifacts such as `bin/`, `obj/`, `dist/`, and `node_modules/` are ignored by git.
- The contact form saves messages to MySQL and optionally forwards them through SMTP.
- Portfolio project cards use backend data first, then local fallback data if the API is offline.
