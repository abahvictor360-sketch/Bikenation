# Bikenation

Premium motorcycle storefront — React + TypeScript + Vite, with Framer Motion scroll animations.

Pages: Home (hero carousel + dashboard), Models, Model detail, Services, Experience (test-ride booking), Gear, Order (basket + checkout).

```bash
npm install
npm run dev     # local dev
npm run build   # production build to dist/
```

Product images live in `public/images/`; bike and gear data in `src/data.ts`.
Deployed on Vercel (`vercel.json` rewrites all routes to the SPA).
