/* ══════════════════════════════════════════════════════
   MAPLIBRE + PMTILES — Init protocole
══════════════════════════════════════════════════════ */
if (typeof pmtiles !== 'undefined') {
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);
}


/* ══════════════════════════════════════════════════════
   PWA — Service Worker & Installation
══════════════════════════════════════════════════════ */
let interMarkeurs = [];
// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('SW enregistré :', reg.scope);
        // Proposer la mise à jour si nouvelle version disponible
        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing;
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Nouvelle version disponible');
            }
          });
        });
      })
      .catch(err => console.warn('SW échec :', err));
  });
}

// Installation PWA — gérée nativement par le navigateur


/* ══════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════ */
let gpxReady = false;      // true dès que gpx.js est chargé
let gpxLoading = false;    // true pendant le chargement

/* Charge gpx.js une seule fois à la demande, puis exécute callback */
function loadGPX(callback) {
  if (gpxReady) { callback(); return; }
  if (gpxLoading) { setTimeout(() => loadGPX(callback), 100); return; }
  gpxLoading = true;

  // Indicateur visuel
  const indicator = document.getElementById('gpx-loading');
  if (indicator) indicator.style.display = 'block';

  const script = document.createElement('script');
  script.src = 'gpx.js';
  script.onload = () => {
    gpxReady = true;
    gpxLoading = false;
    if (indicator) indicator.style.display = 'none';
    callback();
  };
  script.onerror = () => {
    gpxLoading = false;
    if (indicator) indicator.textContent = '⚠ Tracés GPX indisponibles (mode hors ligne ?)';
    callback(); // on continue quand même sans GPX
  };
  document.head.appendChild(script);
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));

  const section = document.getElementById(id);
  if (section) section.classList.add('active');

  const bnBtn = document.getElementById('bn-' + id);
  if (bnBtn) bnBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });


  if (id === 'laboucle') {
    const activeTab = document.querySelector('.boucle-tab.active');
    const which = activeTab && activeTab.id === 'tab-retour' ? 'retour'
                : activeTab && activeTab.id === 'tab-inter'  ? 'inter' : 'aller';
    loadGPX(() => setTimeout(() => switchBoucle(which), 50));
  }
}

/* ══════════════════════════════════════════════════════
   TERRAIN — onglets internes Nutrition / Techniques
══════════════════════════════════════════════════════ */
function switchTerrain(which, btn) {
  document.querySelectorAll('.terrain-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.terrain-tab').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tpanel-' + which);
  if (panel) panel.style.display = '';
  if (btn) btn.classList.add('active');
}

function toggleAcc(header) {
  header.parentElement.classList.toggle('open');
}

/* ══════════════════════════════════════════════════════
   RECETTES
══════════════════════════════════════════════════════ */
let currentFilter = 'all';

function filterRecipes(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRecipes();
}

function renderRecipes() {
  const grid = document.getElementById('recipesGrid');
  const list = currentFilter === 'all' ? RECIPES : RECIPES.filter(r => r.cat.includes(currentFilter));
  grid.innerHTML = list.map(r => {
    const idx = RECIPES.indexOf(r);
    return `
    <div class="recipe-card" onclick="openRecipe(${idx})">
      <div class="recipe-stripe" style="background:${r.color}"></div>
      <div class="recipe-body">
        <span class="recipe-emoji">${r.emoji}</span>
        <div class="recipe-name">${r.name}</div>
        <div class="recipe-desc">${r.desc}</div>
        <div class="recipe-meta">
          <span>⏱ ${r.time}</span>
          <span>📊 ${r.diff}</span>
          ${r.tags.map(t => `<span class="recipe-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
}

function openRecipe(i) {
  const r = RECIPES[i];
  document.getElementById('modalBody').innerHTML = `
    <div style="height:4px;background:${r.color};border-radius:2px;margin-bottom:1.2rem"></div>
    <h2>${r.emoji} ${r.name}</h2>
    <p class="m-sub">⏱ ${r.time} &nbsp;·&nbsp; 📊 ${r.diff} &nbsp;·&nbsp; ${r.tags.map(t => `<span style="text-transform:uppercase;font-weight:700">${t}</span>`).join(' / ')}</p>
    <p style="font-style:italic;color:var(--mud);font-size:.88rem;margin-bottom:.5rem">${r.desc}</p>
    ${r.warn ? `<div class="warn">⚠️ Cette recette nécessite une identification botanique certaine avant toute consommation.</div>` : ''}
    <div class="m-sec">Ingrédients</div>
    <ul>${r.ing.map(x => `<li>${x}</li>`).join('')}</ul>
    <div class="m-sec">Préparation</div>
    <ol>${r.steps.map(x => `<li>${x}</li>`).join('')}</ol>
    ${r.tip ? `<div class="ok">💡 ${r.tip}</div>` : ''}
  `;
  document.getElementById('recipeModal').classList.add('open');
}

function closeModalOv(e) { if (e.target === document.getElementById('recipeModal')) closeModal(); }
function closeModal() { document.getElementById('recipeModal').classList.remove('open'); }



/* ══════════════════════════════════════════════════════
   BOUCLE — onglets aller / retour / inter
══════════════════════════════════════════════════════ */
function switchBoucle(which) {
  const panels = {
    aller:  document.getElementById('boucle-aller'),
    retour: document.getElementById('boucle-retour'),
    inter:  document.getElementById('boucle-inter'),
  };
  const tabs = {
    aller:  document.getElementById('tab-aller'),
    retour: document.getElementById('tab-retour'),
    inter:  document.getElementById('tab-inter'),
  };

  // Masquer tout
  Object.values(panels).forEach(el => { if (el) el.style.display = 'none'; });
  Object.values(tabs).forEach(el => { if (el) el.classList.remove('active'); });

  // Afficher le bon panneau
  if (panels[which]) panels[which].style.display = '';
  if (tabs[which])   tabs[which].classList.add('active');

  if (which === 'retour') {
    setTimeout(renderTrajRetour, 50);
  } else if (which === 'inter') {
    setTimeout(() => {
      renderInterBoucle();
      setTimeout(() => { if (interMap) interMap.invalidateSize(); }, 200);
    }, 50);
  } else {
    setTimeout(renderTrajComplet, 50);
  }
}

/* ══════════════════════════════════════════════════════
   TRAJET COMPLET — Artemps → Lagos
══════════════════════════════════════════════════════ */
let tcMap = null;
let tcMarkeurs = [];
let gpxAllerLayer = null;

function makeMlMap(containerId, center, zoom) {
  return new maplibregl.Map({
    container: containerId,
    style: mlStyle(),
    center: center,
    zoom: zoom
  });
}

function addGpxLine(map, coords, color, sourceId) {
  if (!coords || !coords.length) return;
  const geojson = {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: coords.map(c => [c[1], c[0]]) }
  };
  if (map.getSource(sourceId)) {
    map.getSource(sourceId).setData(geojson);
  } else {
    map.addSource(sourceId, { type: 'geojson', data: geojson });
    map.addLayer({ id: sourceId, type: 'line', source: sourceId,
      paint: { 'line-color': color, 'line-width': 3, 'line-opacity': 0.85 }
    });
  }
}

function addMlMarker(map, lat, lng, color, size, popupHtml, markersArr) {
  const el = document.createElement('div');
  el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4);cursor:pointer`;
  const popup = new maplibregl.Popup({ maxWidth: '280px', offset: size/2 }).setHTML(popupHtml);
  const m = new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).setPopup(popup).addTo(map);
  if (markersArr) markersArr.push(m);
  return m;
}

function fitMlBounds(map, coords, padding) {
  if (!coords.length) return;
  const lngs = coords.map(c => c[1]);
  const lats = coords.map(c => c[0]);
  map.fitBounds([[Math.min(...lngs), Math.min(...lats)],[Math.max(...lngs), Math.max(...lats)]],
    { padding: padding || 40, duration: 500 });
}

function initTCMap() {
  if (tcMap) return;
  tcMap = makeMlMap('tcMap', [-1.5, 44.5], 5);
  tcMap.on('load', () => {
    if (window.GPX_ALLER) addGpxLine(tcMap, GPX_ALLER, '#2c3e1a', 'gpx-aller');
  });
}

function renderTrajComplet() {
  initTCMap();
  // Nettoyer
  tcMarkeurs.forEach(m => m.remove());
  tcMarkeurs = [];

  const phaseChecks = document.querySelectorAll('.tc-phase-check');
  const visiblePhases = new Set();
  phaseChecks.forEach(cb => { if (cb.checked) visiblePhases.add(parseInt(cb.dataset.phase)); });

  const allCoords = [];

  TRAJET_COMPLET.phases.forEach(phase => {
    if (!visiblePhases.has(phase.num)) return;
    const coords = phase.etapes.map(e => [e.lat, e.lng]);
    allCoords.push(...coords);
    // Pas de polyline ligne-droite — le tracé réel est dans le calque GPX

    phase.etapes.forEach((e, i) => {
      const isSpecial = e.type === 'depart' || e.type === 'arrivee' || e.type === 'jonction';
      const size = isSpecial ? 16 : 10;
      const border = e.type === 'arrivee' ? '3px solid gold' : '2px solid white';
      const ressStr = e.ressources.map(r => `<li>${r}</li>`).join('');
      const popup = `<div style="font-family:serif;max-width:260px">
        <div style="font-weight:700;font-size:.95rem;margin-bottom:.3rem">${e.nom}</div>
        <div style="font-size:.7rem;color:#888;margin-bottom:.5rem">${phase.label} · ${phase.mois} · km ${e.km}</div>
        <div style="font-size:.78rem;color:#555;margin-bottom:.5rem">${e.note}</div>
        <ul style="padding-left:1rem;font-size:.75rem;color:#333;margin:0">${ressStr}</ul>
      </div>`;
      addMlMarker(tcMap, e.lat, e.lng, phase.color, size, popup, tcMarkeurs);
    });
  });

  if (allCoords.length > 1) fitMlBounds(tcMap, allCoords, 40);
  renderTCList();
}

function renderTCList() {
  const container = document.getElementById('tcList');
  if (!container) return;
  const phaseChecks = document.querySelectorAll('.tc-phase-check');
  const visiblePhases = new Set();
  phaseChecks.forEach(cb => { if (cb.checked) visiblePhases.add(parseInt(cb.dataset.phase)); });

  let html = '';
  let kmCumul = 0;
  TRAJET_COMPLET.phases.forEach(phase => {
    if (!visiblePhases.has(phase.num)) return;
    html += `<div class="tc-phase-block" style="border-left:4px solid ${phase.color};padding-left:1rem;margin-bottom:2rem">
      <div class="tc-phase-header">
        <span class="tc-phase-badge" style="background:${phase.color}">${phase.pays} ${phase.label}</span>
        <span class="tc-phase-meta">${phase.mois} · ${phase.km} · ${phase.jours}</span>
      </div>
      ${phase.stocks ? `<div style="font-family:var(--font-mono);font-size:.65rem;letter-spacing:.07em;color:var(--cream);background:rgba(74,112,53,.12);border:1px solid rgba(74,112,53,.3);border-radius:2px;padding:.3rem .7rem;margin-bottom:.7rem">📦 STOCKS : ${phase.stocks}</div>` : ''}
      <p class="tc-phase-intro">${phase.intro}</p>
      <div class="tc-etapes">`;
    phase.etapes.forEach(e => {
      const starRes = e.ressources.filter(r => r.includes('★★★'));
      const resHTML = e.ressources.map(r => {
        const stars = (r.match(/★/g)||[]).length;
        const cls = stars >= 3 ? 'tc-res-top' : stars >= 2 ? 'tc-res-mid' : 'tc-res-base';
        return `<span class="tc-res-tag ${cls}">${r}</span>`;
      }).join('');
      const typeIcon = { depart:'🚩', arrivee:'🏁', jonction:'🔀', cueillette:'🌿', halte:'🏕️', bivouac:'⛺' }[e.type] || '📍';
      html += `<div class="tc-etape ${e.type === 'arrivee' ? 'tc-etape-final' : ''}">
        <div class="tc-etape-head">
          <span class="tc-etape-icon">${typeIcon}</span>
          <span class="tc-etape-nom">${e.nom}</span>
          <span class="tc-etape-km">km ${e.km}</span>
        </div>
        <div class="tc-res-list">${resHTML}</div>
        <div class="tc-etape-note">${e.note}</div>
      </div>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;
}

function tcToggleAll(check) {
  document.querySelectorAll('.tc-phase-check').forEach(cb => cb.checked = check);
  renderTrajComplet();
}

/* ══════════════════════════════════════════════════════
   TRAJET RETOUR — Lagos → Artemps
══════════════════════════════════════════════════════ */
let trMap = null;
let trMarkeurs = [];

function initTRMap() {
  if (trMap) return;
  trMap = makeMlMap('trMap', [-3, 46], 5);
  trMap.on('load', () => {
    if (window.GPX_RETOUR) addGpxLine(trMap, GPX_RETOUR, '#2d5c7a', 'gpx-retour');
  });
}

function renderTrajRetour() {
  initTRMap();
  trMarkeurs.forEach(m => m.remove());
  trMarkeurs = [];

  const checks = document.querySelectorAll('.tr-phase-check');
  const visible = new Set();
  checks.forEach(cb => { if (cb.checked) visible.add(parseInt(cb.dataset.phase)); });

  const allCoords = [];

  TRAJET_RETOUR.phases.forEach(phase => {
    if (!visible.has(phase.num)) return;
    const coords = phase.etapes.map(e => [e.lat, e.lng]);
    allCoords.push(...coords);
    // Tracé réel dans calque GPX — pas de polyline ligne-droite

    phase.etapes.forEach(e => {
      const isSpecial = e.type === 'depart' || e.type === 'arrivee';
      const size = isSpecial ? 16 : 10;
      const ressStr = e.ressources.map(r => `<li>${r}</li>`).join('');
      const popup = `<div style="font-family:serif;max-width:260px">
        <div style="font-weight:700;font-size:.95rem;margin-bottom:.3rem">${e.nom}</div>
        <div style="font-size:.7rem;color:#888;margin-bottom:.4rem">${phase.label} · ${phase.mois} · km ${e.km}</div>
        <div style="font-size:.78rem;color:#555;margin-bottom:.4rem">${e.note}</div>
        <ul style="padding-left:1rem;font-size:.75rem;color:#333;margin:0">${ressStr}</ul>
      </div>`;
      addMlMarker(trMap, e.lat, e.lng, phase.color, size, popup, trMarkeurs);
    });
  });

  if (allCoords.length > 1) fitMlBounds(trMap, allCoords, 40);
  renderTRList();
}

function renderTRList() {
  const container = document.getElementById('trList');
  if (!container) return;
  const checks = document.querySelectorAll('.tr-phase-check');
  const visible = new Set();
  checks.forEach(cb => { if (cb.checked) visible.add(parseInt(cb.dataset.phase)); });

  let html = '';
  TRAJET_RETOUR.phases.forEach(phase => {
    if (!visible.has(phase.num)) return;
    html += `<div class="tc-phase-block" style="border-left:4px solid ${phase.color};padding-left:1rem;margin-bottom:2rem">
      <div class="tc-phase-header">
        <span class="tc-phase-badge" style="background:${phase.color}">${phase.pays} ${phase.label}</span>
        <span class="tc-phase-meta">${phase.mois} · ${phase.km} · ${phase.jours}</span>
      </div>
      <p class="tc-phase-intro">${phase.intro}</p>
      <div class="tc-etapes">`;
    phase.etapes.forEach(e => {
      const resHTML = e.ressources.map(r => {
        const stars = (r.match(/★/g)||[]).length;
        const cls = stars >= 3 ? 'tc-res-top' : stars >= 2 ? 'tc-res-mid' : 'tc-res-base';
        return `<span class="tc-res-tag ${cls}">${r}</span>`;
      }).join('');
      const typeIcon = { depart:'🚩', arrivee:'🏁', cueillette:'🌿', halte:'🏕️', bivouac:'⛺' }[e.type] || '📍';
      html += `<div class="tc-etape ${e.type === 'arrivee' ? 'tc-etape-final' : ''}">
        <div class="tc-etape-head">
          <span class="tc-etape-icon">${typeIcon}</span>
          <span class="tc-etape-nom">${e.nom}</span>
          <span class="tc-etape-km">km ${e.km}</span>
        </div>
        <div class="tc-res-list">${resHTML}</div>
        <div class="tc-etape-note">${e.note}</div>
      </div>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;
}

function trToggleAll(check) {
  document.querySelectorAll('.tr-phase-check').forEach(cb => cb.checked = check);
  renderTrajRetour();
}

/* ══════════════════════════════════════════════════════
   INTER-BOUCLES — Carte dédiée
══════════════════════════════════════════════════════ */
let interMap = null;

function renderInterBoucle() {
  // ── Init carte (même pattern que initTRMap) ──────────
  if (!interMap) {
    interMap = makeMlMap('interMap', [3.0, 47.5], 6);
    interMap.on('load', () => {
      if (window.GPX_BOUCLE) addGpxLine(interMap, GPX_BOUCLE, '#c84a2a', 'gpx-boucle');
    });
  }

  // ── Nettoyer marqueurs ───────────────────────────────
  interMarkeurs.forEach(m => m.remove());
  interMarkeurs = [];

  const SEG_COLORS = { liaison_aller: '#c8a820', creuse: '#4a7a2a', remontee: '#9abf6a' };
  const SEG_LABELS = {
    liaison_aller: '🛤️ Liaison Artemps → Creuse · Mi-mai · ~550 km',
    creuse:        '🌲 Creuse & Millevaches · Fin mai → début août',
    remontee:      '🏔️ Tronçais → Artemps · Début août · ~550 km',
  };
  const MOIS = ['','Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'];

  const allCoords = [];

  if (window.INTER_BOUCLE_POINTS) {
    INTER_BOUCLE_POINTS.forEach(p => {
      allCoords.push([p.lat, p.lng]);
      const color = SEG_COLORS[p.segment] || '#9abf6a';
      const isSpecial = p.type === 'depart' || p.type === 'arrivee';
      const size = isSpecial ? 16 : 10;
      const moisLabel = Array.isArray(p.mois) ? p.mois.map(m => MOIS[m]).join('/') : '';
      const popup = `<div style="font-family:serif;max-width:260px">
        <div style="font-weight:700;font-size:.95rem;margin-bottom:.3rem">${p.nom}</div>
        <div style="font-size:.7rem;color:#888;margin-bottom:.5rem">${SEG_LABELS[p.segment] || ''} · 📅 ${moisLabel}</div>
        <div style="font-size:.78rem;color:#555;margin-bottom:.5rem">${p.desc}</div>
        ${p.alerte ? `<div style="font-size:.72rem;color:#c8882a;margin-top:.3rem">⚠️ ${p.alerte}</div>` : ''}
      </div>`;
      addMlMarker(interMap, p.lat, p.lng, color, size, popup, interMarkeurs);
    });
  }

  if (allCoords.length > 1) fitMlBounds(interMap, allCoords, 30);
  else if (window.GPX_BOUCLE) fitMlBounds(interMap, GPX_BOUCLE, 20);

  // ── Liste segments ───────────────────────────────────
  const container = document.getElementById('interContent');
  if (container && window.INTER_BOUCLE_SEGMENTS) {
    container.innerHTML = INTER_BOUCLE_SEGMENTS.map(seg => {
      const pts = (INTER_BOUCLE_POINTS || []).filter(p => p.segment === seg.id);
      return `<div class="tc-phase-block">
        <div class="tc-phase-header" onclick="this.parentElement.classList.toggle('open')">
          <span class="tc-phase-badge" style="background:${seg.color}">${seg.emoji}</span>
          <div style="flex:1">
            <div class="tc-phase-intro">${seg.label}</div>
            <div class="tc-phase-meta">${seg.mois} · ${seg.km} · ${seg.jours}</div>
          </div>
          <span class="tc-chevron">▾</span>
        </div>
        <div class="tc-etapes">
          <div class="tc-etape" style="border-left:3px solid ${seg.color};padding-left:.8rem;margin-bottom:.8rem">
            <div style="font-size:.78rem;color:#9abf6a;margin-bottom:.3rem">🎯 Objectif</div>
            <div style="font-size:.82rem">${seg.objectif_principal}</div>
          </div>
          <div class="tc-etape" style="border-left:3px solid ${seg.color};padding-left:.8rem;margin-bottom:.8rem">
            <div style="font-size:.78rem;color:#9abf6a;margin-bottom:.3rem">🌿 Ressources</div>
            <div class="tc-res-list">${seg.ressources.map(r => `<span class="tc-res-tag">${r}</span>`).join('')}</div>
          </div>
          ${seg.alerte ? `<div class="tc-etape" style="border-left:3px solid #c8882a;padding-left:.8rem;margin-bottom:.8rem">
            <div style="font-size:.72rem;color:#c8882a">⚠️ ${seg.alerte}</div>
          </div>` : ''}
          ${pts.map(p => `<div class="tc-etape">
            <div class="tc-etape-head">
              <span class="tc-etape-nom">${p.nom}</span>
              <span class="tc-etape-km" style="font-size:.65rem">${Array.isArray(p.mois) ? p.mois.map(m => ['','Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'][m]).join('/') : ''}</span>
            </div>
            <div class="tc-etape-note">${p.desc}</div>
          </div>`).join('')}
        </div>
      </div>`;
    }).join('');
  }
}

