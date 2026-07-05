/* Block render engine + dynamic form runtime.
   Pages become editable stacks of blocks (page_sections table).
   Forms become editable field lists (form_fields table).
   When a page/form has no CMS rows, the built-in static HTML remains (SEO fallback). */
(function () {
  "use strict";
  if (!window.SK_SUPABASE) return;
  var URL0 = window.SK_SUPABASE.url + "/rest/v1/";
  var H = { apikey: window.SK_SUPABASE.key, Authorization: "Bearer " + window.SK_SUPABASE.key };
  function get(q) { return fetch(URL0 + q, { headers: H }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }); }
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }
  function em(s) { /* allow only <em> accents in headings */ return esc(s).replace(/&lt;em&gt;/g, "<em class=\"serif-i\">").replace(/&lt;\/em&gt;/g, "</em>"); }
  var page = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
  if (page === "admin") return;

  function ph(ratio, cat, cap, style) {
    return '<div class="ph ' + (ratio || "r-34") + ' ph-frame"' + (style ? ' style="' + style + '"' : "") + '><span class="ph-label"><span class="cat">' + esc(cat || "") + '</span><span>' + esc(cap || "") + "</span></span></div>";
  }
  function media(d) {
    if (d.image_url) return '<div class="ph-frame"><img src="' + esc(d.image_url) + '" alt="' + esc(d.image_alt || d.heading || "") + '" loading="lazy" style="width:100%;display:block"></div>';
    return ph(d.image_ratio, d.image_cat, d.image_caption);
  }
  function btns(list, dark) {
    if (!list || !list.length) return "";
    return '<div class="btn-row">' + list.map(function (b, i) {
      var cls = b.style === "red" ? "btn btn-red" : b.style === "solid" ? "btn btn-solid" : dark ? "btn btn-ghost-light" : "btn";
      return '<a href="' + esc(b.href || "#") + '" class="' + cls + '">' + esc(b.label || "Learn More") + "</a>";
    }).join("") + "</div>";
  }
  function bgClass(d) { return d.bg === "dark" ? " dark" : d.bg === "darker" ? " darker" : d.bg === "paper" ? " paper-bg" : ""; }

  /* ---------------- block templates ---------------- */
  var T = {
    hero: function (d) {
      return '<header class="hero"><div class="hero-media" aria-hidden="true"></div><div class="wrap hero-inner">' +
        '<span class="eyebrow">' + esc(d.eyebrow) + "</span><h1>" + em(d.heading) + "</h1>" +
        '<p class="lede">' + esc(d.lede) + "</p>" + btns(d.buttons, true) +
        '<div class="hero-meta">' + (d.meta || []).map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("") + "</div></div></header>";
    },
    page_hero: function (d) {
      return '<header class="page-hero"><div class="hero-media" aria-hidden="true"></div><div class="wrap">' +
        '<span class="eyebrow on-dark">' + esc(d.eyebrow) + "</span><h1>" + em(d.heading) + "</h1>" +
        '<p class="lede">' + esc(d.lede) + "</p>" + btns(d.buttons, true) + "</div></header>";
    },
    stats: function (d) {
      return '<section class="dark"><div class="wrap"><div class="stats">' + (d.items || []).map(function (s) {
        return '<div class="stat"><div class="num">' + esc(s.num) + '</div><div class="lbl">' + esc(s.label) + "</div></div>";
      }).join("") + "</div></div></section>";
    },
    era_strip: function (d) {
      return '<section class="darker"><div class="wrap"><div class="section-head">' +
        '<span class="eyebrow on-dark">' + esc(d.eyebrow) + '</span><h2 style="color:var(--ivory)">' + em(d.heading) + "</h2></div></div>" +
        '<div class="era-strip" role="list">' + (d.items || []).map(function (e) {
          return '<div class="era" role="listitem"><span class="yr">' + esc(e.yr) + '</span><div class="nm">' + esc(e.nm) + "</div><p>" + esc(e.text) + "</p></div>";
        }).join("") + "</div>" + (d.link_label ? '<div class="wrap" style="margin-top:2.5rem"><a href="' + esc(d.link_href || "#") + '" class="text-link">' + esc(d.link_label) + " →</a></div>" : "") + "</section>";
    },
    split: function (d) {
      var body = '<div class="body"><span class="eyebrow">' + esc(d.eyebrow) + "</span><h2>" + em(d.heading) + "</h2>" +
        (d.paragraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + btns(d.buttons, d.bg === "dark" || d.bg === "darker") + "</div>";
      var img = "<div>" + media(d) + "</div>";
      var inner = d.image_side === "left" ? img + body : body + img;
      return '<section class="' + bgClass(d).trim() + '"><div class="wrap split">' + inner + "</div></section>";
    },
    cards: function (d) {
      return '<section class="' + bgClass(d).trim() + '"><div class="wrap"><div class="section-head">' +
        '<span class="eyebrow">' + esc(d.eyebrow) + "</span><h2>" + em(d.heading) + "</h2>" +
        (d.lede ? '<p class="lede">' + esc(d.lede) + "</p>" : "") + "</div>" +
        '<div class="grid g-' + (d.columns || 3) + '">' + (d.items || []).map(function (c) {
          return '<div class="card">' + (c.idx ? '<span class="idx">' + esc(c.idx) + "</span>" : "") +
            "<h3>" + esc(c.title) + "</h3><p>" + esc(c.text) + "</p>" +
            (c.tags ? '<div style="margin-top:1.4rem">' + c.tags.map(function (t) { return '<span class="tag-pill">' + esc(t) + "</span>"; }).join("") + "</div>" : "") +
            (c.link_label ? '<a href="' + esc(c.link_href || "#") + '" class="text-link">' + esc(c.link_label) + " →</a>" : "") + "</div>";
        }).join("") + "</div>" + btns(d.buttons, d.bg === "dark" || d.bg === "darker") + "</div></section>";
    },
    quote: function (d) {
      return '<section class="' + bgClass(d).trim() + '"><div class="wrap pull-quote"><blockquote>&ldquo;' + esc(d.text) + '&rdquo;</blockquote><cite>' + esc(d.cite) + "</cite></div></section>";
    },
    numlist: function (d) {
      return '<section class="' + bgClass(d).trim() + '"><div class="wrap split" style="align-items:start"><div class="body">' +
        '<span class="eyebrow">' + esc(d.eyebrow) + "</span><h2>" + em(d.heading) + "</h2>" +
        (d.paragraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div><div><ol class=\"num-list\">" +
        (d.items || []).map(function (i) { return "<li><div><strong>" + esc(i.title) + "</strong><p>" + esc(i.text) + "</p></div></li>"; }).join("") +
        "</ol></div></div></section>";
    },
    faq: function (d) {
      var uid = "faq" + Math.random().toString(36).slice(2, 7);
      return '<section class="' + bgClass(d).trim() + '"><div class="wrap"><div class="section-head">' +
        '<span class="eyebrow">' + esc(d.eyebrow) + "</span><h2>" + em(d.heading) + "</h2></div>" +
        '<div class="accordion">' + (d.items || []).map(function (f, i) {
          var id = uid + i;
          return '<div class="acc-item"><button class="acc-btn" aria-expanded="false" aria-controls="' + id + '">' + esc(f.q) + '<span class="ico">+</span></button>' +
            '<div class="acc-panel" id="' + id + '"><div class="inner">' + esc(f.a) + "</div></div></div>";
        }).join("") + "</div></div></section>";
    },
    timeline: function (d) {
      return '<section class="' + bgClass(d).trim() + '"><div class="wrap"><div class="section-head center">' +
        '<span class="eyebrow">' + esc(d.eyebrow) + "</span><h2>" + em(d.heading) + "</h2></div>" +
        '<div class="timeline">' + (d.items || []).map(function (m) {
          return '<div class="tl-item"><span class="yr">' + esc(m.yr) + "</span><h3>" + esc(m.title) + "</h3><p>" + esc(m.text) + "</p>" +
            (m.tag ? '<span class="era-tag">' + esc(m.tag) + "</span>" : "") + "</div>";
        }).join("") + "</div>" + btns(d.buttons, false) + "</div></section>";
    },
    cta: function (d) {
      return '<section class="darker cta-band"><div class="wrap">' +
        (d.eyebrow ? '<span class="eyebrow on-dark">' + esc(d.eyebrow) + "</span>" : "") +
        '<h2 style="color:var(--ivory)">' + em(d.heading) + "</h2>" +
        (d.lede ? '<p class="lede" style="color:#a9a291">' + esc(d.lede) + "</p>" : "") + btns(d.buttons, true) + "</div></section>";
    },
    richtext: function (d) {
      return '<section class="' + bgClass(d).trim() + '"><div class="wrap"><div class="section-head">' +
        (d.eyebrow ? '<span class="eyebrow">' + esc(d.eyebrow) + "</span>" : "") +
        (d.heading ? "<h2>" + em(d.heading) + "</h2>" : "") + "</div>" +
        '<div style="max-width:68ch">' + (d.paragraphs || []).map(function (p) { return '<p style="margin-bottom:1rem">' + esc(p) + "</p>"; }).join("") + "</div></div></section>";
    },
    system: function (d) { return systemBlock(d); }
  };

  /* ---------------- system blocks (dynamic collections) ---------------- */
  var CAT_LABEL = { portrait: "Portrait", industrial: "Industrial", editorial: "Editorial", studio: "Studio", advertising: "Advertising", legacy: "Legacy" };
  var CAT_SLUG = { "Darkroom Stories": "darkroom", "Studio Lighting": "lighting", "Portraiture": "portrait", "Career Lessons": "career", "Field Notes": "field" };

  function systemBlock(d) {
    var c = d.component;
    if (c === "portfolio_grid") {
      return '<section data-filter-scope data-sys="portfolio"><div class="wrap">' +
        '<div class="filter-bar"><span class="filter-group-label">Category</span><button class="filter-btn active" data-facet="cat" data-value="all">All</button>' +
        Object.keys(CAT_LABEL).map(function (k) { return '<button class="filter-btn" data-facet="cat" data-value="' + k + '">' + CAT_LABEL[k] + "</button>"; }).join("") + "</div>" +
        '<div class="filter-bar"><span class="filter-group-label">Era</span><button class="filter-btn active" data-facet="era" data-value="all">All</button><button class="filter-btn" data-facet="era" data-value="film">Film Era</button><button class="filter-btn" data-facet="era" data-value="digital">Digital Era</button></div>' +
        '<div class="masonry" data-sys-grid style="margin-top:2rem"></div><div class="empty-state">Nothing matches these filters.</div></div></section>';
    }
    if (c === "journal_list") {
      return '<section data-filter-scope data-sys="journal"><div class="wrap">' +
        '<div class="filter-bar"><button class="filter-btn active" data-facet="cat" data-value="all">All</button>' +
        Object.keys(CAT_SLUG).map(function (k) { return '<button class="filter-btn" data-facet="cat" data-value="' + CAT_SLUG[k] + '">' + k + "</button>"; }).join("") + "</div>" +
        '<div data-sys-list style="margin-top:1.5rem"></div><div class="empty-state">No articles in this category yet.</div></div></section>';
    }
    if (c === "testimonials") {
      return '<section class="dark" data-sys="testimonials"><div class="wrap"><div class="section-head">' +
        '<span class="eyebrow">' + esc(d.eyebrow || "Kind Words") + "</span><h2>" + em(d.heading || "What Clients & Students Say") + "</h2></div>" +
        '<div class="grid g-2" data-sys-list></div></div></section>';
    }
    if (c === "contact_form" || c === "mentorship_form") {
      return '<section class="' + (c === "mentorship_form" ? "paper-bg" : "") + '" id="' + (c === "mentorship_form" ? "apply" : "enquire") + '" data-sys="' + c + '"><div class="wrap">' +
        '<div class="section-head"><span class="eyebrow">' + esc(d.eyebrow || (c === "contact_form" ? "Contact" : "Application")) + "</span>" +
        "<h2>" + em(d.heading || (c === "contact_form" ? "Enquiry Form" : "Apply for Mentorship")) + "</h2>" +
        (d.lede ? '<p class="lede">' + esc(d.lede) + "</p>" : "") + "</div>" +
        '<div data-sys-form></div></div></section>';
    }
    return "";
  }

  function fillSystemBlocks(root) {
    root.querySelectorAll('[data-sys="portfolio"]').forEach(function (sec) {
      get("portfolio_items?published=eq.true&select=*&order=created_at.desc").then(function (rows) {
        var grid = sec.querySelector("[data-sys-grid]");
        grid.innerHTML = rows.map(function (p) {
          var label = CAT_LABEL[p.category] || p.category;
          var m = p.image_url
            ? '<div class="ph-frame"><img src="' + esc(p.image_url) + '" alt="' + esc(p.title) + '" loading="lazy" style="width:100%;display:block"></div>'
            : ph(p.ratio, label, p.caption);
          return '<button class="work" data-item data-cat="' + esc(p.category) + '" data-era="' + esc(p.era) + '" data-title="' + esc(p.title) + '" data-meta="' + esc(label + (p.caption ? " · " + p.caption : "")) + '" data-img="' + esc(p.image_url || "") + '">' + m +
            '<div class="meta"><span class="t">' + esc(p.title) + '</span><span class="y">' + esc(label) + "</span></div></button>";
        }).join("") || '<p style="color:var(--muted)">Portfolio items appear here once published in the admin panel.</p>';
        bindFilters(sec); bindLightbox(root);
      });
    });
    root.querySelectorAll('[data-sys="journal"]').forEach(function (sec) {
      get("journal_posts?published=eq.true&select=*&order=created_at.desc").then(function (rows) {
        var list = sec.querySelector("[data-sys-list]");
        list.innerHTML = rows.map(function (p, i) {
          var slug = CAT_SLUG[p.category] || "field";
          var paras = (p.body || "").split(/\n\s*\n/).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
          return '<article class="article-card" data-item data-cat="' + slug + '"><span class="cat">' + esc(p.category) + "</span>" +
            '<div><h3><button data-article-toggle="dynart' + i + '" aria-expanded="false">' + esc(p.title) + "</button></h3>" +
            '<p class="excerpt">' + esc(p.excerpt || "") + '</p></div><span class="rt">' + esc(p.read_time || "") + "</span>" +
            '<div class="article-body" id="dynart' + i + '"><div class="inner">' + paras + "</div></div></article>";
        }).join("") || '<p style="color:var(--muted)">Journal posts appear here once published in the admin panel.</p>';
        bindToggles(sec); bindFilters(sec);
      });
    });
    root.querySelectorAll('[data-sys="testimonials"]').forEach(function (sec) {
      get("testimonials?published=eq.true&select=*&order=created_at.desc").then(function (rows) {
        if (!rows.length) { sec.remove(); return; }
        sec.querySelector("[data-sys-list]").innerHTML = rows.map(function (t) {
          return '<div class="card"><p style="font-family:var(--font-display);font-style:italic;font-size:1.15rem;line-height:1.5">&ldquo;' + esc(t.quote) + '&rdquo;</p>' +
            '<p style="margin-top:1.2rem;font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:#8d8676">' + esc(t.name) + (t.role ? " · " + esc(t.role) : "") + "</p></div>";
        }).join("");
      });
    });
    root.querySelectorAll('[data-sys="contact_form"] [data-sys-form]').forEach(function (host) { buildForm(host, "contact"); });
    root.querySelectorAll('[data-sys="mentorship_form"] [data-sys-form]').forEach(function (host) { buildForm(host, "mentorship"); });
  }

  /* ---------------- dynamic forms ---------------- */
  function fieldHtml(f) {
    var req = f.required ? ' <span class="req">*</span>' : "";
    var id = "df-" + f.field_key;
    var inner;
    if (f.type === "textarea") inner = '<textarea id="' + id + '"' + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "") + "></textarea>";
    else if (f.type === "select") inner = '<select id="' + id + '"><option value="">Select…</option>' + (f.options || []).map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("") + "</select>";
    else if (f.type === "checkbox") {
      return '<div class="field full check-row" data-fkey="' + esc(f.field_key) + '" data-req="' + (f.required ? 1 : 0) + '"><input id="' + id + '" type="checkbox"><label for="' + id + '">' + esc(f.label) + req + '</label><span class="err">This is required.</span></div>';
    }
    else inner = '<input id="' + id + '" type="' + esc(f.type || "text") + '"' + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "") + ">";
    var full = f.type === "textarea" || f.width === "full" ? " full" : "";
    return '<div class="field' + full + '" data-fkey="' + esc(f.field_key) + '" data-req="' + (f.required ? 1 : 0) + '"' +
      (f.show_if && f.show_if.field ? " data-showif='" + JSON.stringify(f.show_if).replace(/'/g, "&#39;") + "'" : "") + ">" +
      '<label for="' + id + '">' + esc(f.label) + req + "</label>" + inner + '<span class="err">Please complete this field.</span></div>';
  }

  function buildForm(host, formKey) {
    get("form_fields?form=eq." + formKey + "&visible=eq.true&select=*&order=sort").then(function (fields) {
      if (!fields.length) { host.innerHTML = '<p style="color:var(--muted)">Form fields appear here once configured in the admin panel.</p>'; return; }
      var steps = {};
      fields.forEach(function (f) { var s = f.step || 1; (steps[s] = steps[s] || []).push(f); });
      var stepKeys = Object.keys(steps).sort();
      var multi = formKey === "mentorship" && stepKeys.length > 1;
      var html = '<form class="form-shell" novalidate>';
      if (multi) html += '<div class="steps-bar" aria-hidden="true">' + stepKeys.map(function (_, i) { return '<div class="step-dot' + (i === 0 ? " done" : "") + '"></div>'; }).join("") + "</div>";
      stepKeys.forEach(function (s, i) {
        html += multi ? '<div class="form-step' + (i === 0 ? " active" : "") + '"><p class="step-label">Step ' + (i + 1) + " of " + stepKeys.length + '</p>' : "<div>";
        html += '<div class="form-grid">' + steps[s].map(fieldHtml).join("") + "</div>";
        if (multi) {
          html += '<div class="btn-row">' + (i > 0 ? '<button type="button" class="btn" data-prev>Back</button>' : "") +
            (i < stepKeys.length - 1 ? '<button type="button" class="btn btn-solid" data-next>Continue</button>' : '<button type="submit" class="btn btn-red">Submit Application</button>') + "</div>";
        } else if (i === stepKeys.length - 1) {
          html += '<div class="btn-row"><button type="submit" class="btn btn-red">' + (formKey === "contact" ? "Send Enquiry" : "Submit") + "</button></div>";
        }
        html += "</div>";
      });
      html += "</form><div class=\"form-success\" role=\"status\"><div class=\"mark\">✳</div><h3>Received</h3><p>Thank you. Your message will be reviewed and answered personally.</p></div>";
      host.innerHTML = html;
      var form = host.querySelector("form");
      var success = host.querySelector(".form-success");

      function visibleFields() {
        return Array.prototype.filter.call(form.querySelectorAll(".field"), function (f) { return f.offsetParent !== null || f.style.display !== "none"; });
      }
      function fieldValue(f) {
        var inp = f.querySelector("input,select,textarea");
        if (!inp) return "";
        return inp.type === "checkbox" ? (inp.checked ? "yes" : "") : inp.value.trim();
      }
      function validate(f) {
        var ok = true;
        if (f.getAttribute("data-req") === "1" && f.style.display !== "none") ok = fieldValue(f) !== "";
        var inp = f.querySelector("input");
        if (ok && inp && inp.type === "email" && inp.value.trim()) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
        f.classList.toggle("invalid", !ok);
        return ok;
      }
      function applyConditions() {
        form.querySelectorAll("[data-showif]").forEach(function (f) {
          try {
            var cond = JSON.parse(f.getAttribute("data-showif"));
            var src = form.querySelector('[data-fkey="' + cond.field + '"] select, [data-fkey="' + cond.field + '"] input');
            var show = src && (cond.values || []).indexOf(src.value) !== -1;
            f.style.display = show ? "" : "none";
          } catch (e) {}
        });
      }
      form.addEventListener("change", applyConditions);
      applyConditions();

      /* steps */
      var stepEls = form.querySelectorAll(".form-step");
      var dots = form.querySelectorAll(".step-dot");
      var cur = 0;
      function showStep(i) {
        stepEls.forEach(function (s, k) { s.classList.toggle("active", k === i); });
        dots.forEach(function (d, k) { d.classList.toggle("done", k <= i); });
        cur = i;
      }
      function stepOk(i) {
        var scope = stepEls.length ? stepEls[i] : form;
        var ok = true;
        scope.querySelectorAll(".field").forEach(function (f) { if (!validate(f)) ok = false; });
        return ok;
      }
      form.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { if (stepOk(cur)) showStep(Math.min(cur + 1, stepEls.length - 1)); }); });
      form.querySelectorAll("[data-prev]").forEach(function (b) { b.addEventListener("click", function () { showStep(Math.max(cur - 1, 0)); }); });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!stepOk(stepEls.length ? cur : 0)) return;
        var data = {};
        form.querySelectorAll(".field").forEach(function (f) {
          if (f.style.display === "none") return;
          var val = fieldValue(f);
          if (val) data[f.getAttribute("data-fkey")] = val;
        });
        var btn = form.querySelector('button[type="submit"]');
        btn.disabled = true; var orig = btn.textContent; btn.textContent = "Sending…";
        fetch(URL0 + "form_submissions", {
          method: "POST",
          headers: { apikey: H.apikey, Authorization: H.Authorization, "Content-Type": "application/json", Prefer: "return=minimal" },
          body: JSON.stringify({ form: formKey, data: data })
        }).then(function (r) {
          if (!r.ok) throw 0;
          if (window.SK_NOTIFY_EMAIL) {
            var flat = { _subject: "New " + formKey + " submission — " + (data.name || "website") , _template: "table" };
            for (var k in data) flat[k] = data[k];
            fetch("https://formsubmit.co/ajax/" + window.SK_NOTIFY_EMAIL, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(flat) }).catch(function () {});
          }
          form.style.display = "none";
          success.classList.add("show");
          success.scrollIntoView({ block: "center" });
        }).catch(function () {
          btn.disabled = false; btn.textContent = orig;
          var errEl = form.querySelector(".submit-err");
          if (!errEl) { errEl = document.createElement("p"); errEl.className = "submit-err"; errEl.style.cssText = "color:#a83a2c;font-size:.85rem;margin-top:1rem"; form.appendChild(errEl); }
          errEl.textContent = "Something went wrong. Please try again.";
        });
      });
    });
  }

  /* ---------------- behaviour binders (for rendered content) ---------------- */
  function bindToggles(root) {
    root.querySelectorAll("[data-article-toggle]").forEach(function (btn) {
      if (btn._bound) return; btn._bound = 1;
      btn.addEventListener("click", function () {
        var body = document.getElementById(btn.getAttribute("data-article-toggle"));
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        body.style.maxHeight = open ? "0px" : body.scrollHeight + "px";
      });
    });
    root.querySelectorAll(".acc-btn").forEach(function (btn) {
      if (btn._bound) return; btn._bound = 1;
      btn.addEventListener("click", function () {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
      });
    });
  }
  function bindFilters(scope) {
    var facets = {};
    function apply() {
      var visible = 0;
      scope.querySelectorAll("[data-item]").forEach(function (item) {
        var show = Object.keys(facets).every(function (f) {
          var val = facets[f];
          if (!val || val === "all") return true;
          return (item.getAttribute("data-" + f) || "").split(" ").indexOf(val) !== -1;
        });
        item.classList.toggle("hidden", !show);
        if (show) visible++;
      });
      var empty = scope.querySelector(".empty-state");
      if (empty) empty.classList.toggle("show", visible === 0);
    }
    scope.querySelectorAll(".filter-btn").forEach(function (btn) {
      if (btn._bound) return; btn._bound = 1;
      var facet = btn.getAttribute("data-facet");
      if (btn.classList.contains("active")) facets[facet] = btn.getAttribute("data-value");
      btn.addEventListener("click", function () {
        scope.querySelectorAll('.filter-btn[data-facet="' + facet + '"]').forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        facets[facet] = btn.getAttribute("data-value");
        apply();
      });
    });
    apply();
  }
  function bindLightbox(root) {
    var lb = document.getElementById("lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lightbox"; lb.id = "lightbox";
      lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
      lb.innerHTML = '<button class="lb-close" aria-label="Close">✕</button><button class="lb-prev" aria-label="Previous">←</button><button class="lb-next" aria-label="Next">→</button><div class="lb-inner"><div class="ph r-32 ph-frame"><span class="ph-label"><span class="cat">Preview</span><span></span></span></div><div class="lb-cap"><span class="t lb-t"></span><span class="lb-m"></span></div></div>';
      document.body.appendChild(lb);
    }
    if (lb._bound) { lb._works = Array.prototype.slice.call(root.querySelectorAll(".work")); rebind(); return; }
    lb._bound = 1;
    lb._works = Array.prototype.slice.call(root.querySelectorAll(".work"));
    var idx = 0;
    function openLb(i) {
      var works = lb._works;
      if (!works.length) return;
      idx = (i + works.length) % works.length;
      var w = works[idx];
      var img = w.getAttribute("data-img");
      var box = lb.querySelector(".lb-inner").children[0];
      if (img) box.outerHTML = '<div class="ph-frame"><img src="' + esc(img) + '" alt="' + esc(w.getAttribute("data-title")) + '" style="width:100%;max-height:70vh;object-fit:contain;display:block"></div>';
      else {
        var p = w.querySelector(".ph");
        box.outerHTML = '<div class="' + p.className + '"><span class="ph-label"><span class="cat">Preview</span><span></span></span></div>';
      }
      lb.querySelector(".lb-t").textContent = w.getAttribute("data-title") || "";
      lb.querySelector(".lb-m").textContent = w.getAttribute("data-meta") || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeLb() { lb.classList.remove("open"); document.body.style.overflow = ""; }
    function rebind() {
      lb._works.forEach(function (w, i) {
        if (w._lbBound) return; w._lbBound = 1;
        w.addEventListener("click", function () { openLb(i); });
      });
    }
    rebind();
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
    lb._rebind = rebind;
  }
  function bindCounters(root) {
    root.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      el.textContent = target + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------------- page assembly ---------------- */
  get("page_sections?page=eq." + page + "&visible=eq.true&select=*&order=sort").then(function (rows) {
    if (!rows.length) { patchStaticForms(); return; }
    var main = document.getElementById("main");
    if (!main) return;
    main.innerHTML = rows.map(function (r) {
      var fn = T[r.kind];
      if (!fn) return "";
      try { return fn(r.data || {}); } catch (e) { return ""; }
    }).join("");
    bindToggles(main);
    bindCounters(main);
    fillSystemBlocks(main);
    main.querySelectorAll("[data-filter-scope]").forEach(function (s) { if (!s.getAttribute("data-sys")) bindFilters(s); });
  });

  /* even without page blocks, dynamic form definitions replace static forms */
  function patchStaticForms() {
    get("form_fields?select=form&limit=1").then(function (probe) {
      if (!probe.length) return;
      var cf = document.querySelector("form[data-simple-form]");
      if (cf && page === "contact") { var host = document.createElement("div"); cf.parentNode.insertBefore(host, cf); cf.remove(); var suc = document.getElementById("contact-success"); if (suc) suc.remove(); buildForm(host, "contact"); }
      var mf = document.querySelector("form[data-multistep]");
      if (mf && page === "mentorship") { var host2 = document.createElement("div"); mf.parentNode.insertBefore(host2, mf); mf.remove(); var suc2 = document.getElementById("apply-success"); if (suc2) suc2.remove(); buildForm(host2, "mentorship"); }
    });
  }
})();
