# [stylix.xyz](https://stylix.xyz)

A light weight, content-driven blog using markdown built with Astro

## Tech stack

- Framework: `vite` + `Astro`
- Styling: `tailwindcss` (via Vite plugin)
- Markdown content: `Markdoc` (via Astro integration)
- Language: `Typescript`

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Deployment

Build with `pnpm build` and serve the output from the `dist` with static-file hosting.
