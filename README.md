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

The contact form posts to the backend `/api/contact` endpoint. The backend sends messages through SMTP when these environment variables are configured:

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

If SMTP is not configured or delivery fails, the API returns an error and the frontend shows a direct email fallback.

## Main Content File

Most portfolio content is edited here:

```txt
frontend-react/src/data/portfolioData.js
```

Update this file for profile data, skills, timeline entries, project descriptions, and project links.

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
- The contact form posts to the backend `/api/contact` endpoint.
- Portfolio project cards use local frontend data in `frontend-react/src/data/portfolioData.js`.
