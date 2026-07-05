/* Welcome overlay + camera-shutter transition. Settings editable in /admin (Welcome tab). */
(function () {
  "use strict";
  var DEFAULTS = {
    welcome_enabled: "true",
    welcome_frequency: "session", /* session | once | always */
    welcome_eyebrow: "Sudeep Kapoor · Master Photographer",
    welcome_headline: "41+ Years <em>Behind the Lens</em>",
    welcome_sub: "From darkroom chemicals to digital pixels. From controlled studios to underground coal mines. A living archive of Indian photography.",
    welcome_cta: "Enter the Archive",
    welcome_image_url: "",
    welcome_sound: "true",
    welcome_sound_url: "assets/shutter.wav"
  };
  var KEY = "sk_welcomed";

  function shouldShow(cfg) {
    if (cfg.welcome_enabled !== "true") return false;
    if (cfg.welcome_frequency === "always") return true;
    if (cfg.welcome_frequency === "once") { try { return !localStorage.getItem(KEY); } catch (e) { return true; } }
    try { return !sessionStorage.getItem(KEY); } catch (e) { return true; }
  }
  function markShown(cfg) {
    try {
      if (cfg.welcome_frequency === "once") localStorage.setItem(KEY, "1");
      else sessionStorage.setItem(KEY, "1");
    } catch (e) {}
  }

  /* ----- shutter iris ----- */
  function buildShutter() {
    var el = document.createElement("div");
    el.className = "shutter";
    el.setAttribute("aria-hidden", "true");
    var blades = "";
    for (var i = 0; i < 8; i++) {
      blades += '<polygon class="blade" points="50,54 8,-30 92,-30" style="transform:rotate(' + (i * 45) + 'deg) translateY(-78px);transition:transform .5s cubic-bezier(.6,.05,.35,1)"/>';
    }
    el.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">' + blades + "</svg>";
    document.body.appendChild(el);
    return el;
  }
  function shutterSequence(onClosed) {
    var sh = buildShutter();
    var blades = sh.querySelectorAll(".blade");
    sh.classList.add("active");
    /* force layout so the open state is committed before transition */
    void sh.offsetWidth;
    blades.forEach(function (b, i) {
      b.style.transform = "rotate(" + (i * 45 + 14) + "deg) translateY(0px)";
    });
    setTimeout(function () {
      if (onClosed) onClosed();
      setTimeout(function () {
        blades.forEach(function (b, i) {
          b.style.transform = "rotate(" + (i * 45) + "deg) translateY(-78px)";
        });
        setTimeout(function () { sh.remove(); }, 560);
      }, 180);
    }, 520);
  }

  function playSound(cfg) {
    if (cfg.welcome_sound !== "true") return;
    try {
      var a = new Audio(cfg.welcome_sound_url || DEFAULTS.welcome_sound_url);
      a.volume = 0.85;
      a.play().catch(function () {});
    } catch (e) {}
  }

  /* ----- overlay ----- */
  function build(cfg) {
    var w = document.createElement("div");
    w.className = "welcome";
    w.setAttribute("role", "dialog");
    w.setAttribute("aria-label", "Welcome");
    var img = cfg.welcome_image_url ? '<img src="' + cfg.welcome_image_url.replace(/"/g, "&quot;") + '" alt="">' : "";
    w.innerHTML =
      '<div class="w-media">' + img + "</div>" +
      '<div class="w-inner">' +
      '<div class="w-rule w-in"></div>' +
      '<span class="w-eyebrow w-in d1" id="wk-eyebrow"></span>' +
      '<h1 class="w-in d1" id="wk-headline"></h1>' +
      '<p class="w-sub w-in d2" id="wk-sub"></p>' +
      '<button class="w-cta w-in d3" id="wk-cta" type="button">' +
      '<svg class="aperture-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M14 12 8.5 3.4M16.2 15.5H6M14.2 20.6 9.9 12M12 22l4.3-8.6M4 8.5h10.2M7.8 3.4l4.4 8.6"/></svg>' +
      '<span id="wk-cta-label"></span></button>' +
      "</div>" +
      '<div class="w-foot">Chaya Kriti · New Delhi · Est. 1992</div>';
    document.body.appendChild(w);
    document.body.style.overflow = "hidden";
    apply(cfg);
    document.getElementById("wk-cta").addEventListener("click", function () {
      playSound(cfg);
      markShown(cfg);
      shutterSequence(function () {
        w.remove();
        document.body.style.overflow = "";
        window.scrollTo(0, 0);
      });
    });
    return w;
  }
  function apply(cfg) {
    document.getElementById("wk-eyebrow").textContent = cfg.welcome_eyebrow;
    /* headline supports <em> for the gold italic accent */
    document.getElementById("wk-headline").innerHTML = String(cfg.welcome_headline).replace(/<(?!\/?em>)[^>]*>/g, "");
    document.getElementById("wk-sub").textContent = cfg.welcome_sub;
    document.getElementById("wk-cta-label").textContent = cfg.welcome_cta;
  }

  var cfg = {};
  for (var k in DEFAULTS) cfg[k] = DEFAULTS[k];

  if (!shouldShow(cfg)) { fetchSettings(null); return; }
  var overlay = build(cfg);
  fetchSettings(overlay);

  function fetchSettings(overlayEl) {
    if (!window.SK_SUPABASE) return;
    fetch(window.SK_SUPABASE.url + "/rest/v1/site_settings?select=*", {
      headers: { apikey: window.SK_SUPABASE.key, Authorization: "Bearer " + window.SK_SUPABASE.key }
    }).then(function (r) { return r.ok ? r.json() : []; }).then(function (rows) {
      rows.forEach(function (s) { if (s.key in cfg && s.value !== null && s.value !== "") cfg[s.key] = s.value; });
      if (!overlayEl) return;
      if (cfg.welcome_enabled !== "true") {
        overlayEl.remove();
        document.body.style.overflow = "";
        return;
      }
      apply(cfg);
      var media = overlayEl.querySelector(".w-media");
      if (cfg.welcome_image_url && !media.querySelector("img")) {
        var im = document.createElement("img");
        im.src = cfg.welcome_image_url; im.alt = "";
        media.appendChild(im);
      }
    }).catch(function () {});
  }
})();
