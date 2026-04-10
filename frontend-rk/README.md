# RK Frontend

React + TypeScript + Vite layihəsi.

## Development

```bash
npm install
npm run dev
```

## SCSS

Bu layihədə ayrıca `sass --watch` lazım deyil.

- `src/main.tsx` və `src/about-main.tsx` birbaşa `src/styles/style.scss` import edir.
- Vite `npm run dev` zamanı SCSS-i özü compile edir.
- Sadəcə `.scss` fayllarını edit et, browser avtomatik yenilənəcək.

## Build

```bash
npm run build
```
