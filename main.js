(function () {
  // Année du footer
  document.getElementById("y").textContent = new Date().getFullYear();

  // Graduations de la jauge
  var ticks = document.querySelector(".gauge__ticks");
  if (ticks) {
    for (var i = 0; i <= 10; i++) {
      var a = (-215 + i * 25) * Math.PI / 180;
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", 100 + Math.cos(a) * 62);
      line.setAttribute("y1", 100 + Math.sin(a) * 62);
      line.setAttribute("x2", 100 + Math.cos(a) * 54);
      line.setAttribute("y2", 100 + Math.sin(a) * 54);
      ticks.appendChild(line);
    }
  }

  // Menu mobile
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu");
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Bordure de la nav au scroll
  var nav = document.querySelector(".nav");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Apparition au scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 70 + "ms"; io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Jour courant + statut "ouvert" (heure de Bruxelles)
  // Créneaux indicatifs : midi 12h-14h30, soir 18h30-22h — à ajuster.
  var LUNCH = [12 * 60, 14 * 60 + 30], DINNER = [18 * 60 + 30, 22 * 60];
  var SCHEDULE = { 3: [LUNCH, DINNER], 4: [LUNCH, DINNER], 5: [LUNCH, DINNER], 6: [LUNCH] };
  var parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
  }).formatToParts(new Date());
  var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
  var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  var mins = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);

  var row = document.querySelector('.hours tr[data-day="' + day + '"]');
  if (row) row.classList.add("is-today");

  var open = (SCHEDULE[day] || []).some(function (s) { return mins >= s[0] && mins < s[1]; });
  var status = document.getElementById("status");
  document.getElementById("status-text").textContent = open
    ? "Ouvert maintenant · Floreffe"
    : "Fermé pour le moment · Mer–Sam";
  status.classList.toggle("is-open", open);
})();
