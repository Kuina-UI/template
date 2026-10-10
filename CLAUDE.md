# Kuina UI — HTML

## Structure

Arborescence et conventions détaillées : `README.md`. Règles à respecter :

- Une page intégrée = `src/pages/<nom>.html`, à plat (pas de sous-dossier), nommée comme son libellé dans la sidebar, en kebab-case anglais.
- Les pages sont assemblées par Eleventy + Nunjucks. Une page ne contient que son propre contenu, avec un front matter `layout:` (`dashboard.html` avec sidebar, `base.html` sans). Une nouvelle page part d'une copie d'une page existante.
- Le balisage partagé va dans `src/layouts/` (squelettes de page) ou `src/partials/` (fragments inclus via `{% include %}`), jamais copié d'une page à l'autre. Tous ces fichiers restent en `.html`.
- Les chemins d'assets dans les layouts et partials sont relatifs à `dist/` (`images/logo.svg`), car toutes les pages sortent à plat dans `dist/`.
- `src/styles/` ne contient que le design system : tokens dans `theme.css`, une `@utility` par fichier dans `utilities/`, nommé comme la classe, une `@custom-variant` par fichier dans `variants/`, nommé comme la variante.
- Thèmes : `data-theme="light"` ou `"dark"` sur `<html>` (dans `base.html`). Chaque classe de couleur s'écrit en paire `light:…` + `dark:…`, jamais sans variante. Pas encore de tokens de couleur (`--color-*`) : on utilise la palette Tailwind directement.
- `dist/` est généré par Eleventy et Tailwind : ne jamais l'éditer.

## Langue

Tout est en anglais : code, commentaires, textes des pages, README, fichiers de config. Seule exception : ce fichier CLAUDE.md.

## Nommage

Chaque nom doit être significatif : on doit comprendre à quoi il sert au premier coup d'œil, sans lire le code autour.

S'applique à tout : variables CSS et tokens `@theme`, variables et fonctions JS, classes, IDs, noms de fichiers.

- Interdit : noms génériques ou abrégés comme `x`, `data`, `item`, `val`, `tmp`, `el`, `obj`, `info`.
- Un nom précise son rôle et son périmètre. Exemple : `--spacing-page-gutter` (l'espacement autour de la page) plutôt que `--spacing-gutter` (gutter de quoi ?).
- Mieux vaut un nom un peu long et clair qu'un nom court et ambigu.

## Commits

Messages au format Conventional Commits (`feat: …`, `fix: …`, `chore: …`), en anglais, vérifiés par commitlint.

## Commentaires

Pas de commentaire inutile dans le code.

- Seule exception : un doc block (`/** … */`) au-dessus d'un bloc comme une fonction, une `@utility` ou une `@custom-variant`, pour expliquer ce qui n'est pas évident.
- Court : une ou deux lignes.
- Partout ailleurs, HTML et fichiers de config compris : aucun commentaire. Un commentaire qui répète le code est inutile.
