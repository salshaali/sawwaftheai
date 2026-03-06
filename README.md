# SawwafTheAI Website

AI-powered video production platform showcasing UAE positivity.

**Live Site:** https://sawwaftheai.com

## Overview

Sawwaf the AI is an autonomous video production platform that creates and publishes uplifting content about the UAE. This repository contains the marketing website built with Antigravity and hosted on Firebase.

## Tech Stack

- **Builder:** Antigravity (AI-powered site generation)
- **Hosting:** Firebase Hosting
- **CDN:** Firebase + Cloudflare
- **CI/CD:** GitHub Actions
- **Monitoring:** Plausible Analytics (planned)

## Project Structure

```
sawwaftheai/
├── index.html          # Homepage
├── terms.html          # Terms & Conditions
├── privacy.html        # Privacy Policy
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── firebase.json       # Firebase configuration
├── assets/             # Images and videos
│   ├── sawwaf-portrait.webp
│   ├── sawwaf-reference-image.webp
│   ├── sawwaf-smiling-compressed.mp4
│   └── sawwaf-smiling-compressed.webm
└── .github/workflows/  # CI/CD pipelines
```

## Development Workflow

### Option 1: Antigravity (Primary)

1. Open project in Antigravity
2. Make changes via AI prompts
3. Sync to GitHub
4. Deploy via Firebase

### Option 2: Direct Code Edit

1. Clone repository
2. Make changes locally
3. Test with `npx serve .`
4. Push to GitHub
5. Auto-deploys via GitHub Actions

## Deployment

### Staging

Push to `staging` branch:
```bash
git checkout -b staging
git push origin staging
```

Deploys to: https://sawwaftheai-website.web.app

### Production

Push to `main` branch:
```bash
git checkout main
git merge staging
git push origin main
```

Deploys to: https://sawwaftheai.com

## Performance Optimizations

- ✅ Video compression: 24MB → 460KB (98% reduction)
- ✅ WebP images: 95% size reduction vs PNG
- ✅ Lazy loading for below-fold images
- ✅ Critical CSS inlined
- ✅ Resource hints (preconnect, dns-prefetch)
- ✅ Long-term caching for static assets

## Security Headers

Configured in `firebase.json`:
- Strict-Transport-Security (HSTS)
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy

## Asset Optimization

Before uploading new assets:

```bash
# Compress video
ffmpeg -i input.mp4 -vcodec h264 -b:v 800k -vf "scale=-1:720" output.mp4

# Convert to WebM (better compression)
ffmpeg -i input.mp4 -vcodec libvpx-vp9 -b:v 600k output.webm

# Convert image to WebP
cwebp -q 85 input.png -o output.webp
```

## Monitoring

- **Analytics:** Plausible (privacy-friendly)
- **Error Tracking:** Sentry (planned)
- **Uptime:** UptimeRobot (planned)

## Contact

For questions or issues: info@sawwaftheai.com

---

*Built with ❤️ and AI*
