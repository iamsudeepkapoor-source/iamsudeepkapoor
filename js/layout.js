/* Shared nav + footer markup, injected during parse. v2: rich hover flyouts (CMS-editable). */
var SK_NAV = '\
<a class="skip-link" href="#main">Skip to content</a>\
<nav class="site-nav" aria-label="Main navigation">\
  <div class="wrap nav-inner">\
    <a href="index.html" class="nav-logo" aria-label="Sudeep Kapoor — home">\
      <span class="name">Sudeep Kapoor</span>\
      <span class="tag">41+ Years Behind the Lens</span>\
    </a>\
    <ul class="nav-links" id="nav-links">\
      <li data-fly="about"><a href="about.html">About</a></li>\
      <li><a href="journey.html">Journey</a></li>\
      <li data-fly="portfolio"><a href="portfolio.html">Portfolio</a></li>\
      <li><a href="archive.html">Archive</a></li>\
      <li data-fly="services"><a href="services.html">Services</a></li>\
      <li data-fly="mentorship"><a href="mentorship.html">Mentorship</a></li>\
      <li><a href="journal.html">Journal</a></li>\
      <li><a href="speaking.html">Speaking</a></li>\
      <li><a href="contact.html">Contact</a></li>\
    </ul>\
    <a href="contact.html" class="nav-cta">Enquire</a>\
    <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">\
      <span></span><span></span><span></span>\
    </button>\
  </div>\
</nav>';

var SK_FOOTER = '\
<footer class="site-footer">\
  <div class="wrap">\
    <div class="footer-grid">\
      <div class="brand">\
        <div class="name">Sudeep Kapoor</div>\
        <div class="tag">41+ Years Behind the Lens</div>\
        <p>Master photographer, mentor and visual storyteller. Studio Chaya Kriti, South Extension Part II, New Delhi — since 1992.</p>\
      </div>\
      <div>\
        <h4>Explore</h4>\
        <ul>\
          <li><a href="about.html">About</a></li>\
          <li><a href="journey.html">The Journey</a></li>\
          <li><a href="portfolio.html">Portfolio</a></li>\
          <li><a href="archive.html">Visual Archive</a></li>\
          <li><a href="journal.html">Journal</a></li>\
        </ul>\
      </div>\
      <div>\
        <h4>Work Together</h4>\
        <ul>\
          <li><a href="services.html">Services</a></li>\
          <li><a href="mentorship.html">Mentorship</a></li>\
          <li><a href="speaking.html">Speaking</a></li>\
          <li><a href="contact.html">Contact</a></li>\
        </ul>\
      </div>\
      <div>\
        <h4>Studio</h4>\
        <ul>\
          <li>Chaya Kriti</li>\
          <li>South Extension Part II</li>\
          <li>New Delhi, India</li>\
          <li><a href="contact.html">Enquiries →</a></li>\
        </ul>\
      </div>\
    </div>\
    <div class="footer-bottom">\
      <span>© Sudeep Kapoor. All photographs are the copyright of the photographer.</span>\
      <span>From Darkroom to Digital</span>\
    </div>\
  </div>\
</footer>';

/* ----- default flyout content (overridden by CMS nav_flyouts rows) ----- */
var SK_FLYOUTS = {
  about: {
    eyebrow: "The Photographer",
    desc: "Forty-one years of seeing — from darkroom chemistry to the AI era.",
    links: [["The Story", "about.html"], ["Career Timeline", "journey.html"], ["Speaking & Lectures", "speaking.html"], ["The Journal", "journal.html"]]
  },
  portfolio: {
    eyebrow: "The Work",
    desc: "Portraits, industry, editorial and studio work across four decades.",
    links: [["Selected Portfolio", "portfolio.html"], ["Visual Archive", "archive.html"], ["The Lawyers of India", "portfolio.html"], ["Signature Stories", "journey.html"]]
  },
  services: {
    eyebrow: "Commissioned Work",
    desc: "In studio at Chaya Kriti, on location in Delhi, or anywhere in India.",
    links: [["Portraits & People", "services.html#portraits"], ["Industrial & Corporate", "services.html#industrial"], ["Editorial & Books", "services.html#editorial"], ["Start an Enquiry", "contact.html"]]
  },
  mentorship: {
    eyebrow: "Learn",
    desc: "Direct mentorship from a photographer who lived photography's evolution.",
    links: [["All Programs", "mentorship.html#programs"], ["Portfolio Review", "mentorship.html#programs"], ["Darkroom to Digital", "mentorship.html#programs"], ["Apply Now", "mentorship.html#apply"]]
  }
};

function SK_buildFlyouts(data) {
  document.querySelectorAll(".nav-links > li[data-fly]").forEach(function (li) {
    var key = li.getAttribute("data-fly");
    var f = data[key];
    var old = li.querySelector(".flyout");
    if (old) old.remove();
    if (!f) return;
    var el = document.createElement("div");
    el.className = "flyout" + (key === "mentorship" || key === "services" ? " f-right" : "");
    var links = (f.links || []).map(function (l) {
      return '<a href="' + l[1] + '">' + l[0] + "</a>";
    }).join("");
    el.innerHTML = '<span class="f-eyebrow">' + (f.eyebrow || "") + '</span><p class="f-desc">' + (f.desc || "") + '</p><div class="f-links">' + links + "</div>";
    li.appendChild(el);
  });
}

/* apply defaults immediately after nav exists, then CMS overrides */
document.addEventListener("DOMContentLoaded", function () {
  SK_buildFlyouts(SK_FLYOUTS);
  if (!window.SK_SUPABASE) return;
  fetch(window.SK_SUPABASE.url + "/rest/v1/nav_flyouts?visible=eq.true&select=*&order=sort", {
    headers: { apikey: window.SK_SUPABASE.key, Authorization: "Bearer " + window.SK_SUPABASE.key }
  }).then(function (r) { return r.ok ? r.json() : []; }).then(function (rows) {
    if (!rows.length) return;
    var data = {};
    rows.forEach(function (row) {
      data[row.nav_key] = { eyebrow: row.eyebrow, desc: row.description, links: (row.links || []).map(function (l) { return [l.label, l.href]; }) };
    });
    /* keys not present in CMS keep their defaults */
    for (var k in SK_FLYOUTS) if (!data[k]) data[k] = SK_FLYOUTS[k];
    SK_buildFlyouts(data);
  }).catch(function () {});
});
