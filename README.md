# SveaHub

A polished static web app for Swedish language practice and citizenship prep.

## Deploy instantly

### Easiest no-account option
- Upload the project folder to Netlify Drop or any static host.
- The app works as-is with no build step.

### Vercel
1. Import this folder into Vercel.
2. Vercel will serve the static site automatically.
3. The included [vercel.json](vercel.json) ensures the SPA fallback works.

## Local preview
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Verification
```bash
node scripts/verify-static-app.mjs
```
