/* carnet.js — Logique du Carnet du Voyageur
   Extrait de carnet.html (session 17)
   Dépendances : data.js, stocks.js, zones.js, quetes.js, 6bl.js
*/


/* ===============================================
   DONNÉES RPG — générées depuis les phases du trajet
=============================================== */



/* ===============================================
   STATE — proxy sur data.js (BS)
=============================================== */

// Proxy state pour compatibilité avec le code existant
// Toutes les lectures/écritures passent par BS
const state = {
  get quests_done()   { return window.BS ? BS.getQuetesDone()   : []; },
  get journal()       { return window.BS ? BS.getJournal()       : []; },
  get zones_visited() { return window.BS ? BS.getZonesVisited()  : [1,2,3]; },
  get stocks()        { return window.BS ? BS.getStocks()        : {}; },
};

function saveState() {
  // data.js sauvegarde automatiquement — no-op pour compatibilité
}

/* ===============================================
   NAVIGATION
=============================================== */
function switchTab(tab, btn) {
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("panel-" + tab).classList.add("active");
  if (btn) btn.classList.add("active");
  else document.querySelectorAll(".tab-btn")[["carte","zones","quetes","observer","inventaire","journal","sixbl"].indexOf(tab)]?.classList.add("active");
  if (tab === 'carte') {
    setTimeout(buildCarteMap, 80);
  }
  if (tab === 'observer') renderObsGrid();
}

function triggerImport() {
  document.getElementById('importFileInput').click();
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);

      // Vérifier que c'est bien un export 6BL
      if (!data.version || !data.agent) {
        alert('❌ Fichier non reconnu — utilise un export 6BL valide.');
        return;
      }

      const report = BS.importFromJSON(data);

      if (report.success) {
        const msg = [
          `✅ Import réussi depuis ${data.export_date?.slice(0,10) || '?'}`,
          `📓 Journal : +${report.added.journal} entrée(s)`,
          `📍 Observations : +${report.added.observations}`,
          `⚔️ Quêtes : +${report.added.quetes}`,
          `🍄 Recettes : +${report.added.recettes}`,
          report.added.stocks ? `📦 Stocks : ${report.added.stocks}` : `📦 Stocks : ${report.skipped.stocks}`,
        ].join('\n');
        alert(msg);

        // Recharger l'interface
        location.reload();
      } else {
        alert('❌ Erreur import : ' + report.errors.join(', '));
      }
    } catch(err) {
      alert('❌ JSON invalide : ' + err.message);
    }

    // Reset input pour permettre re-import du même fichier
    event.target.value = '';
  };
  reader.readAsText(file);
}

function lancerBriefing() {
  const container = document.getElementById('sbl-container');
  const printBtn  = document.getElementById('sbl-print-btn');
  SBL.generate(container).then(() => {
    printBtn.style.display = 'block';
  });
}

/* ===============================================
   OBSERVER — formulaire 3 taps
=============================================== */
let quickState = { lat: null, lng: null, type: 'cueillette', qty: 'moyen' };

const OBS_TYPE_CFG = {
  cueillette:    { icon:'🌿', color:'#4a7035', label:'Cueillette' },
  champignon:    { icon:'🍄', color:'#c8882a', label:'Champignons' },
  peche:         { icon:'🎣', color:'#2d7a5c', label:'Pêche' },
  eau:           { icon:'💧', color:'#2d5c7a', label:'Eau potable' },
  recharge:      { icon:'⚡', color:'#c8a820', label:'Recharge' },
  bivouac:       { icon:'🏕️', color:'#7a5c3a', label:'Bivouac' },
  danger:        { icon:'⚠️', color:'#9e3f20', label:'À éviter' },
  oeuf:          { icon:'🥚', color:'#c8a820', label:'Œufs frais' },
  abri:          { icon:'🛖', color:'#7a5c3a', label:'Abri' },
  ravitaillement:{ icon:'🛒', color:'#3a6e28', label:'Ravitaillement' },
  halte:         { icon:'🏠', color:'#5a8a6a', label:'Halte' },
  autre:         { icon:'📍', color:'#888',    label:'Autre' },
};

function quickGPS() {
  const btn   = document.getElementById('quickGpsBtn');
  const label = document.getElementById('quickGpsLabel');
  const step2 = document.getElementById('quickStep2');
  const save  = document.getElementById('quickSave');

  label.textContent = '…acquisition GPS';
  btn.classList.add('loading');

  if (!navigator.geolocation) {
    label.textContent = 'GPS non disponible';
    btn.classList.remove('loading');
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    quickState.lat = pos.coords.latitude;
    quickState.lng = pos.coords.longitude;

    const nearby = BS.getObservations().find(p => {
      const d = Math.sqrt(
        Math.pow((p.lat - quickState.lat) * 111000, 2) +
        Math.pow((p.lng - quickState.lng) * 111000 * Math.cos(quickState.lat * Math.PI/180), 2)
      );
      return d < 50;
    });

    label.textContent = nearby
      ? `📍 ${nearby.nom || nearby.type} (${Math.round(pos.coords.accuracy)}m)`
      : `📍 ${quickState.lat.toFixed(4)}, ${quickState.lng.toFixed(4)} (${Math.round(pos.coords.accuracy)}m)`;

    btn.classList.remove('loading');
    btn.classList.add('locked');
    step2.classList.add('visible');
    save.disabled = false;
  }, () => {
    label.textContent = 'Position GPS indisponible';
    btn.classList.remove('loading');
  }, { enableHighAccuracy: true, timeout: 10000 });
}

function quickSetType(el) {
  document.querySelectorAll('.qt-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  quickState.type = el.dataset.type;
}

function quickSetQty(el) {
  document.querySelectorAll('.qq-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  quickState.qty = el.dataset.qty;
}

function quickToggleNote() {
  const note = document.getElementById('quickNote');
  note.style.display = note.style.display === 'block' ? 'none' : 'block';
  if (note.style.display === 'block') note.focus();
}

function quickSaveCarnet() {
  if (!quickState.lat || !quickState.lng) return;
  const note = document.getElementById('quickNote').value.trim();
  BS.addObservation({
    lat: quickState.lat, lng: quickState.lng,
    type: quickState.type, quantite: quickState.qty, note,
  });
  const save = document.getElementById('quickSave');
  save.textContent = '✓ Enregistré !';
  save.style.background = 'var(--forest)';
  renderObsGrid();
  setTimeout(() => quickReset(), 1800);
}

function quickReset() {
  quickState = { lat: null, lng: null, type: 'cueillette', qty: 'moyen' };
  document.getElementById('quickGpsBtn').classList.remove('locked','loading');
  document.getElementById('quickGpsLabel').textContent = 'Capturer position';
  document.getElementById('quickStep2').classList.remove('visible');
  const qs = document.getElementById('quickSave');
  qs.disabled = true;
  qs.textContent = "✓ Enregistrer l'observation";
  qs.style.background = '';
  document.getElementById('quickNote').value = '';
  document.getElementById('quickNote').style.display = 'none';
  document.querySelectorAll('.qt-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.qt-btn[data-type="cueillette"]').classList.add('active');
  document.querySelectorAll('.qq-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.qq-btn[data-qty="moyen"]').classList.add('active');
}

function addPointCarnet() {
  const nom  = document.getElementById('newName').value.trim();
  const type = document.getElementById('newType').value;
  const lat  = parseFloat(document.getElementById('newLat').value);
  const lng  = parseFloat(document.getElementById('newLng').value);
  const note = document.getElementById('newDesc').value.trim();
  if (!nom || isNaN(lat) || isNaN(lng)) { alert('Nom, latitude et longitude obligatoires.'); return; }
  BS.addObservation({ nom, type, lat, lng, note });
  ['newName','newLat','newLng','newDesc'].forEach(id => document.getElementById(id).value = '');
  renderObsGrid();
}

function deleteObs(id) {
  if (!confirm('Supprimer cette observation ?')) return;
  BS.deleteObservation(id);
  renderObsGrid();
}

function renderObsGrid() {
  const grid = document.getElementById('obsGrid');
  if (!grid) return;
  const obs = BS.getObservations().slice().reverse();
  if (!obs.length) {
    grid.innerHTML = '<p style="font-style:italic;color:var(--ink-soft);font-size:.9rem">Aucune observation. Touche 📍 pour commencer.</p>';
    return;
  }
  const QTY_COLOR = { absent:'#c84a2a', rare:'#c8882a', moyen:'#c8c040', abondant:'#6abf4a' };
  grid.innerHTML = obs.map(p => {
    const cfg  = OBS_TYPE_CFG[p.type] || OBS_TYPE_CFG.autre;
    const date = p.timestamp ? new Date(p.timestamp).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}) : '';
    const qty  = p.quantite || '';
    return `
    <div class="point-card parch">
      <button class="pt-delete" onclick="deleteObs(${p.id})">✕</button>
      <div class="pt-hdr">
        <span class="pt-icon">${cfg.icon}</span>
        <div>
          <div class="pt-name">${p.nom || cfg.label}</div>
          <div class="pt-type" style="color:${cfg.color||'#888'}">
            ${cfg.label}
            ${qty ? `<span style="color:${QTY_COLOR[qty]||'#888'};font-weight:700"> · ${qty}</span>` : ''}
            ${date ? ` · ${date}` : ''}
          </div>
        </div>
      </div>
      ${p.note ? `<div class="pt-desc">${p.note}</div>` : ''}
      <div class="pt-coords">📍 ${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</div>
    </div>`;
  }).join('');
}


function updateXP() {
  const done = state.quests_done.length;
  const total = QUETES_RPG.length;
  const pct = Math.round(done / total * 100);
  document.getElementById("xpFill").style.width = pct + "%";
  document.getElementById("globalXpVal").textContent = done + " / " + total + " quêtes · cycle complet";
  renderCycleSaisons();
}


/* ===============================================
   CYCLE DES SAISONS
=============================================== */
function renderCycleSaisons() {
  const el = document.getElementById('cycleSaisons');
  if (!el) return;
  el.innerHTML = SAISONS_CONFIG.map(s => {
    const total = QUETES_RPG.filter(q => ZONE_SAISON[q.zone] === s.id).length;
    const done  = QUETES_RPG.filter(q => ZONE_SAISON[q.zone] === s.id && state.quests_done.includes(q.id)).length;
    const pct   = total > 0 ? Math.round(done / total * 100) : 0;
    return `
    <div class="saison-bloc" onclick="filterQuests('saison-${s.id}', null)">
      <div class="saison-header">
        <span class="saison-emoji">${s.emoji}</span>
        <span class="saison-label">${s.label}</span>
        <span class="saison-count">${done}/${total}</span>
      </div>
      <div class="saison-track">
        <div class="saison-fill" style="width:${pct}%;background:${s.color}"></div>
      </div>
    </div>`;
  }).join('');
}
/* ===============================================
   ZONES
=============================================== */
function renderZones() {
  const grid = document.getElementById("zonesGrid");
  grid.innerHTML = ZONES_RPG.map(z => {
    const unlocked = state.zones_visited.includes(z.id);
    const zQuests = QUETES_RPG.filter(q => q.zone === z.id);
    const doneCnt = zQuests.filter(q => state.quests_done.includes(q.id)).length;
    const pct = zQuests.length ? Math.round(doneCnt / zQuests.length * 100) : 0;
    return `
    <div class="zone-card parch ${unlocked ? '' : 'locked'}" onclick="${unlocked ? 'focusZone('+z.id+')' : ''}">
      ${!unlocked ? '<span class="zone-lock-icon">🔒</span>' : ''}
      <span class="zone-num">${z.id}</span>
      <div class="zone-label">${z.pays} ${z.phase}</div>
      <div class="zone-name">${z.name}</div>
      <div class="zone-period">${z.period}</div>
      <div class="zone-quests-count" style="color:${z.color||'#9a8a70'}">${doneCnt}/${zQuests.length} quêtes · ${pct}%</div>
      <div class="zone-progress"><div class="zone-progress-fill" style="width:${pct}%;background:${z.color}"></div></div>
    </div>`;
  }).join("");
}

function focusZone(id) {
  switchTab("quetes");
  document.querySelectorAll(".tab-btn").forEach((b,i) => { if(i===2) b.classList.add("active"); else b.classList.remove("active"); });
  filterQuestsByZone(id);
}

/* ===============================================
   QUÊTES
=============================================== */
let currentFilter = "all";



/* == CYCLE DES SAISONS — correspondance zone → saison == */
const ZONE_SAISON = {
  // Zones 1-2  : Août–septembre  → Été
  1:'ete', 2:'ete',
  // Zones 3-6  : Octobre–novembre → Automne
  3:'automne', 4:'automne', 5:'automne', 6:'automne',
  // Zones 7-9  : Décembre–février → Hiver
  7:'hiver', 8:'hiver', 9:'hiver',
  // Zones 10-15 : Mars–mai        → Printemps
  10:'printemps', 11:'printemps', 12:'printemps',
  13:'printemps', 14:'printemps', 15:'printemps',
  // Zone 16 : Cycle witch — toute l'année (non compté par saison)
  16: null,
};
const SAISONS_CONFIG = [
  { id:'printemps', label:'Printemps', emoji:'🌸', color:'#7abf6a', zones:[10,11,12,13,14,15] },
  { id:'ete',       label:'Été',       emoji:'☀️', color:'#c8a820', zones:[1,2] },
  { id:'automne',   label:'Automne',   emoji:'🍂', color:'#c87820', zones:[3,4,5,6] },
  { id:'hiver',     label:'Hiver',     emoji:'❄️', color:'#6aaabf', zones:[7,8,9] },
];
/* == QUÊTES WITCH 2.0 — Calendrier des sorcières == */
const WITCH_CALENDAR = {
  "Imbolc":     { month:2,  day:1,  color:"#e8d4f0", saison:"hiver",    zone:"Zone 9 · Galice · Rías Baixas" },
  "Ostara":     { month:3,  day:20, color:"#a8e8a0", saison:"printemps", zone:"Zone 11-12 · Côte Basque · Landes" },
  "Beltane":    { month:5,  day:1,  color:"#f8c860", saison:"printemps", zone:"Zone 13-14 · Saint-Malo" },
  "Litha":      { month:6,  day:21, color:"#ffd040", saison:"été",       zone:"Inter-boucles · Creuse · Millevaches" },
  "Lughnasadh": { month:8,  day:1,  color:"#e8a040", saison:"été",       zone:"Inter-boucles · Millevaches · Tronçais" },
  "Mabon":      { month:9,  day:22, color:"#c87820", saison:"automne",   zone:"Phase 2-3 · Morvan → Lyon" },
  "Samhain":    { month:10, day:31, color:"#8840c8", saison:"automne",   zone:"Phase 4-5 · Cévennes" },
  "Yule":       { month:12, day:21, color:"#60c8f8", saison:"hiver",     zone:"Phase 7-8 · Portugal" }
};

function getWitchInfo(title) {
  for (const [name, info] of Object.entries(WITCH_CALENDAR)) {
    if (title.includes(name)) return { name, ...info };
  }
  return null;
}

function isWitchActive(info) {
  if (!info) return false;
  const today = new Date();
  const fete = new Date(today.getFullYear(), info.month - 1, info.day);
  return Math.abs(today - fete) / (1000*60*60*24) <= 7;
}

function isWitchPast(info) {
  if (!info) return false;
  const today = new Date();
  const fete = new Date(today.getFullYear(), info.month - 1, info.day);
  return (today - fete) > 7*24*60*60*1000;
}

function daysUntilWitch(info) {
  if (!info) return null;
  const today = new Date();
  const fete = new Date(today.getFullYear(), info.month - 1, info.day);
  const diff = Math.round((fete - today) / (1000*60*60*24));
  return diff;
}

function renderQuests(filter) {
  const list = document.getElementById("questList");
  let quests = [...QUETES_RPG];

  if (filter === "done")        quests = quests.filter(q => state.quests_done.includes(q.id));
  else if (filter === "collecte")   quests = quests.filter(q => q.type === "collecte");
  else if (filter === "survie")     quests = quests.filter(q => q.type === "survie");
  else if (filter === "exploration") quests = quests.filter(q => q.type === "exploration");
  else if (filter === "quotidienne") quests = quests.filter(q => q.type === "quotidienne");
  else if (filter === "witch")      quests = quests.filter(q => q.type === "witch");
  else if (filter && filter.startsWith("saison-")) {
    const sid = filter.replace("saison-", "");
    quests = quests.filter(q => ZONE_SAISON[q.zone] === sid);
  }

  const typeEmoji = { collecte:"🌿", survie:"⚔️", exploration:"🗺️", quotidienne:"⚡", witch:"🧙" };
  const typeBg    = { collecte:"#2c4a1a", survie:"#4a1a1a", exploration:"#1a2a4a",
                      quotidienne:"#4a3a1a", witch:"#2a1040" };

  list.innerHTML = quests.map(q => {
    const done = state.quests_done.includes(q.id);
    const zone = ZONES_RPG.find(z => z.id === q.zone);

    // Rendu spécial pour les quêtes witch
    if (q.type === "witch") {
      const witch = getWitchInfo(q.title);
      const active = isWitchActive(witch);
      const past = isWitchPast(witch);
      const daysLeft = witch ? daysUntilWitch(witch) : null;
      const witchColor = witch ? witch.color : "#8840c8";

      let countdownHtml = "";
      if (active) {
        countdownHtml = `<span class="witch-badge now" style="background:${witchColor}">🌙 MAINTENANT</span>`;
      } else if (!past && daysLeft !== null && daysLeft > 0 && daysLeft <= 30) {
        countdownHtml = `<span class="witch-badge soon" style="border-color:${witchColor};color:${witchColor}">dans ${daysLeft}j</span>`;
      } else if (past) {
        countdownHtml = `<span class="witch-badge past">passée</span>`;
      }

      return `
      <div class="quest-card parch witch-card${active ? " witch-active" : ""}${done ? " quest-done" : ""}"
           style="--witch-color:${witchColor}">
        <div class="quest-header" onclick="toggleQuest(${q.id})">
          <div class="quest-type-badge" style="background:${typeBg[q.type]||'#1a1a2a'};border:1px solid ${witchColor}40">
            ${typeEmoji[q.type]}
          </div>
          <div class="quest-info">
            <div class="quest-title" style="${done ? "text-decoration:line-through;opacity:.5" : ""}">
              ${q.title}
            </div>
            <div class="witch-meta">
              ${witch ? `<span class="witch-date-tag" style="color:${witchColor}">${witch.zone}</span>` : ""}
              ${countdownHtml}
            </div>
          </div>
          <div class="quest-status">${done ? "✅" : "○"}</div>
        </div>
        <div class="quest-body" id="qb-${q.id}">
          <p class="quest-desc">"${q.lore}"</p>
          <ul class="quest-objectives">
            ${q.objectives.map(o => `<li class="${done ? "done" : ""}">${o}</li>`).join("")}
          </ul>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
            <span class="quest-reward">🧙 Récompense : ${q.reward}</span>
            <button class="btn btn-primary" onclick="completeQuest(${q.id})">
              ${done ? "↩ Annuler" : "✓ Accomplie"}
            </button>
          </div>
        </div>
      </div>`;
    }

    // Rendu standard
    return `
    <div class="quest-card parch${done ? " quest-done" : ""}">
      <div class="quest-header" onclick="toggleQuest(${q.id})">
        <div class="quest-type-badge" style="background:${typeBg[q.type]||'#1a1a2a'}">${typeEmoji[q.type]||'📍'}</div>
        <div class="quest-info">
          <div class="quest-title" style="${done ? "text-decoration:line-through;opacity:.5" : ""}">${q.title}</div>
          <div class="quest-zone-tag" style="color:${zone?.color||'#9a8a70'}">${zone?.name || ""} · Zone ${q.zone}</div>
        </div>
        <div class="quest-status">${done ? "✅" : "○"}</div>
      </div>
      <div class="quest-body" id="qb-${q.id}">
        <p class="quest-desc">"${q.lore}"</p>
        <ul class="quest-objectives">
          ${q.objectives.map(o => `<li class="${done ? "done" : ""}">${o}</li>`).join("")}
        </ul>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
          <span class="quest-reward">⚗️ Récompense : ${q.reward}</span>
          <button class="btn btn-primary" onclick="completeQuest(${q.id})">
            ${done ? "↩ Annuler" : "✓ Accomplie"}
          </button>
        </div>
      </div>
    </div>`;
  }).join("");
}

function toggleQuest(id) {
  const body = document.getElementById("qb-" + id);
  body.classList.toggle("open");
}

function filterQuests(type, btn) {
  currentFilter = type;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderQuests(type);
}

function filterQuestsByZone(zoneId) {
  const list = document.getElementById("questList");
  const quests = QUETES_RPG.filter(q => q.zone === zoneId);
}


function completeQuest(id, e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const done = BS.getQuetesDone();
  if (!done.includes(id)) {
    BS.completeQuete(id);
    // Débloquer zone suivante si toutes les quêtes de la zone sont faites
    const quest = QUETES_RPG.find(q => q.id === id);
    if (quest) {
      const zoneQuests = QUETES_RPG.filter(q => q.zone === quest.zone);
      const nowDone = BS.getQuetesDone();
      if (zoneQuests.every(q => nowDone.includes(q.id))) {
        const nextZone = quest.zone + 1;
        if (nextZone <= 16) BS.visitZone(nextZone);
      }
    }
  } else {
    BS.uncompleteQuete(id);
  }
  renderQuests(currentFilter);
  renderZones();
  updateXP();
}

/* ===============================================
   INVENTAIRE
=============================================== */
function renderInventory() {
  const grid = document.getElementById("inventoryGrid");
  grid.innerHTML = STOCKS_INITIAUX.map(s => {
    const qty = state.stocks[s.id] || 0;
    const pct = Math.min(100, Math.round(qty / s.max * 100));
    return `<div class="inv-card">
      <div class="inv-top">
        <span class="inv-icon">${s.icon}</span>
        <span class="inv-name">${s.name}</span>
      </div>
      <div class="inv-track"><div class="inv-fill" style="width:${pct}%"></div></div>
      <div class="inv-qty">${qty} / ${s.max} ${s.unit || 'g'}</div>
      <div class="inv-controls">
        <button class="inv-btn" onclick="adjustStock('${s.id}',-50)">−50</button>
        <button class="inv-btn" onclick="adjustStock('${s.id}',50)">+50</button>
        <button class="inv-btn" onclick="adjustStock('${s.id}',200)">+200</button>
      </div>
    </div>`;
  }).join("");
}

function adjustStock(id, delta) {
  BS.updateStock(id, (BS.getStock(id) || 0) + delta);
  renderInventory();

}


/* ===============================================
   KOMMODA 3
=============================================== */
function saveKommoda() {
  const vals = {
    batterie_pct:   parseFloat(document.getElementById('k-batterie').value)   || null,
    assistance:     parseInt(document.getElementById('k-assistance').value)    || null,
    distance_jour:  parseFloat(document.getElementById('k-dist-jour').value)  || null,
    distance_total: parseFloat(document.getElementById('k-dist-total').value) || null,
  };
  BS.setKommoda(vals);
  loadKommoda();
  // Feedback visuel
  const btn = document.querySelector('.kommoda-save-btn');
  btn.textContent = '✓ Enregistré';
  setTimeout(() => btn.textContent = '💾 Enregistrer Kommoda', 1500);
}

function loadKommoda() {
  const k = BS.getKommoda();
  if (!k || !k.timestamp) return;
  const last = document.getElementById('kommoda-last');
  const d = new Date(k.timestamp);
  const fmt = `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  last.innerHTML = `<span style="color:var(--accent);font-size:0.85rem">
    Dernière saisie ${fmt} — 
    🔋 ${k.batterie_pct ?? '—'}% · 
    ⚡ Niv.${k.assistance ?? '—'} · 
    📍 ${k.distance_jour ?? '—'}km aujourd'hui · 
    🛣️ ${k.distance_total ?? '—'}km total
  </span>`;
  // Remplir les inputs avec les dernières valeurs
  if (k.batterie_pct   != null) document.getElementById('k-batterie').value   = k.batterie_pct;
  if (k.assistance     != null) document.getElementById('k-assistance').value = k.assistance;
  if (k.distance_jour  != null) document.getElementById('k-dist-jour').value  = k.distance_jour;
  if (k.distance_total != null) document.getElementById('k-dist-total').value = k.distance_total;
}

// updateStock remplacée par adjustStock

/* ===============================================
   JOURNAL
=============================================== */
function renderJournal() {
  const container = document.getElementById("journalList");
  const sel = document.getElementById("journalZone");

  // Remplir le select des zones
  sel.innerHTML = "<option value=\"\">— Zone / Étape —</option>" +
    ZONES_RPG.map(z => `<option value="${z.name}">${z.pays} Zone ${z.id} — ${z.name}</option>`).join("");

  if (!state.journal.length) {
    container.innerHTML = "<p style=\"font-style:italic;color:var(--ink-light);font-size:.9rem\">Le carnet est vide. La route commence.</p>";
    return;
  }
  container.innerHTML = [...state.journal].reverse().map((e, i) => `
    <div class="journal-entry">
      <button class="journal-entry-delete" onclick="deleteJournalEntry(${state.journal.length - 1 - i})">✕</button>
      <div class="journal-entry-date">${e.date}</div>
      <div class="journal-entry-zone">${e.zone || 'En route'}</div>
      <div class="journal-entry-text">${e.text}</div>
    </div>`).join("");
}

function saveJournalEntry() {
  const text    = document.getElementById("journalText").value.trim();
  const zone    = document.getElementById("journalZone").value;
  const zone_id = parseInt(document.getElementById("journalZone").selectedIndex) || null;
  if (!text) return;
  BS.addJournalEntry({ zone, zone_id, text });
  document.getElementById("journalText").value = "";
  renderJournal();
}

function deleteJournalEntry(idx) {
  if (confirm("Supprimer cette entrée ?")) {
    BS.deleteJournalEntry(idx);
    renderJournal();
  }
}

/* ===============================================
   INIT
=============================================== */
renderZones();
renderQuests("all");
renderInventory();
renderJournal();
updateXP();


/* === INIT === */
document.addEventListener("DOMContentLoaded", initCarnet);

function initCarnet() {
  if (!window.BS) {
    // BS pas encore prêt — réessayer dans 50ms
    setTimeout(initCarnet, 50);
    return;
  }
  updateXP();
  renderZones();
  renderQuests("all");
  renderInventory();
  renderJournal();
  loadKommoda();
  document.getElementById("journalDate").value = new Date().toISOString().slice(0,10);
  const sel = document.getElementById("journalZone");
  ZONES_RPG.forEach(z => {
    const opt = document.createElement("option");
    opt.value = z.id; opt.textContent = z.name;
    sel.appendChild(opt);
  });
  // Hash routing — ouvre directement l'onglet demandé
  const hash = location.hash.replace('#','');
  if (hash && document.getElementById('panel-' + hash)) {
    switchTab(hash);
  } else {
    // Attendre que le layout soit calculé avant d'injecter le SVG
    requestAnimationFrame(() => requestAnimationFrame(buildCarteMap));
  }
})

let carnetMap = null;
let carnetMarkers = [];

function buildCarteMap() {
  const wrap = document.getElementById('mapWrap');
  if (!wrap) return;

  if (carnetMap) { carnetMap.remove(); carnetMap = null; carnetMarkers = []; }

  wrap.style.height = '60vh';
  void wrap.offsetHeight;

  carnetMap = new maplibregl.Map({
    container: 'mapWrap',
    style: typeof mlStyle === 'function' ? mlStyle() : 'https://demotiles.maplibre.org/style.json',
    center: [2.5, 46.5],
    zoom: 5
  });

  carnetMap.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

  onMapReady(carnetMap, () => {
    // Points par défaut chargés par terrain.js depuis waypoints.json
    // Placer les observations
    const obs = BS.getObservations();

    obs.forEach(p => {
      if (!p.lat || !p.lng) return;
      const cfg = OBS_TYPE_CFG[p.type] || OBS_TYPE_CFG.autre;
      const el = document.createElement('div');
      el.innerHTML = cfg.icon;
      el.style.cssText = `width:28px;height:28px;border-radius:50%;background:${cfg.color||'#888'};border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:.85rem;box-shadow:0 1px 6px rgba(0,0,0,.4);cursor:pointer`;
      const qtyLabel = {absent:'vide',rare:'rare',moyen:'moyen',abondant:'abondant'}[p.quantite]||'';
      const popupHtml = `<div style="font-family:'DM Sans',sans-serif;min-width:180px;padding:.2rem">
        <div style="font-weight:700;font-size:.95rem;margin-bottom:.3rem">${cfg.icon} ${p.nom||cfg.label}</div>
        ${qtyLabel?`<div style="font-size:.78rem;color:#666;margin-bottom:.25rem">Abondance : <b>${qtyLabel}</b></div>`:''}
        ${p.note?`<div style="font-size:.82rem;color:#444;margin-bottom:.25rem">${p.note}</div>`:''}
        <div style="font-size:.68rem;color:#999;margin-top:.3rem">${new Date(p.timestamp||Date.now()).toLocaleDateString('fr')}</div>
      </div>`;
      const popup = new maplibregl.Popup({ maxWidth:'260px', offset:0 }).setHTML(popupHtml);
      const m = new maplibregl.Marker({ element:el, anchor:'center' }).setLngLat([p.lng,p.lat]).setPopup(popup).addTo(carnetMap);
      carnetMarkers.push(m);
    });

    // Zoomer sur les observations si présentes
    if (carnetMarkers.length > 0) {
      const coords = obs.filter(p=>p.lat&&p.lng);
      if (coords.length === 1) {
        carnetMap.flyTo({ center:[coords[0].lng, coords[0].lat], zoom:13 });
      } else {
        const lngs = coords.map(p=>p.lng), lats = coords.map(p=>p.lat);
        carnetMap.fitBounds([[Math.min(...lngs),Math.min(...lats)],[Math.max(...lngs),Math.max(...lats)]],
          { padding:40, duration:500 });
      }
    }
  });

  // Clic sur la carte → popup création de point
  carnetMap.on('click', function(e) {
    const lat = e.lngLat.lat.toFixed(5);
    const lng = e.lngLat.lng.toFixed(5);
    const types = Object.entries(OBS_TYPE_CFG).filter(([k]) => k !== 'autre');
    const btns = types.map(([k,v]) =>
      `<button onclick="mapPopupSetType(this,'${k}')" data-type="${k}"
        style="width:36px;height:36px;border-radius:8px;border:2px solid transparent;
               background:rgba(0,0,0,.06);font-size:1.05rem;cursor:pointer"
        title="${v.label}">${v.icon}</button>`
    ).join('');
    const html = `
      <div id="mapNewPoint" style="font-family:'DM Sans',sans-serif;min-width:210px">
        <div style="font-size:.75rem;color:#888;margin-bottom:.5rem">📍 ${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}</div>
        <div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:.55rem">${btns}</div>
        <input id="mpNom" placeholder="Nom (optionnel)"
          style="width:100%;box-sizing:border-box;padding:.3rem .45rem;border:1px solid #ccc;
                 border-radius:6px;font-size:.82rem;margin-bottom:.4rem"/>
        <textarea id="mpNote" placeholder="Note…" rows="2"
          style="width:100%;box-sizing:border-box;padding:.3rem .45rem;border:1px solid #ccc;
                 border-radius:6px;font-size:.82rem;resize:none;margin-bottom:.5rem"></textarea>
        <button onclick="mapPopupSave(${lat},${lng})"
          style="width:100%;padding:.4rem;background:#3a6e28;color:#fff;border:none;
                 border-radius:8px;font-size:.84rem;font-weight:600;cursor:pointer">
          ✓ Enregistrer
        </button>
      </div>`;
    new maplibregl.Popup({ maxWidth:'280px', closeButton:true })
      .setLngLat(e.lngLat)
      .setHTML(html)
      .addTo(carnetMap);
    setTimeout(() => {
      const first = document.querySelector('#mapNewPoint button[data-type]');
      if (first) mapPopupSetType(first, first.dataset.type);
    }, 30);
  });

  renderSpotsGrid();
}

let mapPopupType = 'cueillette';

function mapPopupSetType(btn, type) {
  mapPopupType = type;
  document.querySelectorAll('#mapNewPoint button[data-type]').forEach(b => {
    const cfg = OBS_TYPE_CFG[b.dataset.type] || OBS_TYPE_CFG.autre;
    b.style.border = b.dataset.type === type
      ? `2px solid ${cfg.color}`
      : '2px solid transparent';
    b.style.background = b.dataset.type === type
      ? `${cfg.color}33`
      : 'rgba(0,0,0,.06)';
  });
}

function mapPopupSave(lat, lng) {
  const nom  = (document.getElementById('mpNom')?.value  || '').trim();
  const note = (document.getElementById('mpNote')?.value || '').trim();
  const cfg  = OBS_TYPE_CFG[mapPopupType] || OBS_TYPE_CFG.autre;
  BS.addObservation({
    lat: parseFloat(lat), lng: parseFloat(lng),
    type: mapPopupType,
    nom: nom || cfg.label,
    note,
    quantite: 'moyen',
    timestamp: new Date().toISOString()
  });
  document.querySelectorAll('.maplibregl-popup').forEach(p => p.remove());
  buildCarteMap();
}

function renderSpotsGrid() {
  const grid = document.getElementById('spotsGrid');
  if (!grid) return;
  const obs = BS.getObservations();
  if (!obs.length) {
    grid.innerHTML = '<p class="spots-empty">Aucun point enregistré — utilisez Observer pour ajouter vos premiers spots.</p>';
    return;
  }
  grid.innerHTML = obs.map(p => {
    const cfg = OBS_TYPE_CFG[p.type] || OBS_TYPE_CFG.autre;
    const qty = { absent:'vide', rare:'rare', moyen:'moyen', abondant:'abondant' }[p.quantite] || '';
    const date = p.timestamp ? new Date(p.timestamp).toLocaleDateString('fr', { day:'numeric', month:'short' }) : '';
    return `<div class="spot-card" onclick="carnetMap && carnetMap.setView([${p.lat},${p.lng}],13)">
      <div class="spot-hdr">
        <span class="spot-icon" style="background:${cfg.color||'#888'}">${cfg.icon}</span>
        <div class="spot-meta">
          <div class="spot-name">${p.nom || cfg.label}</div>
          <div class="spot-type" style="color:${cfg.color||'#888'}">${cfg.label}${qty ? ' · ' + qty : ''}</div>
        </div>
        ${date ? `<div class="spot-date">${date}</div>` : ''}
      </div>
      ${p.note ? `<div class="spot-note">${p.note}</div>` : ''}
    </div>`;
  }).join('');
}
