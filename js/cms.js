/* Public CMS renderer — pulls published content from Supabase.
   If a content type has no rows, the built-in static content stays untouched (SEO fallback). */
(function () {
  "use strict";
  if (!window.SK_SUPABASE) return;
  var BASE = window.SK_SUPABASE.url + "/rest/v1/";
  var HEADERS = { apikey: window.SK_SUPABASE.key, Authorization: "Bearer " + window.SK_SUPABASE.key };
  function get(path) {
    return fetch(BASE + path, { headers: HEADERS }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  }
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }
  var CAT_SLUG = { "Darkroom Stories": "darkroom", "Studio Lighting": "lighting", "Portraiture": "portrait", "Career Lessons": "career", "Field Notes": "field" };
  var CAT_LABEL = { portrait: "Portrait", industrial: "Industrial", editorial: "Editorial", studio: "Studio", advertising: "Advertising", legacy: "Legacy" };
  var page = location.pathname.split("/").pop() || "index.html";

  /* Re-implement facet filtering for dynamically replaced grids */
  function bindFilters(scope) {
    var facets = {};
    function apply() {
      var items = scope.querySelectorAll("[data-item]");
      var empty = scope.querySelector(".empty-state");
      var visible = 0;
      items.forEach(function (item) {
        var show = Object.keys(facets).every(function (f) {
          var val = facets[f];
          if (!val || val === "all") return true;
          var attr = item.getAttribute("data-" + f) || "";
          return attr.split(" ").indexOf(val) !== -1;
        });
        item.classList.toggle("hidden", !show);
        if (show) visible++;
      });
      if (empty) empty.classList.toggle("show", visible === 0);
    }
    scope.querySelectorAll(".filter-btn").forEach(function (btn) {
      var facet = btn.getAttribute("data-facet");
      if (btn.classList.contains("active")) facets[facet] = btn.getAttribute("data-value");
      btn.addEventListener("click", function () {
        facets[facet] = btn.getAttribute("data-value");
        apply();
      });
    });
    apply();
  }

  /* ---------- home: hero text + testimonials ---------- */
  if (page === "index.html") {
    get("site_settings?select=*").then(function (rows) {
      rows.forEach(function (s) {
        if (s.key === "hero_headline" && s.value) {
          var h = document.querySelector(".hero h1");
          if (h) h.textContent = s.value;
        }
        if (s.key === "hero_lede" && s.value) {
          var l = document.querySelector(".hero .lede");
          if (l) l.textContent = s.value;
        }
      });
    });
    get("testimonials?published=eq.true&select=*&order=created_at.desc").then(function (rows) {
      if (!rows.length) return;
      var cta = document.querySelector(".cta-band");
      if (!cta) return;
      var sec = document.createElement("section");
      sec.className = "dark";
      sec.setAttribute("aria-label", "Testimonials");
      sec.innerHTML = '<div class="wrap"><div class="section-head"><span class="eyebrow">Kind Words</span><h2>What Clients &amp; Students Say</h2></div>' +
        '<div class="grid g-2">' + rows.map(function (t) {
          return '<div class="card"><p style="font-family:var(--font-display);font-style:italic;font-size:1.15rem;line-height:1.5">&ldquo;' + esc(t.quote) + '&rdquo;</p>' +
            '<p style="margin-top:1.2rem;font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:#8d8676">' + esc(t.name) + (t.role ? " · " + esc(t.role) : "") + '</p></div>';
        }).join("") + '</div></div>';
      cta.parentNode.insertBefore(sec, cta);
    });
  }

  /* ---------- journal: replace list when CMS posts exist ---------- */
  if (page === "journal.html") {
    get("journal_posts?published=eq.true&select=*&order=created_at.desc").then(function (rows) {
      if (!rows.length) return;
      var list = document.getElementById("journal-list");
      var scope = document.querySelector("[data-filter-scope]");
      if (!list || !scope) return;
      list.innerHTML = rows.map(function (p, i) {
        var slug = CAT_SLUG[p.category] || "field";
        var paras = (p.body || "").split(/\n\s*\n/).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
        return '<article class="article-card" data-item data-cat="' + slug + '">' +
          '<span class="cat">' + esc(p.category) + '</span>' +
          '<div><h3><button data-cms-toggle="cmsart' + i + '" aria-expanded="false">' + esc(p.title) + '</button></h3>' +
          '<p class="excerpt">' + esc(p.excerpt || "") + '</p></div>' +
          '<span class="rt">' + esc(p.read_time || "") + '</span>' +
          '<div class="article-body" id="cmsart' + i + '"><div class="inner">' + paras + '</div></div></article>';
      }).join("");
      list.querySelectorAll("[data-cms-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var body = document.getElementById(btn.getAttribute("data-cms-toggle"));
          var open = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", open ? "false" : "true");
          body.style.maxHeight = open ? "0px" : body.scrollHeight + "px";
        });
      });
      bindFilters(scope);
    });
  }

  /* ---------- portfolio: replace grid when CMS items exist ---------- */
  if (page === "portfolio.html") {
    get("portfolio_items?published=eq.true&select=*&order=created_at.desc").then(function (rows) {
      if (!rows.length) return;
      var grid = document.getElementById("portfolio-grid");
      var scope = document.querySelector("[data-filter-scope]");
      if (!grid || !scope) return;
      grid.innerHTML = rows.map(function (p) {
        var label = CAT_LABEL[p.category] || p.category;
        var media;
        if (p.image_url) {
          media = '<div class="ph-frame"><img src="' + esc(p.image_url) + '" alt="' + esc(p.title) + '" loading="lazy" style="width:100%;display:block"></div>';
        } else {
          media = '<div class="ph ' + esc(p.ratio || "r-34") + ' ph-frame"><span class="ph-label"><span class="cat">' + esc(label) + '</span><span>' + esc(p.caption || "") + '</span></span></div>';
        }
        return '<button class="work" data-item data-cat="' + esc(p.category) + '" data-era="' + esc(p.era) + '" data-title="' + esc(p.title) + '" data-meta="' + esc((label) + (p.caption ? " · " + p.caption : "")) + '" data-img="' + esc(p.image_url || "") + '">' +
          media + '<div class="meta"><span class="t">' + esc(p.title) + '</span><span class="y">' + esc(label) + '</span></div></button>';
      }).join("");
      bindFilters(scope);

      /* fresh lightbox bindings for CMS items */
      var lb = document.getElementById("lightbox");
      if (!lb) return;
      var clean = lb.cloneNode(true);
      lb.parentNode.replaceChild(clean, lb);
      lb = clean;
      var inner = lb.querySelector(".lb-inner");
      var works = Array.prototype.slice.call(grid.querySelectorAll(".work"));
      var idx = 0;
      function openLb(i) {
        idx = (i + works.length) % works.length;
        var w = works[idx];
        var img = w.getAttribute("data-img");
        var mediaBox = inner.children[0];
        if (img) {
          mediaBox.outerHTML = '<div class="ph-frame"><img src="' + esc(img) + '" alt="' + esc(w.getAttribute("data-title")) + '" style="width:100%;max-height:70vh;object-fit:contain;display:block"></div>';
        } else {
          var ph = w.querySelector(".ph");
          mediaBox.outerHTML = '<div class="' + ph.className + '" style="' + ph.getAttribute("style") + '"><span class="ph-label"><span class="cat">Preview</span><span></span></span></div>';
        }
        lb.querySelector(".lb-t").textContent = w.getAttribute("data-title") || "";
        lb.querySelector(".lb-m").textContent = w.getAttribute("data-meta") || "";
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
      }
      function closeLb() { lb.classList.remove("open"); document.body.style.overflow = ""; }
      works.forEach(function (w, i) { w.addEventListener("click", function () { openLb(i); }); });
      lb.querySelector(".lb-close").addEventListener("click", closeLb);
      lb.querySelector(".lb-prev").addEventListener("click", function () { openLb(idx - 1); });
      lb.querySelector(".lb-next").addEventListener("click", function () { openLb(idx + 1); });
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") closeLb();
        if (e.key === "ArrowLeft") openLb(idx - 1);
        if (e.key === "ArrowRight") openLb(idx + 1);
      });
    });
  }
})();
