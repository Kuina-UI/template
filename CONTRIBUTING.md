# Contributing to Kuina UI — HTML

Where things live, how a page is built and the rules every change follows. To install and run the project, see [Getting started](README.md#getting-started).

## Structure

```
src/
├── pages/            one built page = one file, no subfolders
├── layouts/          page skeletons a page wraps itself in
│   ├── base.html         document shell: <head>, stylesheet, icons script, charts script when asked
│   ├── auth.html         base for sign-in pages (login…)
│   └── dashboard.html    base + sidebar + <main>
├── partials/         shared fragments pulled in with {% include %}, or macros imported with {% from %}
│   └── sidebar.html
├── _data/            build-time data available to every page
│   └── themeTokens.js    tokens read from styles/theme.css, listed on tokens.html
├── scripts/          page scripts, copied to dist/js/
│   └── overview.js
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

A page only holds its own content. The front matter at the top picks the layout that wraps it, names the page and says whether it draws charts:

```html
---
layout: dashboard.html
title: Overview
usesCharts: true
---

<h1>Overview</h1>
```

`dashboard.html` places that content inside `<main>`, next to the sidebar, then hands everything to `base.html` for the `<head>` and scripts. `title` fills the browser tab (`Overview · Kuina UI`). `usesCharts: true` loads ApexCharts; leave it out on pages without charts so they skip the library. `src/pages/overview.html` comes out as `dist/overview.html`, flat, next to `css/kuina.css`, `js/lucide.min.js`, `js/apexcharts.min.js`, `images/` and `favicon/`. Each built page is then formatted with Prettier, using the same `.prettierrc` as the sources.

## Themes

Every color class comes as a pair, one per theme:

```html
<p class="dark:text-stone-200/55 light:text-stone-500"></p>
```

A color class without a theme variant would show in every theme. Brand and surface colors are the exception: they are `@theme` tokens in `theme.css` declared with `light-dark()` (`--color-primary: light-dark(#1f6b59, #48b89a)`), which follows the `color-scheme` set on `<html>`, so their class needs no variant: `ring-primary`, `bg-canvas` (page background), `bg-widget` (cards), `bg-field` (form fields), `bg-overlay` (backdrop behind modals and drawers), `border-line` (borders and separators), `text-muted` (subdued text). Images that change with the theme come as one `<img>` per theme, hidden outside it: `class="hidden light:block"`.

To add a theme (sepia…), add its variant in `src/styles/variants/`, import it in `main.css`, then add its class next to each `light:`/`dark:` pair.

## Conventions

- **New page**: duplicate an existing page in `src/pages/`, then replace its content. Use `layout: dashboard.html` for pages with the sidebar, `layout: auth.html` for sign-in pages (login…), `layout: base.html` for any other standalone page.
- **Shared markup**: when the same block appears on several pages, move it to `src/partials/` and pull it in with `{% include "name.html" %}`. Asset paths in layouts and partials are relative to `dist/` (`images/logo.svg`, not `../images/logo.svg`).
- **Page name**: its sidebar label in kebab-case. "Overview" → `overview.html`.
- **Sub-page or state**: parent name + qualifier. `transactions-detail.html`, `transactions-empty.html` (they sort next to their parent).
- **Page script**: `src/scripts/<page>.js`, named after its page, loaded at the end of that page with `<script src="js/overview.js" defer></script>`, so it runs after the libraries `base.html` loads (Lucide, plus ApexCharts with `usesCharts: true`).
- **Icons**: `<i data-lucide="bell"></i>`, without `aria-hidden`: Lucide adds it when it draws the icon. A button or link that only shows an icon gets an `aria-label`.
- **Custom class**: one `@utility` per file in `src/styles/utilities/`, named after the class. `scroll-edge-fade` → `scroll-edge-fade.css`.
- **Custom variant**: one `@custom-variant` per file in `src/styles/variants/`, named after the variant. `dark:` → `dark.css`.
- **Vue and React repos**: copy `src/styles/` as is.
- **Language**: English everywhere (code, comments, docs), except `CLAUDE.md`.

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat: add budget page`, `fix: align sidebar icons`. Two Git hooks, installed by `npm install`, run on each commit:

- **pre-commit**: lint-staged formats the staged files with Prettier.
- **commit-msg**: commitlint rejects a message that does not follow the convention.

The hooks need a Git repository: after `git init`, run `npm install` once to install them.
