/* Shared nav + footer markup, injected during parse so it works from file:// and any host */
var SK_NAV = '\
<a class="skip-link" href="#main">Skip to content</a>\
<nav class="site-nav" aria-label="Main navigation">\
  <div class="wrap nav-inner">\
    <a href="index.html" class="nav-logo" aria-label="Sudeep Kapoor — home">\
      <span class="name">Sudeep Kapoor</span>\
      <span class="tag">41+ Years Behind the Lens</span>\
    </a>\
    <ul class="nav-links" id="nav-links">\
      <li><a href="about.html">About</a></li>\
      <li><a href="journey.html">Journey</a></li>\
      <li><a href="portfolio.html">Portfolio</a></li>\
      <li><a href="archive.html">Archive</a></li>\
      <li><a href="services.html">Services</a></li>\
      <li><a href="mentorship.html">Mentorship</a></li>\
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
