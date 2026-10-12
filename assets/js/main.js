/* ============================================================
   Mohamed Ayman Mohamed: site behaviour
   No dependencies. Degrades cleanly if anything is unavailable.
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ARROW_SM = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;
  const ARROW    = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;
  const STAR     = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 2.3 5 5.2.6-3.9 3.6 1.1 5.2L12 15.8l-4.7 2.6 1.1-5.2L4.5 9.6 9.7 9Z"/></svg>`;

  /* ---------------------------------------------------------
     1. Theme
     --------------------------------------------------------- */
  const root = document.documentElement;
  const STORE = "may-theme";

  function setTheme(name, remember) {
    root.dataset.theme = name;
    if (remember) { try { localStorage.setItem(STORE, name); } catch (_) {} }
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", name === "light" ? "#f6f2ea" : "#0a0c0d");
  }

  (function initTheme() {
    const forced = new URLSearchParams(location.search).get("theme");
    if (forced === "dark" || forced === "light") return setTheme(forced, false);

    let saved = null;
    try { saved = localStorage.getItem(STORE); } catch (_) {}
    if (saved === "dark" || saved === "light") return setTheme(saved, false);

    setTheme(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark", false);
  })();

  $("#themeToggle")?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "light" ? "dark" : "light", true);
  });

  /* ---------------------------------------------------------
     2. Research strands
     --------------------------------------------------------- */
  const BADGE = {
    primary:   { label: "Core",     cls: "badge--live" },
    secondary: { label: "Adjacent", cls: "" }
  };

  const threadsEl = $("#threads");
  if (threadsEl && typeof THREADS !== "undefined") {
    threadsEl.innerHTML = THREADS.map((t, i) => {
      const links = (t.links || []).map((l) =>
        `<a class="pill" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${ARROW_SM}</a>`
      ).join("");
      const b = BADGE[t.status] || BADGE.primary;
      return `
      <li class="thread reveal">
        <span class="thread__idx" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
        <div class="thread__main">
          <div class="thread__kicker">
            <span class="thread__area">${esc(t.area)}</span>
            <span class="badge ${b.cls}">${b.label}</span>
          </div>
          <h3 class="thread__title">${esc(t.title)}</h3>
          <p class="thread__sub">${esc(t.sub)}</p>
          ${t.marker ? `<code class="thread__formula">${esc(t.marker)}</code>` : ""}
        </div>
        <div class="thread__detail">
          ${t.body.map((p) => `<p>${p}</p>`).join("")}
          ${links ? `<div class="thread__links">${links}</div>` : ""}
        </div>
      </li>`;
    }).join("");
  }

  /* ---------------------------------------------------------
     3. Papers
     --------------------------------------------------------- */
  const papersEl = $("#papersList");
  if (papersEl && typeof PAPERS !== "undefined") {
    papersEl.innerHTML = PAPERS.map((p) => {
      const title = p.url
        ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)} ${ARROW_SM}</a>`
        : esc(p.title);
      return `
      <li class="paper reveal">
        <div class="paper__meta">
          <span class="paper__year">${esc(p.year)}</span>
          <span class="paper__kind mono">${esc(p.kind)}</span>
        </div>
        <div>
          <h3 class="paper__title">${title}</h3>
          ${p.authors ? `<p class="paper__authors">${p.authors}</p>` : ""}
          <p class="paper__abs">${esc(p.abs)}</p>
          ${p.venue ? `<p class="thread__venue"><b>${esc(p.venue)}</b></p>` : ""}
        </div>
        <span class="badge paper__status">${esc(p.status)}</span>
      </li>`;
    }).join("");
  }

  /* ---------------------------------------------------------
     4. Skills, experience, education, teaching
     --------------------------------------------------------- */
  const skillsEl = $("#skills");
  if (skillsEl && typeof SKILLS !== "undefined") {
    skillsEl.innerHTML = SKILLS.map((g) => `
      <div class="skillgroup">
        <span class="skillgroup__name mono">${esc(g.group)}</span>
        <ul class="taglist taglist--mono">
          ${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}
        </ul>
      </div>`).join("");
  }

  const timelineEl = $("#timeline");
  if (timelineEl && typeof EXPERIENCE !== "undefined") {
    timelineEl.innerHTML = EXPERIENCE.map((e) => `
      <li class="job reveal${e.now ? " job--now" : ""}">
        <div class="job__when">
          <span class="mono job__period">${esc(e.period)}</span>
          <span class="mono job__kind">${esc(e.kind)}</span>
        </div>
        <div class="job__what">
          <h3 class="job__role">${esc(e.role)}</h3>
          <p class="job__org">${esc(e.org)}</p>
          <ul class="job__points">
            ${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}
          </ul>
        </div>
      </li>`).join("");
  }

  const eduEl = $("#education");
  if (eduEl && typeof EDUCATION !== "undefined") {
    eduEl.innerHTML = EDUCATION.map((e) => `
      <li class="degree reveal">
        <span class="mono degree__period">${esc(e.period)}</span>
        <div>
          <h4 class="degree__name">${esc(e.degree)}</h4>
          <p class="degree__school">${esc(e.school)}</p>
          <p class="degree__detail">${esc(e.detail)}</p>
        </div>
      </li>`).join("");
  }

  const teachEl = $("#teaching");
  if (teachEl && typeof TEACHING !== "undefined") {
    teachEl.innerHTML = TEACHING.map((t) => `
      <li class="teach reveal">
        <div>
          <h4 class="teach__role">${esc(t.role)}</h4>
          <p class="teach__org">${esc(t.org)}</p>
        </div>
        <ul class="taglist">
          ${t.courses.map((c) => `<li>${esc(c)}</li>`).join("")}
        </ul>
      </li>`).join("");
  }

  /* ---------------------------------------------------------
     5. Projects + filters
     --------------------------------------------------------- */
  const cardsEl = $("#cards");
  const filtersEl = $("#filters");

  if (cardsEl && typeof PROJECTS !== "undefined") {
    cardsEl.innerHTML = PROJECTS.map((p) => {
      const owner = p.owner || "mayman150";
      return `
      <a class="card reveal" data-area="${esc(p.area)}" data-repo="${esc(owner)}/${esc(p.repo)}"
         href="https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(p.repo)}"
         target="_blank" rel="noopener">
        <div class="card__top">
          <span class="card__lang"><span class="dot" aria-hidden="true"></span>${esc(p.lang)}</span>
          <span class="card__stars" data-stars ${p.stars ? "" : "hidden"}>${STAR}<span>${p.stars}</span></span>
        </div>
        <h3 class="card__title">${esc(p.name)}</h3>
        <p class="card__desc">${esc(p.desc)}</p>
        <div class="card__foot">
          <span class="card__area">${esc(p.area)}</span>
          <span class="card__go">Repository ${ARROW}</span>
        </div>
      </a>`;
    }).join("");
  }

  if (filtersEl && typeof PROJECTS !== "undefined") {
    const counts = PROJECTS.reduce((m, p) => (m[p.area] = (m[p.area] || 0) + 1, m), {});
    const areas = (typeof AREAS !== "undefined" ? AREAS : Object.keys(counts))
      .filter((a) => counts[a]);

    filtersEl.innerHTML =
      `<button class="chip is-on" type="button" data-filter="all" aria-pressed="true">All <b>${PROJECTS.length}</b></button>` +
      areas.map((a) =>
        `<button class="chip" type="button" data-filter="${esc(a)}" aria-pressed="false">${esc(a)} <b>${counts[a]}</b></button>`
      ).join("");

    filtersEl.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      const want = chip.dataset.filter;

      $$(".chip", filtersEl).forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-on", on);
        c.setAttribute("aria-pressed", String(on));
      });

      $$(".card", cardsEl).forEach((card) => {
        card.classList.toggle("is-hidden", !(want === "all" || card.dataset.area === want));
      });
    });
  }

  /* ---------------------------------------------------------
     6. Scroll reveals (a short fade, nothing more)
     --------------------------------------------------------- */
  const revealables = $$(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     7. Nav: condensed on scroll, active section
     --------------------------------------------------------- */
  const nav = $("#nav");
  const navLinks = $$("[data-nav]");
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  let queued = false;
  function onScroll() {
    nav?.classList.toggle("is-stuck", window.scrollY > 24);

    let current = -1;
    sections.forEach((s, i) => {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = i;
    });
    navLinks.forEach((a, i) => a.classList.toggle("is-active", i === current));

    queued = false;
  }
  window.addEventListener("scroll", () => {
    if (!queued) { queued = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     8. Footer year
     --------------------------------------------------------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------
     9. Optional: refresh star counts from the GitHub API.
        Silent no-op on rate limit or offline.
     --------------------------------------------------------- */
  (function liveStars() {
    if (!cardsEl) return;
    const sources = [
      "https://api.github.com/users/mayman150/repos?per_page=100",
      "https://api.github.com/orgs/machado-research/repos?per_page=100"
    ];
    Promise.all(sources.map((u) =>
      fetch(u, { headers: { Accept: "application/vnd.github+json" } })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => [])
    )).then((lists) => {
      const byName = new Map();
      lists.flat().forEach((r) => {
        if (r && r.full_name) byName.set(r.full_name, r.stargazers_count);
      });
      $$(".card", cardsEl).forEach((card) => {
        const n = byName.get(card.dataset.repo);
        if (!n) return;
        const box = $("[data-stars]", card);
        if (!box) return;
        $("span", box).textContent = n;
        box.hidden = false;
      });
    }).catch(() => {});
  })();
})();
