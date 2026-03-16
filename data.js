/* ===============================================================
   data.js — La Boucle Sauvage
   État unifié · Migration · CRUD · Export agent
   =============================================================== */

const DATA_VERSION  = 1;
const STORAGE_KEY   = 'boucle_sauvage_v1';
const OLD_KEY_MAP   = 'sauvage_points_v2';
const OLD_KEY_RPG   = 'boucle_rpg_v1';

/* -- Stocks par défaut -- */
const STOCKS_DEFAUT = {
  myrtilles:   0, faines:     0, noisettes:  0, champignons: 0,
  chataignes:  0, noix:       0, pignons:    0, algues:      0,
  cynorhodons: 0, zestes:     0, farine_gland:0, caroube:    0,
};

/* -- Kommoda par défaut -- */
const KOMMODA_DEFAUT = {
  batterie_pct:   null,  // % batterie 0-100
  assistance:     null,  // niveau 0-5
  distance_jour:  null,  // km du jour
  distance_total: null,  // km total odométre
  timestamp:      null,  // dernière saisie
};

/* ---------------------------------------------
   INIT — chargement + migration
--------------------------------------------- */
function _defaultState() {
  return {
    version:       DATA_VERSION,
    observations:  [],
    journal:       [],
    quetes_done:   [],
    zones_visited: [1, 2, 3],
    stocks:        { ...STOCKS_DEFAUT },
    kommoda:       { ...KOMMODA_DEFAUT },
    recettes_user: [],  // recettes ajoutées par l'utilisateur
    // Stats & méta
    config_boucle: {
      distance_km: 30
    },
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

/* ---------------------------------------------
   ÉTAT GLOBAL
--------------------------------------------- */
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

/* ---------------------------------------------
   LECTURE
--------------------------------------------- */
function getObservations()  { return [..._state.observations]; }
function getJournal()       { return [..._state.journal]; }
function getQuetesDone()    { return [..._state.quetes_done]; }
function getZonesVisited()  { return [..._state.zones_visited]; }
function getStocks()        { return { ..._state.stocks }; }
function getMeta()          { return { ..._state.meta }; }
function getKommoda()       { return { ...(_state.kommoda || KOMMODA_DEFAUT) }; }

//ajout config boucle
function getConfigBoucle() {
  return { ...(_state.config_boucle || { distance_km: 30 }) };
}

function setConfigBoucle(cfg) {
  _state.config_boucle = { ..._state.config_boucle, ...cfg };
  _save();
}

function setKommoda(vals) {
  _state.kommoda = { ...KOMMODA_DEFAUT, ..._state.kommoda, ...vals, timestamp: new Date().toISOString() };
  _save();
}

/* ---------------------------------------------
   OBSERVATIONS (ex-POINTS)
--------------------------------------------- */
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

/* ---------------------------------------------
   JOURNAL
--------------------------------------------- */
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

/* ---------------------------------------------
   QUÊTES
--------------------------------------------- */
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

/* ---------------------------------------------
   ZONES
--------------------------------------------- */
function visitZone(id) {
  if (!_state.zones_visited.includes(id)) {
    _state.zones_visited.push(id);
    _save();
  }
}

/* ---------------------------------------------
   STOCKS
--------------------------------------------- */
function updateStock(id, qty) {
  _state.stocks[id] = Math.max(0, qty);
  _save();
}

function getStock(id) {
  return _state.stocks[id] || 0;
}

/* ---------------------------------------------
   EXPORT AGENT
--------------------------------------------- */
// -- Calculs astronomiques locaux (sans API) ------------------
function _sunTimes(lat, lng, date) {
  // Algorithme simplifié lever/coucher soleil
  const rad = Math.PI / 180;
  const d = new Date(date);
  const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
  const declination = -23.45 * Math.cos(rad * (360 / 365) * (dayOfYear + 10));
  const hourAngle = Math.acos(-Math.tan(lat * rad) * Math.tan(declination * rad)) / rad;
  const sunrise = 12 - hourAngle / 15 - lng / 15;
  const sunset  = 12 + hourAngle / 15 - lng / 15;
  const fmt = h => {
    const hh = Math.floor(((h % 24) + 24) % 24);
    const mm = Math.floor((h - Math.floor(h)) * 60);
    return `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
  };
  return { lever: fmt(sunrise), coucher: fmt(sunset), duree_h: Math.round((sunset - sunrise) * 10) / 10 };
}

function _moonPhase(date) {
  const d = new Date(date);
  const known = new Date('2000-01-06'); // nouvelle lune connue
  const diff = (d - known) / (1000 * 60 * 60 * 24);
  const cycle = 29.53058867;
  const phase = ((diff % cycle) + cycle) % cycle;
  const phases = ['🌑 Nouvelle lune','🌒 Premier croissant','🌓 Premier quartier','🌔 Gibbeuse croissante','🌕 Pleine lune','🌖 Gibbeuse décroissante','🌗 Dernier quartier','🌘 Dernier croissant'];
  return { phase_jours: Math.round(phase * 10) / 10, label: phases[Math.floor(phase / (cycle / 8))] };
}

function _tideSimple(lat, lng, date) {
  // Calcul harmonique simplifié — cycle semi-diurne M2 (12h25)
  const d = new Date(date);
  const t = d.getTime() / (1000 * 60 * 60); // heures depuis epoch
  const M2 = 12.4206; // période M2 en heures
  const phase = (t % M2) / M2;
  const height = Math.cos(phase * 2 * Math.PI);
  const isCostal = Math.abs(lat) < 60 && (lng < 3 || lng > 8); // côte atlantique/manche/méditerranée
  if (!isCostal) return null;
  const nextHigh = M2 * (1 - phase);
  const nextLow  = M2 * (0.5 - phase > 0 ? 0.5 - phase : 1.5 - phase);
  return {
    hauteur_relative: Math.round(height * 100) / 100,
    etat: height > 0.3 ? 'montante' : height < -0.3 ? 'descendante' : 'étale',
    prochaine_haute_h: Math.round(nextHigh * 10) / 10,
    prochaine_basse_h: Math.round(Math.min(nextLow, nextHigh) * 10) / 10,
    note: 'calcul harmonique M2 simplifié — confirmer avec SHOM'
  };
}

async function _fetchMeteo(lat, lng) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=precipitation_sum,windspeed_10m_max,temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=3`;
    const r = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!r.ok) throw new Error('meteo offline');
    const data = await r.json();
    const cw = data.current_weather;
    const wmo = {0:'☀️ Dégagé',1:'🌤 Peu nuageux',2:'⛅ Partiellement nuageux',3:'☁️ Couvert',51:'🌦 Bruine',61:'🌧 Pluie légère',63:'🌧 Pluie modérée',65:'🌧 Pluie forte',71:'❄️ Neige légère',80:'🌦 Averses',95:'⛈ Orage',96:'⛈ Orage grêle'};
    return {
      source: 'open-meteo.com',
      temperature_c: cw.temperature,
      vent_kmh: Math.round(cw.windspeed),
      direction_vent: cw.winddirection,
      meteo: wmo[cw.weathercode] || `Code ${cw.weathercode}`,
      previsions_3j: data.daily ? {
        dates: data.daily.time,
        temp_max: data.daily.temperature_2m_max,
        temp_min: data.daily.temperature_2m_min,
        pluie_mm: data.daily.precipitation_sum,
        vent_max: data.daily.windspeed_10m_max,
      } : null
    };
  } catch(e) {
    return { source: 'offline', note: 'météo non disponible — pas de connexion' };
  }
}

function _getGPSPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, precision_m: Math.round(pos.coords.accuracy), source: 'gps' }),
      _err => resolve(null),
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
    );
  });
}

async function exportForAgent() {
  _state.meta.export_count++;
  _save();

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  // Position : GPS réel en priorité, fallback dernier waypoint
  const gpsPos  = await _getGPSPosition();
  const lastObs = _state.observations.slice().reverse().find(o => o.lat && o.lng);
  const lat = gpsPos?.lat ?? (lastObs?.lat ?? 49.65);
  const lng = gpsPos?.lng ?? (lastObs?.lng ?? 3.27);
  const posSource = gpsPos
    ? `GPS réel (±${gpsPos.precision_m}m)`
    : lastObs
      ? `dernier waypoint: ${lastObs.nom} ⚠️ position approximative`
      : 'défaut Artemps ⚠️ GPS indisponible';

  // Calculs locaux offline
  const soleil = _sunTimes(lat, lng, now);
  const lune   = _moonPhase(now);
  const marees = _tideSimple(lat, lng, now);
  const meteo  = await _fetchMeteo(lat, lng);

  // Observations proches (rayon ~100km)
  const proches = _state.observations.filter(o => {
    if (!o.lat || !o.lng) return false;
    const dlat = (o.lat - lat) * 111;
    const dlng = (o.lng - lng) * 111 * Math.cos(lat * Math.PI / 180);
    return Math.sqrt(dlat*dlat + dlng*dlng) < 100;
  });

  const payload = {
    export_date:  now.toISOString(),
    version:      DATA_VERSION,
    agent:        '6BL-v1',

    // Contexte position
    position: {
      lat, lng,
      source: posSource,
      gps_brut: gpsPos ?? null,
      date: dateStr,
    },

    // Contexte astronomique & météo (offline-first)
    environnement: {
      soleil,
      lune,
      marees,
      meteo,
    },

    // Données terrain
    observations:      _state.observations,
    observations_proches: proches,
    stocks:            _state.stocks,
    kommoda:           _state.kommoda || KOMMODA_DEFAUT,
    zones_visited:     _state.zones_visited,
    quetes_done:       _state.quetes_done,
    journal:           _state.journal.slice(-10), // 10 dernières entrées

    // Stats
    meta: {
      total_observations: _state.observations.length,
      total_journal:      _state.journal.length,
      quetes_completes:   _state.quetes_done.length,
      zones_visitees:     _state.zones_visited.length,
      export_count:       _state.meta.export_count,
    },
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `6BL_${dateStr}.json`;
  a.click();
  URL.revokeObjectURL(url);

  return payload;
}

/* ---------------------------------------------
   RECETTES UTILISATEUR
--------------------------------------------- */
function getRecettesUser() { return [...(_state.recettes_user || [])]; }

function addRecetteUser(recette) {
  if (!_state.recettes_user) _state.recettes_user = [];
  const r = {
    ...recette,
    id: `user_${Date.now()}`,
    source: 'utilisateur',
    timestamp: new Date().toISOString(),
  };
  _state.recettes_user.push(r);
  _save();
  return r;
}

function deleteRecetteUser(id) {
  if (!_state.recettes_user) return;
  _state.recettes_user = _state.recettes_user.filter(r => r.id !== id);
  _save();
}

/* ---------------------------------------------
   IMPORT — fusion depuis un export JSON 6BL
--------------------------------------------- */
function importFromJSON(data) {
  const report = { added: {}, skipped: {}, errors: [] };

  try {
    // -- Journal : union par timestamp
    const journalIds = new Set(_state.journal.map(e => e.timestamp));
    const newJournal = (data.journal || []).filter(e => !journalIds.has(e.timestamp));
    _state.journal.push(...newJournal);
    report.added.journal = newJournal.length;

    // -- Observations : union par id
    const obsIds = new Set(_state.observations.map(o => o.id));
    const newObs = (data.observations || []).filter(o => !obsIds.has(o.id));
    _state.observations.push(...newObs);
    report.added.observations = newObs.length;

    // -- Quêtes accomplies : union
    const before = _state.quetes_done.length;
    const merged = new Set([..._state.quetes_done, ...(data.quetes_done || [])]);
    _state.quetes_done = [...merged];
    report.added.quetes = _state.quetes_done.length - before;

    // -- Zones visitées : union
    const mergedZones = new Set([..._state.zones_visited, ...(data.zones_visited || [])]);
    _state.zones_visited = [...mergedZones];

    // -- Stocks : prendre l'import si Kommoda plus récent
    if (data.stocks) {
      const localTs  = _state.kommoda?.timestamp || '1970';
      const importTs = data.kommoda?.timestamp   || '1970';
      if (importTs > localTs) {
        Object.assign(_state.stocks, data.stocks);
        if (data.kommoda) _state.kommoda = { ..._state.kommoda, ...data.kommoda };
        report.added.stocks = 'import (plus récent)';
      } else {
        report.skipped.stocks = 'local plus récent';
      }
    }

    // -- Recettes utilisateur : union par id
    if (!_state.recettes_user) _state.recettes_user = [];
    const recIds = new Set(_state.recettes_user.map(r => r.id));
    const newRec = (data.recettes_user || []).filter(r => !recIds.has(r.id));
    _state.recettes_user.push(...newRec);
    report.added.recettes = newRec.length;

    _save();
    report.success = true;

  } catch(e) {
    report.success = false;
    report.errors.push(e.message);
  }

  return report;
}


/* --------------------------------------------- */
function resetAllData() {
  if (!confirm('Effacer toutes les données ? Cette action est irréversible.')) return;
  _state = _defaultState();
  _save();
  location.reload();
}

/* ---------------------------------------------
   EXPOSITION GLOBALE
--------------------------------------------- */
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
  // Recettes utilisateur
  getRecettesUser, addRecetteUser, deleteRecetteUser,
  // Export
  getKommoda, setKommoda, exportForAgent,
  // Import synchro
  importFromJSON,
  // Reset (dev/debug)
  _raw: () => ({ ..._state }),
  // Config boucle
  getConfigBoucle, setConfigBoucle,
};
