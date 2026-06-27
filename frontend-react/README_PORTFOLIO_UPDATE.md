# Portfolio Update Notes

This version turns the original starter site into a CV-connected portfolio.

## What changed

- Added new pages: Home, Portfolio, About, Contact.
- Added a portfolio data file: `src/data/portfolioData.js`.
- Added filterable project cards.
- Added CV PDF link in `public/cv-dandi-prayogatama.pdf`.
- Replaced Tailwind-style classes with Bootstrap + custom CSS.
- Added Bootstrap JavaScript for the mobile navbar.
- Improved the contact form error state.
- Added CORS support in the ASP.NET Core backend.

## Main file to edit

Edit this file when you want to change your content:

```txt
src/data/portfolioData.js
```

Add your real Figma, GitHub, YouTube, PDF, or Google Drive links in the `links` array of each project.

## Run

Backend:

```powershell
cd backend-dotnet
dotnet run
```

Frontend:

```powershell
cd frontend-react
npm.cmd install
npm.cmd run dev
```

Open:

```txt
http://localhost:5173
```
