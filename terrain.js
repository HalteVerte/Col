/* ══════════════════════════════════════════
   TERRAIN — La Boucle Sauvage
   POINTS : chargés depuis data.js (BS.getObservations)
   Données itinéraire inter-boucle → trajets.js
══════════════════════════════════════════ */

// Points par défaut (prépopulés si aucune donnée)
const POINTS_DEFAUT = [
  { id:1, nom:"Artemps — départ & arrivée", type:'halte', lat:49.65, lng:3.27, quantite:'moyen', saison:'printemps', mois:5, note:"Point de départ et d'arrivée de la Boucle Sauvage. Village de l'Aisne, bord de Somme.", timestamp: new Date().toISOString() },
  { id:2, nom:"Forêt des Ardennes — myrtilles & faînes", type:'champignon', lat:49.90, lng:4.95, quantite:'abondant', saison:'ete', mois:8, note:"Hêtraies monumentales ardennaises. Myrtilles en landes acides au pic mi-août. Faînes abondantes fin août. Cèpes après orages. Zéro cueilleur.", timestamp: new Date().toISOString() },
  { id:2, nom:"Lac des Settons — Morvan central", type:'champignon', lat:47.22, lng:4.04, quantite:'abondant', saison:'automne', mois:9, note:"Meilleure zone champignons du Morvan. Cèpes, chanterelles, trompettes. Faînes et noisettes. Prévoir 2 jours de transformation sur place.", timestamp: new Date().toISOString() },
  { id:3, nom:"Bergerac — Périgord Noir, noix", type:'cueillette', lat:44.85, lng:0.48, quantite:'abondant', saison:'automne', mois:10, note:"Noyeraies immenses en bord de Dordogne. Ramassage au sol octobre-novembre, entièrement légal. Trompettes dans les chênaies.", timestamp: new Date().toISOString() },
  { id:4, nom:"Bassin d'Arcachon — huîtres & palourdes", type:'peche', lat:44.65, lng:-1.17, quantite:'abondant', saison:'printemps', mois:4, note:"Zones non-concédées à marée basse. Huîtres sur rochers affleurants, palourdes dans le sable. Salicorne très tendre en avril (retour).", timestamp: new Date().toISOString() },
  { id:5, nom:"Saint-Jean-Pied-de-Port — Roncevaux", type:'ravitaillement', lat:43.16, lng:-1.24, quantite:'moyen', saison:'automne', mois:10, note:"Route par défaut : Valcarlos (col d'Ibañeta, 1000m) — ouvert toute l'année.", timestamp: new Date().toISOString() },
  { id:6, nom:"Ria de Vigo — Galice (retour)", type:'peche', lat:42.24, lng:-8.72, quantite:'abondant', saison:'hiver', mois:2, note:"Rias Baixas — moules et huîtres sur zones libres à marée basse. Février-mars (retour).", timestamp: new Date().toISOString() },
  { id:7, nom:"Serra da Gardunha — pignons & châtaignes", type:'cueillette', lat:39.82, lng:-7.49, quantite:'abondant', saison:'hiver', mois:12, note:"Triple jackpot hivernal Portugal. Pignons de pin parasol au sol, châtaigneraies, lactaires sous les pins. Décembre.", timestamp: new Date().toISOString() },
  { id:8, nom:"Quiberon — côte sauvage algues", type:'peche', lat:47.49, lng:-3.11, quantite:'moyen', saison:'printemps', mois:4, note:"Côte Sauvage : moules, criste marine sur rochers, algues. Ajoncs en fleurs avril-mai. Retour.", timestamp: new Date().toISOString() },
  { id:9, nom:"Baie de Somme — aster maritime", type:'cueillette', lat:50.18, lng:1.63, quantite:'moyen', saison:'printemps', mois:5, note:"Prés salés : aster maritime et salicorne au pic en mai. Moules sur bouchots. Dernière halte avant Artemps.", timestamp: new Date().toISOString() },
];

// Initialiser les points par défaut dans data.js si vide
(function initPointsDefaut() {
  if (window.BS && BS.getObservations().length === 0) {
    POINTS_DEFAUT.forEach(p => BS.addObservation(p));
  }
})();

// POINTS = proxy live sur data.js
// Utilisé par app.js pour la compatibilité
Object.defineProperty(window, 'POINTS', {
  get: () => window.BS ? BS.getObservations() : [],
  set: () => {}, // lecture seule — écriture via BS.addObservation / BS.deleteObservation
  configurable: true,
});


