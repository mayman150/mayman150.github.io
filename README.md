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
| `THREADS` | Research |
| `PAPERS` | Papers |
| `EXPERIENCE` | Experience timeline |
| `EDUCATION` | Education |
| `TEACHING` | Teaching |
| `SKILLS` | the Toolkit panel |
| `PROJECTS` / `AREAS` | Projects grid and its filter chips |

Prose (the About section, hero blurb) is plain text in `index.html`.

## Editorial policy

**Only publicly released work appears on this site.** Peer-reviewed papers,
public preprints, and public repositories. Unpublished and in-progress research
is deliberately left off — if you add a new project here, make sure you're happy
for it to be public before a submission deadline.

Two other deliberate omissions:

- **No phone number.** It's on the CV but a public page invites spam; add it
  only if you want it scraped.
- **Citation count is a snapshot** (63, from Google Scholar). It's a static
  number in `index.html` (`data-count="63"`) and will go stale — update it when
  you think of it, or delete that row.

## Known source discrepancies

Your three CVs disagree in a few places. What the site uses, and why:

| Field | Site uses | Note |
|---|---|---|
| Location | Vancouver | Newest CV; older two say Edmonton |
| Scholar ID | `5OnlOKMAAAAJ` | The one you sent; older CVs cite `UIcj1-QAAAAJ` |
| 3DCoMPaT++ year | 2025 | Scholar says 2025, your CV says 2024 |
| The Cell Must Go On | RLC 2026, published | An older CV lists it as submitted to NeurIPS '25 |

Fix any of these in `data.js` if the site is wrong.

## Local preview

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

Append `?theme=dark` or `?theme=light` to force a theme while checking layout.

## Deploy to GitHub Pages

This repo name (`mayman150.github.io`) makes it a **user site**, served at
`https://mayman150.github.io/`.

The repo does not exist on GitHub yet and has never been pushed. To publish:

```bash
gh auth login                      # the stored token is expired
gh repo create mayman150.github.io --public --source=. --push
```

Then: repo **Settings → Pages → Build and deployment → Source: Deploy from a
branch**, branch `main`, folder `/ (root)`. First build takes a minute or two.

Pushing over SSH works too, but note your *default* SSH key authenticates as
`AgarCL`, not `mayman150`. Pin the right key for this repo:

```bash
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_mayman150 -o IdentitiesOnly=yes"
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
- Star counts come from the public GitHub API at page load (your account plus
  the `machado-research` org) and fail silently on rate limit; the baked-in
  values in `data.js` are the fallback.
- Fonts: Instrument Serif (display), Hanken Grotesk (body), JetBrains Mono.
