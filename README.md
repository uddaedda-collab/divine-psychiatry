# Divine Psychiatry Clinic — Dr. Sandeep Sharma

A premium liquid-glass psychiatry & longevity website. Built with Next.js (App Router, TS), Tailwind CSS, Framer Motion and Lenis smooth scroll. Static-exportable, ready for GitHub Pages or Vercel.

## Stack

- Next.js 14 (App Router, static export)
- React 18, TypeScript
- Tailwind CSS, custom liquid-glass system
- Framer Motion (cinematic reveal & parallax)
- Lenis (smooth scroll, RAF-driven)

## Run locally

```bash
npm install
npm run dev
# build static site
npm run build
# output is in /out
```

## Add the doctor's photos

Drop the 5 attached portraits into `public/doctor/` named:

```
public/doctor/01.jpg
public/doctor/02.jpg   ← used in About section
public/doctor/03.jpg
public/doctor/04.jpg
public/doctor/05.jpg
```

A `README.md` in that folder lists which file goes where.

## Update clinic details

Edit `lib/site.ts`:

```ts
export const site = {
  phoneDisplay: "+91 …",
  phone: "tel:+91…",
  whatsapp: "https://wa.me/91…",
  email: "mailto:care@divinepsychiatry.in",
  // …
};
```

The Google Map embed uses a search query — if you have a precise place ID, replace `mapsQuery` with the share link.

## Deploy to GitHub Pages

1. Create a new GitHub repo, e.g. `divine-psychiatry`.
2. Push this folder to that repo.
3. In repo Settings → Pages → Source: **GitHub Actions**.
4. The workflow at `.github/workflows/deploy.yml` builds and publishes automatically on every push to `main`.

The workflow auto-detects the base path so the site works at `https://<user>.github.io/<repo>/`.

## Deploy to Vercel

```bash
npm i -g vercel
vercel
vercel --prod
```

`vercel.json` is preconfigured.

## Performance notes

- Lenis paused under reduced-motion preference.
- All animations are GPU-friendly (`transform`, `opacity`, `filter`).
- Particle canvas pauses when tab is hidden.
- Images are referenced via plain `<img>` with `loading="lazy"` and `decoding="async"` (Next image optimization is disabled because the site is statically exported).
- Dark theme via CSS variables, no FOUC.

## Accessibility

- Semantic landmarks (`header`, `main`, `section`, `footer`).
- All decorative SVG marked `aria-hidden`.
- Focus visible on form fields.
- `prefers-reduced-motion` respected.
- High contrast text on dark glass.

## License

Proprietary — all rights reserved by Divine Psychiatry Clinic.
