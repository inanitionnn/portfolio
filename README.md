# portfolio — tarasiuk.site

Personal portfolio website for [Oleksandr Tarasiuk](https://tarasiuk.site/), a backend engineer specialising in distributed systems, event-driven architectures, and FinTech infrastructure.

Built with **Astro 6** and deployed as a static site served by nginx inside Docker.

---

## Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | [Astro 6](https://astro.build) (static output) |
| Language | TypeScript (strict) |
| Fonts | Inter · JetBrains Mono via Fontsource |
| SEO | Sitemap (`@astrojs/sitemap`), Open Graph, Twitter Card, JSON-LD `Person` schema |
| Animations | `IntersectionObserver`-based fade-in scroll reveal |
| Navigation | Astro View Transitions + sticky navbar with active-section tracking |
| Container | Docker (Node build stage → nginx Alpine) |
| CI/CD | GitHub Actions → image published to GHCR |

---

## Project Structure

```text
/
├── public/                  # Static assets (favicon, CV PDF, OG image, project images)
├── src/
│   ├── config/
│   │   └── site.ts          # All content: bio, experience, projects, skills, etc.
│   ├── components/
│   │   ├── Navbar.astro
│   │   └── sections/        # One .astro file per page section
│   ├── layouts/
│   │   └── BaseLayout.astro # Document shell, SEO, schema.org
│   ├── pages/
│   │   └── index.astro      # Single-page entry point
│   ├── scripts/
│   │   └── scroll-observer.ts
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── Dockerfile
├── nginx.conf
└── tsconfig.json
```

---

## Content

All copy and structured data live in a single file: `src/config/site.ts`.

To update any section of the site, edit the corresponding config object:

| Config export | Site section |
| :------------ | :----------- |
| `siteConfig` | Meta, name, bio, location |
| `contactConfig` | Email, phone, GitHub, LinkedIn, Telegram, CV path |
| `experienceConfig` | Work history |
| `educationConfig` | Education |
| `projectsConfig` | Featured projects |
| `skillsConfig` | Skill tiers (Core / Proficient / Familiar / Learning) |
| `languagesConfig` | Spoken languages |
| `hobbiesConfig` | Hobbies |

---

## Commands

All commands are run from the project root:

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Astro CLI help |

---

## Docker

Build and run locally:

```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio
```

The container serves the pre-built static files via nginx on port 80.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the Docker image and publishes it to [GitHub Container Registry](https://ghcr.io) with `:latest` and `:<sha>` tags.

> **Note:** Before deploying, make sure `site` in `astro.config.mjs` and `siteUrl` in `src/config/site.ts` both point to the same production URL so the sitemap and canonical links are correct.

---

## License

MIT
