/* Sudeep Kapoor — shared site behaviour */
(function () {
  "use strict";
  var nav = document.querySelector(".site-nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  var burger = document.querySelector(".hamburger");
  var links = document.getElementById("nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === here) a.classList.add("active");
  });
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".animate").forEach(function (el) {
    observer.observe(el);
  });
  var counterObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        counterObs.unobserve(el);
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1400, start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll("[data-count]").forEach(function (el) {
    counterObs.observe(el);
  });
  document.querySelectorAll(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });
  document.querySelectorAll("[data-article-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var body = document.getElementById(btn.getAttribute("data-article-toggle"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      body.style.maxHeight = open ? "0px" : body.scrollHeight + "px";
    });
  });
  document.querySelectorAll("[data-filter-scope]").forEach(function (scope) {
    var facets = {};
    var items = scope.querySelectorAll("[data-item]");
    var empty = scope.querySelector(".empty-state");
    function apply() {
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
        scope
          .querySelectorAll('.filter-btn[data-facet="' + facet + '"]')
          .forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        facets[facet] = btn.getAttribute("data-value");
        apply();
      });
    });
    apply();
  });
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbPh = lb.querySelector(".ph");
    var lbTitle = lb.querySelector(".lb-t");
    var lbMeta = lb.querySelector(".lb-m");
    var works = Array.prototype.slice.call(document.querySelectorAll(".work"));
    var idx = 0;
    var lastFocus = null;
    function openLb(i) {
      idx = (i + works.length) % works.length;
      var w = works[idx];
      var ph = w.querySelector(".ph");
      lbPh.className = "ph ph-frame " + (ph.classList.contains("r-34") ? "r-34" : ph.classList.contains("r-169") ? "r-169" : "r-32");
      lbPh.style.cssText = ph.style.cssText;
      var mt = w.querySelector(".meta .t");
      var my = w.querySelector(".meta .y");
      lbTitle.textContent = w.getAttribute("data-title") || (mt ? mt.textContent : "");
      lbMeta.textContent = w.getAttribute("data-meta") || (my ? my.textContent : "");
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus();
    }
    function closeLb() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    works.forEach(function (w, i) {
      w.addEventListener("click", function (e) {
        if (w.tagName === "A") return;
        lastFocus = w; openLb(i);
      });
    });
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
  }

  /* ----- Supabase submission ----- */
  function v(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function showSuccess(form) {
    form.style.display = "none";
    var success = document.getElementById(form.getAttribute("data-success"));
    if (success) { success.classList.add("show"); success.scrollIntoView({ block: "center" }); }
  }
  function showError(form) {
    var err = form.querySelector(".submit-err");
    if (!err) {
      err = document.createElement("p");
      err.className = "submit-err";
      err.style.cssText = "color:#a83a2c;font-size:.85rem;margin-top:1rem";
      err.setAttribute("role", "alert");
      form.appendChild(err);
    }
    err.textContent = "Something went wrong sending your message. Please check your connection and try again.";
  }
  function collectPayload(table) {
    if (table === "enquiries") {
      return {
        name: v("c-name"), email: v("c-email"), phone: v("c-phone"),
        organisation: v("c-org"), enquiry_type: v("enquiry-type"), message: v("c-msg"),
        details: {
          location: v("c-location"), timeline: v("c-timeline"), scope: v("c-scope"),
          sitting: v("c-sitting"), institution: v("c-inst"), format: v("c-format"), level: v("c-level")
        }
      };
    }
    return {
      name: v("ap-name"), email: v("ap-email"), phone: v("ap-phone"),
      city: v("ap-city"), country: v("ap-country"), age_range: v("ap-age"),
      level: v("ap-level"), years_experience: v("ap-years"), camera: v("ap-camera"),
      interest: v("ap-interest"), portfolio_url: v("ap-portfolio"), program: v("ap-program"),
      goals: v("ap-goals"), challenge: v("ap-challenge"), why_sudeep: v("ap-why")
    };
  }
  function notifyEmail(table, payload) {
    if (!window.SK_NOTIFY_EMAIL) return;
    var flat = { _subject: (table === "enquiries" ? "New enquiry: " + (payload.enquiry_type || "") : "New mentorship application: " + (payload.program || "")) + " — " + payload.name, _template: "table" };
    Object.keys(payload).forEach(function (k) {
      var val = payload[k];
      if (val && typeof val === "object") {
        Object.keys(val).forEach(function (k2) { if (val[k2]) flat[k + "_" + k2] = val[k2]; });
      } else if (val) { flat[k] = val; }
    });
    fetch("https://formsubmit.co/ajax/" + window.SK_NOTIFY_EMAIL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(flat)
    }).catch(function () { /* email notification is best-effort; the record is already in the database */ });
  }
  function skSubmit(form) {
    var table = form.getAttribute("data-supabase");
    if (!table || !window.SK_SUPABASE) { showSuccess(form); return; }
    var btn = form.querySelector('button[type="submit"]');
    var orig = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    fetch(window.SK_SUPABASE.url + "/rest/v1/" + table, {
      method: "POST",
      headers: {
        apikey: window.SK_SUPABASE.key,
        Authorization: "Bearer " + window.SK_SUPABASE.key,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(collectPayload(table))
    }).then(function (r) {
      if (r.ok) { notifyEmail(table, collectPayload(table)); showSuccess(form); }
      else { throw new Error("HTTP " + r.status); }
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = orig; }
      showError(form);
    });
  }

  function validateField(field) {
    var input = field.querySelector("input, select, textarea");
    if (!input) return true;
    var ok = true;
    if (input.hasAttribute("required")) {
      if (input.type === "checkbox") ok = input.checked;
      else ok = input.value.trim() !== "";
    }
    if (ok && input.type === "email" && input.value.trim() !== "") {
      ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }
    field.classList.toggle("invalid", !ok);
    return ok;
  }
  document.querySelectorAll("form[data-simple-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll(".field").forEach(function (f) {
        if (!validateField(f)) ok = false;
      });
      if (!ok) {
        var firstInvalid = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      skSubmit(form);
    });
  });
  var msForm = document.querySelector("form[data-multistep]");
  if (msForm) {
    var steps = msForm.querySelectorAll(".form-step");
    var dots = msForm.querySelectorAll(".step-dot");
    var cur = 0;
    function showStep(i) {
      steps.forEach(function (s, k) { s.classList.toggle("active", k === i); });
      dots.forEach(function (d, k) { d.classList.toggle("done", k <= i); });
      cur = i;
    }
    function stepValid(i) {
      var ok = true;
      steps[i].querySelectorAll(".field").forEach(function (f) {
        if (!validateField(f)) ok = false;
      });
      return ok;
    }
    msForm.querySelectorAll("[data-next]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (stepValid(cur)) showStep(Math.min(cur + 1, steps.length - 1));
      });
    });
    msForm.querySelectorAll("[data-prev]").forEach(function (b) {
      b.addEventListener("click", function () { showStep(Math.max(cur - 1, 0)); });
    });
    msForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!stepValid(cur)) return;
      skSubmit(msForm);
    });
    showStep(0);
  }
  var enquirySelect = document.getElementById("enquiry-type");
  if (enquirySelect) {
    var groups = document.querySelectorAll("[data-enquiry-group]");
    var updateGroups = function () {
      var v = enquirySelect.value;
      groups.forEach(function (g) {
        var forTypes = g.getAttribute("data-enquiry-group").split(",");
        g.style.display = forTypes.indexOf(v) !== -1 ? "" : "none";
      });
    };
    enquirySelect.addEventListener("change", updateGroups);
    updateGroups();
  }
})();
