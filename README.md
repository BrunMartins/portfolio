# bfmartins.pt portfolio

Personal portfolio: a small React app (Vite, TypeScript, Tailwind CSS 4,
wouter for routing).

## Run

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in ./dist
```

## Where things live

| What | Where |
| --- | --- |
| Name, links, intro, about, experience | `src/content/profile.ts` |
| Project cards | `src/content/projects.ts` |
| Grupo 260 case study | `src/pages/grupo-260.tsx` |
| Architecture diagram | `src/components/architecture-diagram.tsx` |
| Colours and fonts | `src/index.css` (same palette as the CV) |

A new case study = a page in `src/pages/`, a `<Route>` for it in `src/App.tsx`,
and `caseStudy: "/projects/<slug>"` on its entry in `src/content/projects.ts`.

## Deploy

`npm run build` writes plain HTML/CSS/JS to `dist/`. Copy it to the server.
It's a single-page app, so Nginx must send unknown paths to `index.html`:

```nginx
server {
    server_name bfmartins.pt;
    root /var/www/bfmartins.pt;
    location / { try_files $uri $uri/ /index.html; }
}
```

## Before publishing

Search for `TODO` in `src/`: CV PDF, upstream PR link, GPX demo link,
results numbers and screenshots for the case study.
