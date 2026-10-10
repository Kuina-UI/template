<picture>
  <source media="(prefers-color-scheme: dark)" srcset="src/images/kuina-logo-dark.svg" />
  <img src="src/images/kuina-logo-light.svg" alt="Kuina UI logo" height="64" />
</picture>

# Kuina UI — HTML

Kuina UI pages built with HTML and Tailwind CSS v4. This repo is the visual reference: the Vue and React repos split these pages into components.

Pages are assembled by [Eleventy](https://www.11ty.dev/) with [Nunjucks](https://mozilla.github.io/nunjucks/): shared markup (document shell, sidebar) lives in one place, and the build outputs plain, complete HTML files.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:8080/overview.html (or any other page). The browser reloads on every change.

## Structure

```
src/
├── pages/            one built page = one file, no subfolders
├── layouts/          page skeletons a page wraps itself in
│   ├── base.html         document shell: <head>, stylesheet, icons script
│   └── dashboard.html    base + sidebar + <main>
├── partials/         shared fragments pulled in with {% include %}
│   └── sidebar.html
├── styles/           design system, independent of any page
│   ├── main.css          Tailwind entry point (@import statements only)
│   ├── theme.css         @theme tokens
│   ├── variants/         one @custom-variant per file: one per theme (light, dark)
│   └── utilities/        one @utility per file
├── images/
└── favicon/          browser tab and home screen icons, linked in base.html
dist/                 built site (pages, css/, js/, images/): generated, never edit
eleventy.config.js    Eleventy settings
.husky/               Git hooks: lint-staged before each commit, commitlint on its message
.gitattributes        forces LF line endings, as Prettier expects
.github/FUNDING.yml   funding platforms behind GitHub's "Sponsor" button
```

## How a page is built

A page only holds its own content. The front matter at the top picks the layout that wraps it:

```html
---
layout: dashboard.html
---

<h1>Overview</h1>
```

`dashboard.html` places that content inside `<main>`, next to the sidebar, then hands everything to `base.html` for the `<head>` and scripts. `src/pages/overview.html` comes out as `dist/overview.html`, flat, next to `css/kuina.css`, `js/lucide.min.js`, `images/` and `favicon/`. Each built page is then formatted with Prettier, using the same `.prettierrc` as the sources.

## Themes

`data-theme` on `<html>` (in `base.html`) picks the theme: `light` or `dark`. Every color class comes as a pair, one per theme:

```html
<body class="dark:bg-stone-800 dark:text-white light:bg-stone-100 light:text-stone-950"></body>
```

A color class without a theme variant would show in every theme. Brand colors are the exception: they are `@theme` tokens in `theme.css` declared with `light-dark()` (`--color-primary: light-dark(#1f6b59, #48b89a)`), which follows the `color-scheme` set on `<html>`, so their class needs no variant: `ring-primary`. Images that change with the theme come as one `<img>` per theme, hidden outside it: `class="hidden light:block"`.

To preview a page in the other theme, change `data-theme` in `base.html`. To add a theme (sepia…), add its variant in `src/styles/variants/`, import it in `main.css`, then add its class next to each `light:`/`dark:` pair.

## Conventions

- **New page**: duplicate an existing page in `src/pages/`, then replace its content. Use `layout: dashboard.html` for pages with the sidebar, `layout: base.html` for standalone pages (login…).
- **Shared markup**: when the same block appears on several pages, move it to `src/partials/` and pull it in with `{% include "name.html" %}`. Asset paths in layouts and partials are relative to `dist/` (`images/logo.svg`, not `../images/logo.svg`).
- **Page name**: its sidebar label in kebab-case. "Overview" → `overview.html`.
- **Sub-page or state**: parent name + qualifier. `transactions-detail.html`, `transactions-empty.html` (they sort next to their parent).
- **Custom class**: one `@utility` per file in `src/styles/utilities/`, named after the class. `scroll-edge-fade` → `scroll-edge-fade.css`.
- **Custom variant**: one `@custom-variant` per file in `src/styles/variants/`, named after the variant. `dark:` → `dark.css`.
- **Vue and React repos**: copy `src/styles/` as is.
- **Language**: English everywhere (code, comments, docs), except `CLAUDE.md`.

## Scripts

| Command                | Effect                                                                   |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm run dev`          | serves the site on http://localhost:8080 and rebuilds pages and CSS live |
| `npm run build`        | builds the pages and a minified `dist/css/kuina.css`                     |
| `npm run format`       | formats the whole project with Prettier, Nunjucks tags included          |
| `npm run format:check` | checks formatting without changing files                                 |

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat: add budget page`, `fix: align sidebar icons`. Two Git hooks, installed by `npm install`, run on each commit:

- **pre-commit**: lint-staged formats the staged files with Prettier.
- **commit-msg**: commitlint rejects a message that does not follow the convention.

The hooks need a Git repository: after `git init`, run `npm install` once to install them.

## Support Kuina UI

Kuina UI is free and open source. If it saves you time, you can support its development:

- [GitHub Sponsors](https://github.com/sponsors/mgcodeur)
- [Open Collective](https://opencollective.com/mgcodeur)
- [Ko-fi](https://ko-fi.com/mgcodeur)

## License

[MIT](LICENSE): free to use, modify and redistribute, including for commercial projects.
