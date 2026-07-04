# Sudeep Kapoor — 41+ Years Behind the Lens

Premium editorial website for veteran Indian photographer Sudeep Kapoor
(Studio Chaya Kriti, South Extension Part II, New Delhi — est. 1992).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, legacy stats, journey strip, signature stories, previews |
| `about.html` | Editorial biography + career timeline |
| `journey.html` | Interactive darkroom-to-digital timeline (filter by era) |
| `portfolio.html` | Filterable gallery (category/era) with lightbox |
| `archive.html` | Visual archive browser (decade/medium/category) |
| `services.html` | 12 photography services + process + FAQ |
| `mentorship.html` | 6 mentorship programs + 3-step application form |
| `journal.html` | 6 expandable articles, filterable by category |
| `speaking.html` | Speaking topics & institutional engagements |
| `contact.html` | Smart enquiry form (fields adapt to enquiry type) |

Shared assets: `css/style.css` (design system), `js/main.js` (behaviour),
`js/layout.js` (nav + footer templates).

## Running locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

## Deploying

Any static host works as-is: GitHub Pages, Netlify, Vercel, Cloudflare Pages.

**GitHub Pages:** push this folder to a repo → Settings → Pages →
Source: "Deploy from a branch" → branch `main`, folder `/ (root)`.

## Before launch

- Replace placeholder frames (`.ph` elements) with real photographs and `alt` text.
- Connect the contact and mentorship forms to an email/CRM endpoint
  (they currently validate and confirm locally — see notes in the HTML).
- Confirm mentorship fees/dates wording.

## Content rules

No invented facts: no fabricated testimonials, celebrity names, clients,
awards or prices. All copy is based on verified career information;
placeholders are clearly labelled.
