(function () {
  var root = document.documentElement;
  document.getElementById("y").textContent = new Date().getFullYear();

  // Thème clair / sombre
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var current = root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Menu mobile (Échap pour fermer)
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  }
  toggle.addEventListener("click", function () { setMenu(!menu.classList.contains("is-open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });

  // « Aujourd'hui » : uniquement les jours et services réels (pas d'heures inventées)
  var SERVICES = { 3: "Midi et soir", 4: "Midi et soir", 5: "Midi et soir", 6: "Midi" };
  var NAMES = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var wd = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Brussels", weekday: "short" }).format(new Date());
  var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);

  var row = document.querySelector('.hours tr[data-day="' + day + '"]');
  if (row) row.classList.add("is-today");

  var state = document.getElementById("today-state");
  var detail = document.getElementById("today-detail");
  var service = SERVICES[day];
  if (service) {
    state.textContent = "Ouvert ce " + NAMES[day];
    state.classList.add("is-open");
    detail.textContent = service + " · réservation conseillée au 081 45 16 91.";
  } else {
    var next = day;
    do { next = (next + 1) % 7; } while (!SERVICES[next]);
    state.textContent = "Fermé ce " + NAMES[day];
    detail.textContent = "Réouverture " + NAMES[next] + " · " + SERVICES[next].toLowerCase() + ".";
  }

  // Jauge : remplissage selon le service du jour
  var level = service === "Midi et soir" ? 82 : service ? 55 : 18;
  requestAnimationFrame(function () {
    document.getElementById("gauge-arc").style.strokeDashoffset = 100 - level;
  });
})();
