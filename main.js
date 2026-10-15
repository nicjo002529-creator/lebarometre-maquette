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
      t.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  });
  if (location.hash === "#la-carte") openMenu();
  addEventListener("popstate", function () { location.hash === "#la-carte" ? openMenu() : closeMenu(); });

  // « Aujourd'hui » : horaires réels, heure de Bruxelles, mis à jour chaque minute
  var LUNCH = [12 * 60, 14 * 60], DINNER = [19 * 60, 21 * 60 + 30];
  var SLOTS = { 3: [LUNCH, DINNER], 4: [LUNCH, DINNER], 5: [LUNCH, DINNER], 6: [LUNCH] };
  var NAMES = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var state = document.getElementById("today-state");
  var detail = document.getElementById("today-detail");

  function fmt(m) { var h = Math.floor(m / 60), mm = m % 60; return h + "h" + (mm ? (mm < 10 ? "0" : "") + mm : ""); }

  function nowInBrussels() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Brussels", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
    return {
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")),
      mins: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10)
    };
  }

  function update() {
    var n = nowInBrussels(), slots = SLOTS[n.day] || [];
    document.querySelectorAll(".hours tr").forEach(function (tr) {
      tr.classList.toggle("is-today", tr.getAttribute("data-day") === String(n.day));
    });
    var current = slots.filter(function (s) { return n.mins >= s[0] && n.mins < s[1]; })[0];
    var later = slots.filter(function (s) { return n.mins < s[0]; })[0];
    state.classList.toggle("is-open", !!current);
    if (current) {
      state.textContent = "Ouvert maintenant";
      detail.textContent = "Jusqu'à " + fmt(current[1]) + ". Réservation au 081 45 16 91.";
    } else if (later) {
      state.textContent = "Fermé pour le moment";
      detail.textContent = "Ouvre aujourd'hui à " + fmt(later[0]) + ".";
    } else {
      var d = n.day, steps = 0;
      do { d = (d + 1) % 7; steps++; } while (!SLOTS[d]);
      state.textContent = "Fermé pour le moment";
      detail.textContent = "Ouvre " + (steps === 1 ? "demain" : NAMES[d]) + " à " + fmt(SLOTS[d][0][0]) + ".";
    }
  }
  update();
  setInterval(update, 60000);

})();
