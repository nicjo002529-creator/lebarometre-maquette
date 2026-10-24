/* Consentement aux cookies (RGPD + art. 129 de la loi belge du 13 juin 2005 sur les communications électroniques).
   - Rien n'est déposé par un tiers avant un choix explicite.
   - « Tout refuser » est aussi visible et accessible que « Tout accepter ».
   - Le choix est conservé 6 mois, puis redemandé. Il peut être modifié à tout moment (« Gérer les cookies »). */
(function () {
  var KEY = "barometre-consent";
  var VERSION = 1;
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182; // 6 mois

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (!c || c.v !== VERSION || Date.now() - c.date > MAX_AGE) return null;
      return c;
    } catch (e) { return null; }
  }
  function save(external) {
    var c = { v: VERSION, date: Date.now(), external: !!external };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    apply(c);
    return c;
  }

  // Contenus externes soumis au consentement : carte Google Maps
  function apply(c) {
    document.querySelectorAll("[data-consent-src]").forEach(function (box) {
      var frame = box.querySelector("iframe");
      if (c && c.external) {
        if (!frame) {
          frame = document.createElement("iframe");
          frame.title = box.getAttribute("data-title") || "";
          frame.loading = "lazy";
          frame.referrerPolicy = "no-referrer-when-downgrade";
          frame.src = box.getAttribute("data-consent-src");
          box.appendChild(frame);
        }
        box.classList.add("is-loaded");
      } else {
        if (frame) frame.remove();
        box.classList.remove("is-loaded");
      }
    });
  }

  // Bandeau
  var banner = document.createElement("div");
  banner.className = "cookie";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-modal", "false");
  banner.setAttribute("aria-labelledby", "cookie-title");
  banner.setAttribute("aria-describedby", "cookie-text");
  banner.hidden = true;
  banner.innerHTML =
    '<div class="cookie__inner">' +
      '<h2 id="cookie-title" class="cookie__title">Cookies</h2>' +
      '<p id="cookie-text" class="cookie__text">Ce site n\'utilise ni publicité ni mesure d\'audience. ' +
      'Seule la carte Google Maps dépose des cookies de Google : elle ne s\'affiche qu\'avec votre accord. ' +
      '<a href="cookies.html">En savoir plus</a></p>' +
      '<div class="cookie__prefs" hidden>' +
        '<label class="cookie__opt"><input type="checkbox" checked disabled> <span><b>Nécessaires</b> : mémoriser votre choix sur cet appareil. Toujours actifs.</span></label>' +
        '<label class="cookie__opt"><input type="checkbox" id="cookie-external"> <span><b>Contenus externes</b> : afficher la carte Google Maps (cookies de Google).</span></label>' +
      '</div>' +
      '<div class="cookie__actions">' +
        '<button type="button" class="btn btn--outline" data-cookie="refuse">Tout refuser</button>' +
        '<button type="button" class="btn btn--outline" data-cookie="custom">Personnaliser</button>' +
        '<button type="button" class="btn btn--outline" data-cookie="save" hidden>Enregistrer mes choix</button>' +
        '<button type="button" class="btn btn--outline" data-cookie="accept">Tout accepter</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(banner);

  var prefs = banner.querySelector(".cookie__prefs");
  var extBox = banner.querySelector("#cookie-external");
  var btnCustom = banner.querySelector('[data-cookie="custom"]');
  var btnSave = banner.querySelector('[data-cookie="save"]');
  var lastFocus = null;

  function open(showPrefs) {
    var c = read();
    extBox.checked = !!(c && c.external);
    prefs.hidden = !showPrefs;
    btnCustom.hidden = !!showPrefs;
    btnSave.hidden = !showPrefs;
    lastFocus = document.activeElement;
    banner.hidden = false;
    banner.querySelector("button:not([hidden])").focus({ preventScroll: true });
  }
  function close() {
    banner.hidden = true;
    if (lastFocus && document.contains(lastFocus) && lastFocus !== document.body) lastFocus.focus({ preventScroll: true });
  }

  banner.addEventListener("click", function (e) {
    var b = e.target.closest("[data-cookie]");
    if (!b) return;
    var a = b.getAttribute("data-cookie");
    if (a === "accept") { save(true); close(); }
    else if (a === "refuse") { save(false); close(); }
    else if (a === "custom") { open(true); }
    else if (a === "save") { save(extBox.checked); close(); }
  });

  // Liens « Gérer les cookies »
  document.querySelectorAll("[data-cookie-settings]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); open(true); });
  });
  // Bouton « Afficher la carte » : accord explicite pour les contenus externes
  document.querySelectorAll("[data-consent-load]").forEach(function (el) {
    el.addEventListener("click", function () { save(true); close(); });
  });

  var current = read();
  apply(current);
  if (!current) open(false);
})();
