# AMbinex — Master Landing Page & Brand Architecture

> **Build your growth.**  
> We architect custom fullstack systems and integrate production-grade AI that give products a decisive market edge—delivering a verified **3-week zero-to-production execution cadence** and a **12% baseline cost reduction**.

---

## Brand Foundation & Rules
- **Brand Name / Casing:** Strictly **`AMbinex`** across all text nodes, headings, metadata, and CLI headers.
- **Brand Statement:** *Build your growth.*
- **Palette (90% Monochrome / 10% Ignition):**
  - **Obsidian-950 (`#090A0C`):** Main Viewport BG
  - **Obsidian-900 (`#121418`):** Elevated Cards & Bento Cells
  - **Bone-050 (`#F4F4F0`):** Primary Headings & Text
  - **Ash-400 (`#8E95A2`):** Secondary & Technical Descriptions
  - **Slate-800 (`#22262E`):** 1px Structural Hairlines
  - **Vermilion-500 (`#FF2E00`):** Primary CTA & Key Metrics Ignition Accent
- **Typography:**
  - `Bodoni Moda` (Italic editorial accents)
  - `Sora` (700 bold mark / 300 light mark / primary UI)
  - `JetBrains Mono` (System telemetry, CLI, and tabular numbers)

---

## Architecture & File Structure

```text
AMbinex identity kit/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD deployment
├── assets/
│   ├── favicon.svg           # High-precision Obsidian/Vermilion favicon
│   ├── logo.svg              # Standalone Apex Monolith vector SVG
│   ├── logo-horizontal.svg   # Primary horizontal vector lockup
│   └── ambinex-logo.png      # 1024x1024 master icon asset
├── app.js                    # Live telemetry, CLI terminal simulator, ROI engine
├── brand_identity.html       # Vector lockup specifier & 2400px canvas rasterizer
├── index.html                # Production landing page entry point
├── styles.css                # Master architectural design system tokens
└── README.md                 # System documentation & deployment guide
```

---

## Local Verification & Preview

To serve and preview the landing page locally:

```bash
# Using Python 3 built-in HTTP server:
python3 -m http.server 8000

# Or using Node npx:
npx serve .
```

Then navigate to `http://localhost:8000` in any modern browser.

---

## Public Deployment to GitHub Pages

This repository is pre-configured with `.github/workflows/deploy.yml` for automated GitHub Pages hosting.

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: AMbinex ultra-cinematic production landing page"
   git branch -M main
   ```
2. Link to your public/private GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-org>/<your-repo>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Navigate to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
   - The workflow will automatically deploy the site on every push to `main`.
