# RK Frontend

React + TypeScript + Vite layihəsi.

## Development

```bash
npm install
npm run dev
```

## Styles

Bu layihədə ayrıca `sass --watch` lazım deyil.

- `src/main.tsx` birbaşa `bootstrap/dist/css/bootstrap-grid.min.css` və `src/styles/main.scss` import edir.
- Vite `npm run dev` zamanı SCSS-i özü compile edir.
- Sadəcə `.scss` fayllarını edit et, browser avtomatik yenilənəcək.

## Build

```bash
npm run build
```
