/* ============================================================
   Mohamed Ayman Mohamed — portfolio behaviour
   No dependencies. Degrades cleanly if anything is unavailable.
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------------------------------------------------
     1. Theme
     --------------------------------------------------------- */
  const root = document.documentElement;
  const STORE = "may-theme";

  function setTheme(name, remember) {
    root.dataset.theme = name;
    if (remember) { try { localStorage.setItem(STORE, name); } catch (_) {} }
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", name === "light" ? "#f5f1e9" : "#080a0b");
    window.dispatchEvent(new Event("themechange"));
  }

  (function initTheme() {
    const forced = new URLSearchParams(location.search).get("theme");
    if (forced === "dark" || forced === "light") return setTheme(forced, false);

    let saved = null;
    try { saved = localStorage.getItem(STORE); } catch (_) {}
    if (saved === "dark" || saved === "light") return setTheme(saved, false);
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark", false);
  })();

  $("#themeToggle")?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "light" ? "dark" : "light", true);
  });

  /* ---------------------------------------------------------
     2. Render: research threads
     --------------------------------------------------------- */
  const BADGE = {
    primary:   { label: "Core",     cls: "badge--live" },
    secondary: { label: "Adjacent", cls: "" }
  };

  const ARROW_SM = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;

  const threadsEl = $("#threads");
  if (threadsEl && typeof THREADS !== "undefined") {
    threadsEl.innerHTML = THREADS.map((t, i) => {
      const b = BADGE[t.status] || BADGE.primary;
      const links = (t.links || []).map((l) =>
        `<a class="pill" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${ARROW_SM}</a>`
      ).join("");
      return `
      <li class="thread reveal" style="--d:${i * 70}ms">
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
     3. Render: writing
     --------------------------------------------------------- */
  const papersEl = $("#papersList");
  if (papersEl && typeof PAPERS !== "undefined") {
    papersEl.innerHTML = PAPERS.map((p, i) => {
      const title = p.url
        ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)} ${ARROW_SM}</a>`
        : esc(p.title);
      return `
      <li class="paper reveal" style="--d:${i * 60}ms">
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
     3b. Render: skills, experience timeline, education
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
    timelineEl.innerHTML = EXPERIENCE.map((e, i) => `
      <li class="job reveal${e.now ? " job--now" : ""}" style="--d:${i * 55}ms">
        <div class="job__when">
          <span class="mono job__period">${esc(e.period)}</span>
          <span class="mono job__kind">${esc(e.kind)}</span>
        </div>
        <div class="job__what">
          <h3 class="job__role">${esc(e.role)}</h3>
          <p class="job__org">${esc(e.org)} <span class="job__place">· ${esc(e.place)}</span></p>
          <ul class="job__points">
            ${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}
          </ul>
        </div>
      </li>`).join("");
  }

  const eduEl = $("#education");
  if (eduEl && typeof EDUCATION !== "undefined") {
    eduEl.innerHTML = EDUCATION.map((e, i) => `
      <li class="degree reveal" style="--d:${i * 60}ms">
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
    teachEl.innerHTML = TEACHING.map((t, i) => `
      <li class="teach reveal" style="--d:${i * 60}ms">
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
     4. Render: projects + filters
     --------------------------------------------------------- */
  const cardsEl = $("#cards");
  const filtersEl = $("#filters");

  const STAR = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 2.3 5 5.2.6-3.9 3.6 1.1 5.2L12 15.8l-4.7 2.6 1.1-5.2L4.5 9.6 9.7 9Z"/></svg>`;
  const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;

  if (cardsEl && typeof PROJECTS !== "undefined") {
    cardsEl.innerHTML = PROJECTS.map((p, i) => {
      const owner = p.owner || "mayman150";
      return `
      <a class="card reveal" data-area="${esc(p.area)}" data-repo="${esc(owner)}/${esc(p.repo)}"
         style="--d:${(i % 6) * 55}ms"
         href="https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(p.repo)}"
         target="_blank" rel="noopener">
        <div class="card__top">
          <span class="card__lang"><span class="dot" aria-hidden="true"></span>${esc(p.lang)}</span>
          <span class="card__stars" data-stars ${p.stars ? "" : 'hidden'}>${STAR}<span>${p.stars}</span></span>
        </div>
        <h3 class="card__title">${esc(p.name)}</h3>
        <p class="card__desc">${esc(p.desc)}</p>
        <div class="card__foot">
          <span class="card__area">${esc(p.area)}</span>
          <span class="card__go">Repository ${ARROW}</span>
        </div>
      </a>`;
    }).join("");

    // pointer-tracked glow
    if (!reduced) {
      cardsEl.addEventListener("pointermove", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--cx", `${e.clientX - r.left}px`);
        card.style.setProperty("--cy", `${e.clientY - r.top}px`);
      });
    }
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

      $$(".card", cardsEl).forEach((card, i) => {
        const show = want === "all" || card.dataset.area === want;
        card.classList.toggle("is-hidden", !show);
        if (show && !reduced) {
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = `rise .55s var(--ease) ${Math.min(i, 8) * 35}ms both`;
        }
      });
    });
  }

  /* ---------------------------------------------------------
     5. Scroll reveals
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
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     6. Counters
     --------------------------------------------------------- */
  $$("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    if (!Number.isFinite(target) || reduced) return;
    let started = false;
    const run = () => {
      if (started) return; started = true;
      const dur = 1100, t0 = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      el.textContent = "0";
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const o = new IntersectionObserver((es) => {
        if (es[0].isIntersecting) { run(); o.disconnect(); }
      }, { threshold: 0.5 });
      o.observe(el);
    } else run();
  });

  /* ---------------------------------------------------------
     7. Nav state, scroll progress, active section
     --------------------------------------------------------- */
  const nav = $("#nav");
  const bar = $("#scrollProgress");
  const navLinks = $$("[data-nav]");
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  let queued = false;
  function onScroll() {
    const y = window.scrollY;
    nav?.classList.toggle("is-stuck", y > 40);

    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
    }

    let current = -1;
    sections.forEach((s, i) => {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.38) current = i;
    });
    navLinks.forEach((a, i) => a.classList.toggle("is-active", i === current));

    queued = false;
  }
  window.addEventListener("scroll", () => {
    if (!queued) { queued = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     8. Cursor spotlight
     --------------------------------------------------------- */
  const spot = $("#spotlight");
  if (spot && !reduced && window.matchMedia("(pointer: fine)").matches) {
    let sx = 0, sy = 0, pending = false;
    window.addEventListener("pointermove", (e) => {
      sx = e.clientX; sy = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        spot.style.setProperty("--mx", `${sx}px`);
        spot.style.setProperty("--my", `${sy}px`);
        pending = false;
      });
    }, { passive: true });
  } else if (spot) {
    spot.style.display = "none";
  }

  /* ---------------------------------------------------------
     9. Policy field — particles advected by a flow field.
        A visual nod to trajectories in a vector field.
     --------------------------------------------------------- */
  (function fieldViz() {
    const cv = $("#field");
    if (!cv || reduced) { cv && (cv.style.display = "none"); return; }

    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1, parts = [], ink = "217, 162, 83", alpha = 0.34;

    function readInk() {
      const cs = getComputedStyle(root);
      ink = (cs.getPropertyValue("--field-ink") || "217,162,83").trim();
      alpha = parseFloat(cs.getPropertyValue("--field-alpha")) || 0.34;
    }

    function spawn() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        life: 60 + Math.random() * 220,
        age: 0,
        speed: 0.35 + Math.random() * 0.95,
        weight: Math.random() < 0.18 ? 1.4 : 0.6
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const n = Math.round(Math.min(150, Math.max(40, (w * h) / 11000)));
      parts = Array.from({ length: n }, spawn);
    }

    // smooth pseudo-noise: sum of sines. Cheap, no dependency, looks organic.
    function angleAt(x, y, t) {
      return Math.PI * (
        Math.sin(x * 0.0021 + t * 0.9) +
        Math.cos(y * 0.0024 - t * 0.7) +
        Math.sin((x + y) * 0.0013 + t * 0.45) * 0.8
      );
    }

    let t = 0, raf = 0, running = false;

    function frame() {
      if (!running) return;
      t += 0.0016;

      // fade existing trails without painting over the page background
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.016)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const a = angleAt(p.x, p.y, t);
        const nx = p.x + Math.cos(a) * p.speed * 1.6;
        const ny = p.y + Math.sin(a) * p.speed * 1.6;

        ctx.strokeStyle = `rgba(${ink}, ${alpha * (p.weight > 1 ? 0.95 : 0.4)})`;
        ctx.lineWidth = p.weight;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx; p.y = ny; p.age++;

        if (p.age > p.life || p.x < -40 || p.x > w + 40 || p.y < -40 || p.y > h + 40) {
          parts[i] = spawn();
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function start() { if (!running) { running = true; raf = requestAnimationFrame(frame); } }
    function stop()  { running = false; cancelAnimationFrame(raf); }

    readInk();
    resize();
    start();

    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => { resize(); readInk(); }, 180);
    });

    window.addEventListener("themechange", () => {
      readInk();
      ctx.clearRect(0, 0, w, h);
    });

    document.addEventListener("visibilitychange", () => {
      document.hidden ? stop() : start();
    });

    // Stop drawing once the field is scrolled out of its masked region.
    let sq = false;
    window.addEventListener("scroll", () => {
      if (sq) return;
      sq = true;
      requestAnimationFrame(() => {
        const past = window.scrollY > window.innerHeight * 1.25;
        past ? stop() : (!document.hidden && start());
        sq = false;
      });
    }, { passive: true });
  })();

  /* ---------------------------------------------------------
     10. Optional: refresh star counts from the GitHub API.
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
