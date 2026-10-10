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

## Scripts

| Command                | Effect                                                                   |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm run dev`          | serves the site on http://localhost:8080 and rebuilds pages and CSS live |
| `npm run build`        | builds the pages and a minified `dist/css/kuina.css`                     |
| `npm run format`       | formats the whole project with Prettier, Nunjucks tags included          |
| `npm run format:check` | checks formatting without changing files                                 |

## Themes

Pages come in a light and a dark theme. `data-theme` on `<html>`, in `src/layouts/base.html`, picks it: set it to `light` or `dark` to preview every page in that theme.

## Contributing

The project structure, how a page is built, naming conventions and commit rules are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Support Kuina UI

Kuina UI is free and open source. If it saves you time, you can support its development:

- [GitHub Sponsors](https://github.com/sponsors/mgcodeur)
- [Open Collective](https://opencollective.com/mgcodeur)
- [Ko-fi](https://ko-fi.com/mgcodeur)

## License

[MIT](LICENSE): free to use, modify and redistribute, including for commercial projects.
