# Portfolio

My developer portfolio: who I am, what I've built, and a case study of the
platform I run for a Portuguese scout group.

**Live:** https://brunmartins.github.io/portfolio

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · wouter

A static single-page app with no backend. It has light and dark themes and
works on mobile.

## Running locally

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type check, then build the static site into dist/
```

## Structure

- `src/content/`: site content (profile, experience, projects), kept as typed data separate from the layout
- `src/pages/`: the home page, case studies and the 404 page
- `src/components/`: header, footer, project cards, theme toggle, diagrams

## CI and deployment

Every push and pull request is type-checked and built by GitHub Actions.
Pushes to `main` are deployed to GitHub Pages.
