# mayman150.github.io

Personal research portfolio — static, zero-build, no dependencies.

```
index.html
assets/css/style.css     all styling + light/dark tokens
assets/js/data.js        ← all content lives here
assets/js/main.js        rendering, scroll, flow-field canvas
```

## Editing content

Everything you'd normally want to change is in **`assets/js/data.js`**:

| Export | Drives |
|---|---|
| `THREADS` | the Research section |
| `PAPERS` | the Writing section |
| `PROJECTS` / `AREAS` | the Projects grid and its filter chips |

Prose (the About section, hero blurb) is plain text in `index.html`.

## Before publishing — fill these in

Four placeholders are marked in `index.html` with `data-placeholder` and render
in grey italics:

- `email` — replace `mailto:REPLACE@EXAMPLE.COM`
- `scholar` — Google Scholar URL
- `linkedin` — LinkedIn URL

Delete any `<a class="link" …>` block you don't want. Also review:

- **Venue names.** The multi-agent paper is listed as "Under review" with no
  venue, because naming a venue during double-blind review can conflict with
  anonymity policy. Add it in `data.js` (`PAPERS[0].venue`) when you're ready.
- **Unpublished work.** The STOP and Shift-Aware SGD descriptions are
  deliberately high level. Trim further if you'd rather not signal direction
  before submitting.

## Local preview

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Deploy to GitHub Pages

This repo name (`mayman150.github.io`) makes it a **user site**, served at
`https://mayman150.github.io/`.

```bash
gh auth login                      # current token is expired
gh repo create mayman150.github.io --public --source=. --push
```

Then: repo **Settings → Pages → Build and deployment → Source: Deploy from a
branch**, branch `main`, folder `/ (root)`. First build takes a minute or two.

Without the `gh` CLI, create the repo in the browser and:

```bash
git remote add origin git@github.com:mayman150/mayman150.github.io.git
git push -u origin main
```

`.nojekyll` is present so GitHub serves `assets/` verbatim.

## Notes

- Dark theme by default, light theme available; the toggle persists to
  `localStorage` and the first visit follows the OS setting.
- The hero canvas advects particles through a flow field. It pauses when the
  tab is hidden or once scrolled past, and is disabled entirely under
  `prefers-reduced-motion`.
- Star counts come from the public GitHub API at page load and fail silently
  on rate limit; the baked-in values in `data.js` are the fallback.
- Fonts: Instrument Serif (display), Hanken Grotesk (body), JetBrains Mono.
