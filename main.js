(function () {
  document.getElementById("y").textContent = new Date().getFullYear();

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

  // Carte complète (boîte de dialogue, accessible par #la-carte)
  var menuDlg = document.getElementById("la-carte");
  var lastFocus = null;
  function openMenu() {
    if (menuDlg.open) return;
    lastFocus = document.activeElement;
    menuDlg.showModal();
    document.body.classList.add("menu-open");
    menuDlg.querySelector(".menu__body").scrollTop = 0;
    if (location.hash !== "#la-carte") history.pushState(null, "", "#la-carte");
  }
  // Nettoyage commun (bouton, fond, Échap, retour arrière)
  function afterClose() {
    if (!document.body.classList.contains("menu-open")) return;
    document.body.classList.remove("menu-open");
    if (location.hash === "#la-carte") history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }
  function closeMenu() { if (menuDlg.open) menuDlg.close(); afterClose(); }
  menuDlg.addEventListener("close", afterClose);
  menuDlg.addEventListener("cancel", function (e) { e.preventDefault(); closeMenu(); });
  document.querySelectorAll("[data-open-menu]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); setMenu(false); openMenu(); });
  });
  menuDlg.querySelector("[data-close-menu]").addEventListener("click", closeMenu);
  // Clic sur le fond assombri = fermer
  menuDlg.addEventListener("click", function (e) { if (e.target === menuDlg) closeMenu(); });
  // Rubriques : défilement interne
  menuDlg.querySelectorAll(".menu__nav a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var t = document.getElementById(a.getAttribute("href").slice(1));
      var body = menuDlg.querySelector(".menu__body");
      body.scrollTo({ top: t.offsetTop - body.offsetTop - 8, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  });
  if (location.hash === "#la-carte") openMenu();
  addEventListener("popstate", function () { location.hash === "#la-carte" ? openMenu() : closeMenu(); });

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

})();
