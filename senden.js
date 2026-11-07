// Übermittelt das Ergebnis nach der Abgabe an ein Google-Formular (Ergebnistabelle der Lehrkraft).
(function () {
  var ZIEL = "https://docs.google.com/forms/d/e/1FAIpQLSewgcILmIdd5bZlYnb0aFTsnqKMDmrrGSTwKJPfWMC0oTXb9w/formResponse";
  var F = { name: "entry.1310728237", klasse: "entry.1103803953", punkte: "entry.1144687010", prozent: "entry.141246579", details: "entry.1853769831" };
  function hinweis(t) { var n = document.getElementById("sendState"); if (n) n.textContent = t; }
  function senden() {
    if (typeof S === "undefined" || !S || !S.result || S.sent) return;
    var r = S.result;
    var teile = SEC.map(function (s) { return s.id + " " + r.sec[s.id].got + "/" + r.sec[s.id].max; }).join(" · ");
    var p = new URLSearchParams();
    p.append(F.name, S.name || "");
    p.append(F.klasse, S.klasse || "");
    p.append(F.punkte, r.got + "/" + r.max);
    p.append(F.prozent, String(r.pct).replace(".", ","));
    p.append(F.details, teile + " · " + r.minutes + " min" + (r.auto ? " · automatisch abgegeben" : "") + " · " + new Date(r.at).toLocaleString("de-DE"));
    fetch(ZIEL, { method: "POST", mode: "no-cors", body: p })
      .then(function () { S.sent = true; save(); hinweis("Ergebnis an die Lehrkraft übermittelt."); })
      .catch(function () { hinweis("Ergebnis konnte nicht übermittelt werden. Bitte zeig es deiner Lehrkraft."); });
  }
  var abgeben = window.submit;
  window.submit = function (auto) { var x = abgeben(auto); senden(); return x; };
  senden();
})();
