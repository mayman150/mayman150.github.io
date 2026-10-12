# mayman150.github.io

Personal research site. Static, zero-build, no dependencies, no tracker.

```
index.html
assets/css/style.css   styling + light/dark tokens
assets/js/data.js      ← all content lives here
assets/js/main.js      rendering, nav, scroll reveals
assets/cv/cv.tex       CV source
assets/cv/*.pdf        built CV, linked from the site
```

## Editing content

Everything you'd normally change is in **`assets/js/data.js`**:

| Export | Drives |
|---|---|
| `THREADS` | Research |
| `PAPERS` | Papers |
| `EXPERIENCE` | Experience timeline |
| `EDUCATION` | Education |
| `TEACHING` | Teaching |
| `SKILLS` | the Toolkit panel |
| `PROJECTS` / `AREAS` | Projects grid and filter chips |

Prose (About, masthead blurb) is plain text in `index.html`.

## Rebuilding the CV

```bash
cd assets/cv
tectonic cv.tex && mv cv.pdf Mohamed-Ayman-Mohamed-CV.pdf
```

`tectonic` downloads what it needs on first run. If you'd rather not keep the
`.tex` public, delete it; only the PDF is linked.

## Design intent

Typeset like a technical document, not a landing page. Serif headings, mono
metadata labels, hairline rules, one brass accent, dark and light themes.
Deliberately **no** hero animation, no scrolling marquee, no cursor effects, no
full-screen splash. Content starts at the top of the page.

If you add motion later, keep it behind `prefers-reduced-motion`.

## What is deliberately omitted

- **Location.** Not mentioned anywhere on the site, and stripped from the CV
  header and from `EXPERIENCE` entries in `data.js`.
- **Phone number.** On your CV originally; left off both the site and the
  public PDF.
- **Unpublished research.** Only peer-reviewed papers, public preprints, and
  public repositories appear. If you add work here, make sure you're happy for
  it to be public before a submission deadline.
- **Citation count is a snapshot** (63, hardcoded in `index.html`). It will go
  stale, so update it or delete the row.

## Known source discrepancies

Your CVs disagree in a couple of places. What the site uses, and why:

| Field | Site uses | Note |
|---|---|---|
| Scholar ID | `5OnlOKMAAAAJ` | The one you sent; older CVs cite `UIcj1-QAAAAJ` |
| 3DCoMPaT++ year | 2025 | Scholar says 2025, your CV says 2024 |
| The Cell Must Go On | RLC 2026, published | An older CV lists it as submitted to NeurIPS '25 |

Worth checking the stale Scholar link if any of those CVs are still in
circulation.

## Local preview

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

Append `?theme=dark` or `?theme=light` to force a theme while checking layout.

## Deploy to GitHub Pages

This repo name (`mayman150.github.io`) makes it a **user site**, served at
`https://mayman150.github.io/`.

The repo does not exist on GitHub yet and has never been pushed:

```bash
gh auth login                      # the stored token is expired
gh repo create mayman150.github.io --public --source=. --push
```

Then **Settings → Pages → Source: Deploy from a branch**, branch `main`,
folder `/ (root)`.

Pushing over SSH works too, but your *default* SSH key authenticates as
`AgarCL`, not `mayman150`. Pin the right key for this repo:

```bash
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_mayman150 -o IdentitiesOnly=yes"
git remote add origin git@github.com:mayman150/mayman150.github.io.git
git push -u origin main
```

`.nojekyll` is present so GitHub serves `assets/` verbatim.

## Notes

- Dark theme by default; the toggle persists to `localStorage` and the first
  visit follows the OS setting.
- Star counts refresh from the public GitHub API at load (your account plus the
  `machado-research` org) and fail silently on rate limit; the values in
  `data.js` are the fallback.
- On narrow screens the section nav scrolls horizontally and the social icons
  hide (they're duplicated in Contact).
- Fonts: Instrument Serif (headings), Hanken Grotesk (body), JetBrains Mono.
