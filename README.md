# Helios

Landing page for Helios — a secure enterprise knowledge retrieval product.

## Stack

- [Next.js 15](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS v4
- Figtree (Google Fonts)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/
    globals.css       # Global styles and keyframe animations
    layout.tsx        # Root layout, font config
    page.tsx          # Entry point
  components/
    Navbar.tsx        # Top navigation
    Hero.tsx          # Two-column hero section
    ProductDemo.tsx   # Animated product UI demo
public/
  assets/             # Brand SVGs (logo variants)
```

## Deploy

Hosted on Vercel. Push to `main` to deploy.
