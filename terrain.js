/* ==========================================
   TERRAIN — La Boucle Sauvage
   POINTS : chargés depuis waypoints.json
   Données itinéraire inter-boucle -> trajets.js
========================================== */

// Initialiser les points par défaut depuis waypoints.json si localStorage vide
(function initPointsDefaut() {
  function load(points) {
    if (window.BS && BS.getObservations().length === 0) {
      points.forEach(p => BS.addObservation(p));
    }
  }

  if (window.BS && BS.getObservations().length === 0) {
    fetch('./waypoints.json')
      .then(r => r.json())
      .then(load)
      .catch(() => {
        console.warn('waypoints.json indisponible — pas de points par défaut chargés');
      });
  }
})();

// POINTS = proxy live sur data.js
Object.defineProperty(window, 'POINTS', {
  get: () => window.BS ? BS.getObservations() : [],
  set: () => {}, // lecture seule — écriture via BS.addObservation / BS.deleteObservation
  configurable: true,
});


