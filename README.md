# scloop-docs

Website for [scloop](https://github.com/stanfish06/scloop): landing page plus About, Guides, Examples, and Tutorials pages. Built with TanStack Start, shadcn/ui (Base UI), and Tailwind v4. Deploys to Cloudflare Workers.

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # Biome format + lint
pnpm typecheck    # tsc --noEmit
pnpm build
pnpm deploy       # build + wrangler deploy
```

Pre-commit hooks (lefthook) run Biome on staged files and `tsc`. Install them once with `pnpm exec lefthook install`.

## Where to edit

| What | File |
|---|---|
| Name, tagline, description, install command, quickstart, links, about page copy | `src/lib/site.ts` |
| Header dropdowns, burger sidebar, page sections (`list` / `columns` / `cards`) | `src/lib/nav.ts` |
| Theme colors, header height, page width | `src/styles.css` |
| Header, dropdowns, burger sidebar, footer | `src/components/Header.tsx`, `MegaMenu.tsx`, `AppSidebar.tsx`, `Footer.tsx` |
| Images | `public/images/` |

Each page in `nav.ts` has a route in `src/routes/`; each item is a section on that page, linked as `/<page>#<id>`.

## shadcn components

`src/components/ui/` and `src/hooks/use-mobile.ts` come from the shadcn CLI and are excluded from Biome so they stay diffable against upstream. Add components with:

```bash
pnpm dlx shadcn@latest add <component>
```
