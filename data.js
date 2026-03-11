/* ═══════════════════════════════════════════════════════════════
   data.js — La Boucle Sauvage
   État unifié · Migration · CRUD · Export agent
   ═══════════════════════════════════════════════════════════════ */

const DATA_VERSION  = 1;
const STORAGE_KEY   = 'boucle_sauvage_v1';
const OLD_KEY_MAP   = 'sauvage_points_v2';
const OLD_KEY_RPG   = 'boucle_rpg_v1';

/* ── Stocks par défaut ── */
const STOCKS_DEFAUT = {
  myrtilles:   0, faines:     0, noisettes:  0, champignons: 0,
  chataignes:  0, noix:       0, pignons:    0, algues:      0,
  cynorhodons: 0, zestes:     0, farine_gland:0, caroube:    0,
};

/* ─────────────────────────────────────────────
   INIT — chargement + migration
───────────────────────────────────────────── */
function _defaultState() {
  return {
    version:       DATA_VERSION,
    observations:  [],
    journal:       [],
    quetes_done:   [],
    zones_visited: [1, 2, 3],
    stocks:        { ...STOCKS_DEFAUT },
    meta: {
      created_at:    new Date().toISOString(),
      last_modified: new Date().toISOString(),
      export_count:  0,
    },
  };
}

function _migrate() {
  // Déjà migré
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return JSON.parse(existing);

  const state = _defaultState();

  // Migration anciens points terrain (index.html)
  try {
    const oldPoints = JSON.parse(localStorage.getItem(OLD_KEY_MAP) || '[]');
    if (oldPoints.length) {
      state.observations = oldPoints.map(p => ({
        id:        p.id || Date.now(),
        timestamp: p.timestamp || new Date().toISOString(),
        lat:       p.lat,
        lng:       p.lng,
        nom:       p.nom || '',
        type:      p.type || 'cueillette',
        quantite:  p.quantite || 'moyen',
        saison:    p.saison || '',
        mois:      p.mois || 0,
        note:      p.desc || '',
      }));
      console.log(`[data.js] Migration: ${oldPoints.length} points terrain importés`);
    }
  } catch(e) { console.warn('[data.js] Migration points échouée', e); }

  // Migration ancien état RPG (carnet.html)
  try {
    const oldRpg = JSON.parse(localStorage.getItem(OLD_KEY_RPG) || 'null');
    if (oldRpg) {
      state.journal       = (oldRpg.journal       || []).map(e => ({
        ...e, timestamp: e.timestamp || new Date().toISOString()
      }));
      state.quetes_done   = oldRpg.quests_done    || oldRpg.quetes_done || [];
      state.zones_visited = oldRpg.zones_visited  || [1, 2, 3];
      state.stocks        = { ...STOCKS_DEFAUT, ...(oldRpg.stocks || {}) };
      console.log('[data.js] Migration: état RPG importé');
    }
  } catch(e) { console.warn('[data.js] Migration RPG échouée', e); }

  // Sauvegarder et nettoyer les anciennes clés
  _save(state);
  localStorage.removeItem(OLD_KEY_MAP);
  localStorage.removeItem(OLD_KEY_RPG);

  return state;
}

/* ─────────────────────────────────────────────
   ÉTAT GLOBAL
───────────────────────────────────────────── */
let _state = _migrate();

function _save(s) {
  s = s || _state;
  s.meta.last_modified = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch(e) {
    console.error('[data.js] Sauvegarde échouée', e);
  }
}

/* ─────────────────────────────────────────────
   LECTURE
───────────────────────────────────────────── */
function getObservations()  { return [..._state.observations]; }
function getJournal()       { return [..._state.journal]; }
function getQuetesDone()    { return [..._state.quetes_done]; }
function getZonesVisited()  { return [..._state.zones_visited]; }
function getStocks()        { return { ..._state.stocks }; }
function getMeta()          { return { ..._state.meta }; }

/* ─────────────────────────────────────────────
   OBSERVATIONS (ex-POINTS)
───────────────────────────────────────────── */
function addObservation({ lat, lng, type, quantite, saison, mois, note, nom }) {
  const now = new Date();
  const obs = {
    id:        Date.now(),
    timestamp: now.toISOString(),
    lat, lng,
    nom:       nom || '',
    type:      type      || 'cueillette',
    quantite:  quantite  || 'moyen',
    saison:    saison    || _getSaison(now.getMonth() + 1),
    mois:      mois      || now.getMonth() + 1,
    note:      note      || '',
  };
  _state.observations.push(obs);
  _save();
  return obs;
}

function deleteObservation(id) {
  _state.observations = _state.observations.filter(o => o.id !== id);
  _save();
}

function _getSaison(mois) {
  const map = { 12:'hiver',1:'hiver',2:'hiver', 3:'printemps',4:'printemps',5:'printemps',
                6:'ete',7:'ete',8:'ete', 9:'automne',10:'automne',11:'automne' };
  return map[mois] || '';
}

/* ─────────────────────────────────────────────
   JOURNAL
───────────────────────────────────────────── */
function addJournalEntry({ date, zone, zone_id, text }) {
  const entry = {
    date:      date     || new Date().toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' }),
    zone:      zone     || '',
    zone_id:   zone_id  || null,
    text:      text     || '',
    timestamp: new Date().toISOString(),
  };
  _state.journal.push(entry);
  _save();
  return entry;
}

function deleteJournalEntry(index) {
  _state.journal.splice(index, 1);
  _save();
}

/* ─────────────────────────────────────────────
   QUÊTES
───────────────────────────────────────────── */
function completeQuete(id) {
  if (!_state.quetes_done.includes(id)) {
    _state.quetes_done.push(id);
    _save();
  }
}

function uncompleteQuete(id) {
  _state.quetes_done = _state.quetes_done.filter(q => q !== id);
  _save();
}

/* ─────────────────────────────────────────────
   ZONES
───────────────────────────────────────────── */
function visitZone(id) {
  if (!_state.zones_visited.includes(id)) {
    _state.zones_visited.push(id);
    _save();
  }
}

/* ─────────────────────────────────────────────
   STOCKS
───────────────────────────────────────────── */
function updateStock(id, qty) {
  _state.stocks[id] = Math.max(0, qty);
  _save();
}

function getStock(id) {
  return _state.stocks[id] || 0;
}

/* ─────────────────────────────────────────────
   EXPORT AGENT
───────────────────────────────────────────── */
function exportForAgent() {
  _state.meta.export_count++;
  _save();

  const payload = {
    export_date:    new Date().toISOString(),
    version:        DATA_VERSION,
    meta: {
      total_observations: _state.observations.length,
      total_journal:      _state.journal.length,
      quetes_completes:   _state.quetes_done.length,
      zones_visitees:     _state.zones_visited.length,
      export_count:       _state.meta.export_count,
    },
    observations:   _state.observations,
    journal:        _state.journal,
    quetes_done:    _state.quetes_done,
    zones_visited:  _state.zones_visited,
    stocks:         _state.stocks,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `boucle_sauvage_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);

  return payload;
}

/* ─────────────────────────────────────────────
   RESET (dev/debug)
───────────────────────────────────────────── */
function resetAllData() {
  if (!confirm('Effacer toutes les données ? Cette action est irréversible.')) return;
  _state = _defaultState();
  _save();
  location.reload();
}

/* ─────────────────────────────────────────────
   EXPOSITION GLOBALE
───────────────────────────────────────────── */
window.BS = {
  // Lecture
  getObservations, getJournal, getQuetesDone, getZonesVisited, getStocks, getMeta,
  // Observations
  addObservation, deleteObservation,
  // Journal
  addJournalEntry, deleteJournalEntry,
  // Quêtes
  completeQuete, uncompleteQuete,
  // Zones
  visitZone,
  // Stocks
  updateStock, getStock,
  // Export
  exportForAgent,
  // Debug
  resetAllData,
  _raw: () => ({ ..._state }),
};
