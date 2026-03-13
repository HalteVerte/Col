/* ═══════════════════════════════════════════════════════════════
   6BL.JS — Moteur de décision terrain
   Lit BS directement, météo via cache localStorage + open-meteo
   ═══════════════════════════════════════════════════════════════ */

const SBL = (() => {

  /* ── Constantes ─────────────────────────────────────────────── */
  const METEO_CACHE_KEY  = 'sbl_meteo_cache';
  const METEO_MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6h

  // STOCKS_MAX chargé depuis stocks.js (source unique)
  const STOCKS_MAX = window.STOCKS_MAX || {
    myrtilles:500, faines:1000, noisettes:800, champignons:400,
    chataignes:2000, noix:1500, pignons:600, algues:300,
    cynorhodons:400, zestes:200, farine_gland:1000, caroube:500,
  };

  // Seuils saisonniers (% du max) — zone verte min, orange min, rouge = < orange
  const SEUILS_SAISON = {
    10: { vert: 90, orange: 75 },  // Octobre — après récolte
    11: { vert: 80, orange: 65 },
    12: { vert: 70, orange: 55 },  // Décembre
     1: { vert: 60, orange: 45 },
     2: { vert: 50, orange: 35 },  // Février
     3: { vert: 30, orange: 20 },  // Mars — soudure
     4: { vert: 30, orange: 20 },  // Avril — soudure
     5: { vert: 20, orange: 12 },
     6: { vert: 15, orange:  8 },  // Juin
     7: { vert: 10, orange:  5 },  // Été
     8: { vert: 10, orange:  5 },
     9: { vert: 40, orange: 25 },  // Septembre — début reconstitution
  };

  const MOIS_LABEL = ['','Janvier','Février','Mars','Avril','Mai','Juin',
                      'Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const JOURS      = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const MOIS_SAISON = {
    printemps:[3,4,5], ete:[6,7,8], automne:[9,10,11], hiver:[12,1,2]
  };
  const TYPE_ICON = {
    cueillette:'🌿', champignon:'🍄', peche:'🎣', eau:'💧',
    recharge:'⚡', bivouac:'🏕️', danger:'⚠️', abri:'🛖',
    ravitaillement:'🛒', halte:'🏠', autre:'📍'
  };
  const VENT_DIR = ['N','NNE','NE','ENE','E','ESE','SE','SSE',
                    'S','SSO','SO','OSO','O','ONO','NO','NNO'];

  /* ── Helpers ─────────────────────────────────────────────────── */
  function ventDir(deg) { return VENT_DIR[Math.round(deg / 22.5) % 16]; }

  function moisCourant() { return new Date().getMonth() + 1; }

  function estEnSaison(obs) {
    const mois = moisCourant();
    for (const mois_arr of Object.values(MOIS_SAISON)) {
      if (mois_arr.includes(mois) && obs.saison) {
        const saisonMois = MOIS_SAISON[obs.saison];
        return saisonMois && saisonMois.includes(mois);
      }
    }
    return false;
  }

  function distKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
              Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  /* ── Astronomie locale (offline) ────────────────────────────── */
  function sunTimes(lat, lng) {
    const now = new Date();
    const rad = Math.PI / 180;
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const decl = -23.45 * Math.cos(rad * (360 / 365) * (dayOfYear + 10));
    const ha   = Math.acos(-Math.tan(lat * rad) * Math.tan(decl * rad)) / rad;
    const rise = 12 - ha / 15 - lng / 15;
    const set  = 12 + ha / 15 - lng / 15;
    const fmt  = h => {
      h = ((h % 24) + 24) % 24;
      return `${String(Math.floor(h)).padStart(2,'0')}:${String(Math.round((h%1)*60)).padStart(2,'0')}`;
    };
    return { lever: fmt(rise), coucher: fmt(set), duree_h: Math.round((set-rise)*10)/10 };
  }

  function moonPhase() {
    const known = new Date('2000-01-06');
    const diff  = (new Date() - known) / 86400000;
    const cycle = 29.53058867;
    const phase = ((diff % cycle) + cycle) % cycle;
    const labels = ['🌑 Nouvelle lune','🌒 Premier croissant','🌓 Premier quartier',
                    '🌔 Gibbeuse croissante','🌕 Pleine lune','🌖 Gibbeuse décroissante',
                    '🌗 Dernier quartier','🌘 Dernier croissant'];
    return { phase_jours: Math.round(phase*10)/10, label: labels[Math.floor(phase/(cycle/8))] };
  }

  function tideSimple(lat, lng) {
    const isCostal = Math.abs(lat) < 60 && (lng < 3 || lng > 8);
    if (!isCostal) return null;
    const t     = Date.now() / 3600000;
    const M2    = 12.4206;
    const phase = (t % M2) / M2;
    const h     = Math.cos(phase * 2 * Math.PI);
    const nextH = M2 * (1 - phase);
    const nextL = M2 * (0.5 - phase > 0 ? 0.5 - phase : 1.5 - phase);
    return {
      hauteur_relative: Math.round(h*100)/100,
      etat: h > 0.3 ? 'montante' : h < -0.3 ? 'descendante' : 'étale',
      prochaine_haute_h: Math.round(nextH*10)/10,
      prochaine_basse_h: Math.round(Math.min(nextL, nextH)*10)/10,
    };
  }

  /* ── Météo — cache localStorage + open-meteo ─────────────────── */
  async function getMeteo(lat, lng) {
    // 1. Vérifier cache
    try {
      const cached = JSON.parse(localStorage.getItem(METEO_CACHE_KEY) || 'null');
      if (cached && cached.timestamp) {
        const age = Date.now() - cached.timestamp;
        if (age < METEO_MAX_AGE_MS) {
          const ageH = Math.round(age / 3600000 * 10) / 10;
          return { ...cached.data, cache_age_h: ageH, source: `open-meteo (cache ${ageH}h)` };
        }
      }
    } catch(e) {}

    // 2. Fetch frais
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&current_weather=true&daily=precipitation_sum,windspeed_10m_max,temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=3`;
      const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!r.ok) throw new Error('http ' + r.status);
      const d  = await r.json();
      const cw = d.current_weather;
      const WMO = {0:'☀️ Dégagé',1:'🌤 Peu nuageux',2:'⛅ Partiellement nuageux',
                   3:'☁️ Couvert',51:'🌦 Bruine',61:'🌧 Pluie légère',63:'🌧 Pluie modérée',
                   65:'🌧 Pluie forte',71:'❄️ Neige légère',80:'🌦 Averses',
                   95:'⛈ Orage',96:'⛈ Orage grêle'};
      const data = {
        temperature_c:   cw.temperature,
        vent_kmh:        Math.round(cw.windspeed),
        direction_vent:  cw.winddirection,
        meteo:           WMO[cw.weathercode] || `Code ${cw.weathercode}`,
        previsions_3j:   d.daily ? {
          dates:    d.daily.time,
          temp_max: d.daily.temperature_2m_max,
          temp_min: d.daily.temperature_2m_min,
          pluie_mm: d.daily.precipitation_sum,
          vent_max: d.daily.windspeed_10m_max,
        } : null,
        source: 'open-meteo.com',
        cache_age_h: 0,
      };
      // Sauvegarder en cache
      localStorage.setItem(METEO_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
      return data;
    } catch(e) {
      // 3. Cache périmé mais disponible
      try {
        const cached = JSON.parse(localStorage.getItem(METEO_CACHE_KEY) || 'null');
        if (cached?.data) {
          const ageH = Math.round((Date.now() - cached.timestamp) / 3600000 * 10) / 10;
          return { ...cached.data, cache_age_h: ageH, source: `cache périmé (${ageH}h) ⚠️` };
        }
      } catch(e2) {}
      return { source: 'offline', note: 'météo indisponible — pas de connexion ni de cache' };
    }
  }

  /* ── GPS ─────────────────────────────────────────────────────── */
  function getGPS() {
    return new Promise(resolve => {
      if (!navigator.geolocation) { resolve(null); return; }
      navigator.geolocation.getCurrentPosition(
        p => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, precision_m: Math.round(p.coords.accuracy) }),
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
      );
    });
  }

  /* ── Analyse stocks ──────────────────────────────────────────── */
  function analyseStocks(stocks) {
    const mois = moisCourant();
    const seuils = SEUILS_SAISON[mois] || { vert: 30, orange: 15 };

    let totalPoids = 0;
    let totalMax   = 0;
    const details  = [];

    for (const [id, qty] of Object.entries(stocks)) {
      const max = STOCKS_MAX[id] || 500;
      const pct = max > 0 ? Math.round(qty / max * 100) : 0;
      totalPoids += qty;
      totalMax   += max;
      let zone = pct >= seuils.vert ? 'vert' : pct >= seuils.orange ? 'orange' : 'rouge';
      details.push({ id, qty, max, pct, zone });
    }

    const pctGlobal = totalMax > 0 ? Math.round(totalPoids / totalMax * 100) : 0;
    const zoneGlobale = pctGlobal >= seuils.vert ? 'vert' : pctGlobal >= seuils.orange ? 'orange' : 'rouge';

    const isSoudure = [3, 4].includes(mois);
    const alerteSoudure = isSoudure && pctGlobal < 30;

    return { details, pctGlobal, zoneGlobale, seuils, isSoudure, alerteSoudure, totalPoids, mois };
  }

  /* ── Observations proches ────────────────────────────────────── */
  function obsProches(lat, lng, rayon = 120) {
    const all = window.BS ? BS.getObservations() : [];
    return all
      .filter(o => o.lat && o.lng && distKm(lat, lng, o.lat, o.lng) <= rayon)
      .map(o => ({ ...o, dist_km: Math.round(distKm(lat, lng, o.lat, o.lng)) }))
      .sort((a, b) => a.dist_km - b.dist_km);
  }

  /* ── Waypoint objectif du jour ───────────────────────────────── */
  function waypointObjectif(lat, lng) {
    // Cherche le prochain point terrain entre 40 et 100km
    const proches = obsProches(lat, lng, 100).filter(o => o.dist_km >= 40);
    if (proches.length > 0) return proches[0];
    // Fallback : point le plus proche > 10km
    const loin = obsProches(lat, lng, 200).filter(o => o.dist_km >= 10);
    return loin[0] || null;
  }

  /* ── Décisions ───────────────────────────────────────────────── */
  function calcDecisions(ctx) {
    const { meteo, marees, lat, lng, stocks, mois } = ctx;
    const decisions = [];
    const prev = meteo?.previsions_3j;
    const moisNum = moisCourant();

    // 1. Abri / tempête
    if (prev) {
      const vents = prev.vent_max;
      const idxMax = vents.indexOf(Math.max(...vents));
      const vMax = vents[idxMax];
      const vAuj = vents[0];
      if (vAuj >= 60 || (vents[1] || 0) >= 60) {
        decisions.push({ type:'stop', icon:'🆘', titre:'TEMPÊTE', msg:`Vent ${Math.max(vAuj, vents[1]||0)}km/h — ne pas rouler, abri solide immédiat.` });
      } else if (vAuj >= 40) {
        decisions.push({ type:'stop', icon:'⛺', titre:'VENT FORT', msg:`${vAuj}km/h aujourd'hui — progression déconseillée, chercher abri.` });
      } else if ((vents[1]||0) >= 40) {
        decisions.push({ type:'wait', icon:'🏕️', titre:'PRÉVOIR ABRI DEMAIN', msg:`Rafales ${vents[1]}km/h annoncées — identifier un point d'abri sur la route.` });
      }
      // Pluie
      const pluieMax = Math.max(...prev.pluie_mm);
      if (pluieMax >= 25) {
        const idx = prev.pluie_mm.indexOf(pluieMax);
        decisions.push({ type:'wait', icon:'🌧️', titre:'PLUIE FORTE', msg:`${pluieMax}mm le ${prev.dates[idx]} — imperméables, routes glissantes.` });
      }
    }

    // 2. Cueillette/pêche
    const proche = obsProches(lat, lng, 120);
    const enSaison = proche.filter(o => estEnSaison(o));
    const peche = enSaison.filter(o => o.type === 'peche');
    const cueillette = enSaison.filter(o => ['cueillette','champignon'].includes(o.type));

    if (cueillette.length > 0) {
      const pluieAuj = prev?.pluie_mm[0] || 0;
      const nom = cueillette[0].nom.split('—')[0].trim();
      if (pluieAuj > 8) {
        decisions.push({ type:'wait', icon:'🌿', titre:'CUEILLETTE DEMAIN', msg:`${nom} en saison mais pluie (${pluieAuj}mm). Meilleure fenêtre demain.` });
      } else {
        decisions.push({ type:'go', icon:'🌿', titre:'CUEILLETTE AUJOURD\'HUI', msg:`${nom} — en saison, météo favorable.` });
      }
    }

    if (peche.length > 0 && marees) {
      const hBasse = marees.prochaine_basse_h;
      const nom = peche[0].nom.split('—')[0].trim();
      if (hBasse < 2) {
        decisions.push({ type:'go', icon:'🎣', titre:'PÊCHE — MARÉE BASSE', msg:`${nom} — marée basse dans ${hBasse}h.` });
      } else {
        decisions.push({ type:'info', icon:'🎣', titre:'PÊCHE PLANIFIÉE', msg:`${nom} — marée basse dans ${hBasse}h.` });
      }
    }

    // 3. Stocks
    const analyse = analyseStocks(stocks);
    if (analyse.alerteSoudure) {
      decisions.push({ type:'stop', icon:'⚠️', titre:'ALERTE SOUDURE', msg:`Stocks à ${analyse.pctGlobal}% en période critique (mars–avril). Rationner les aliments énergétiques.` });
    } else if (analyse.zoneGlobale === 'rouge') {
      decisions.push({ type:'stop', icon:'🎒', titre:'STOCKS CRITIQUES', msg:`Niveau ${analyse.pctGlobal}% — sous le seuil de ${analyse.seuils.orange}% pour ${MOIS_LABEL[moisNum]}. Cueillette/pêche prioritaire.` });
    } else if (analyse.zoneGlobale === 'orange') {
      decisions.push({ type:'wait', icon:'🎒', titre:'STOCKS EN VIGILANCE', msg:`Niveau ${analyse.pctGlobal}% — surveiller la consommation des aliments caloriques.` });
    }

    // 4. Ravitaillement
    const ravit = proche.filter(o => o.type === 'ravitaillement' && o.dist_km < 50);
    if (ravit.length > 0 && analyse.pctGlobal < 30) {
      decisions.push({ type:'info', icon:'🛒', titre:'RAVITAILLEMENT PROCHE', msg:`${ravit[0].nom.split('—')[0].trim()} à ${ravit[0].dist_km}km.` });
    }

    // 5. Route / vent
    if (meteo && meteo.source !== 'offline') {
      const vAuj = meteo.vent_kmh;
      if (vAuj > 25 && vAuj < 40) {
        decisions.push({ type:'wait', icon:'🗺️', titre:'ADAPTER LA ROUTE', msg:`Vent ${vAuj}km/h ${ventDir(meteo.direction_vent)} — itinéraire abrité si possible.` });
      } else if (vAuj <= 25) {
        decisions.push({ type:'go', icon:'🗺️', titre:'ROUTE FAVORABLE', msg:`Vent ${vAuj}km/h ${ventDir(meteo.direction_vent)}, ${meteo.meteo.split(' ').slice(1).join(' ')}.` });
      }
    }

    // 6. Durée du jour
    const soleil = sunTimes(lat, lng);
    if (soleil.duree_h < 9) {
      decisions.push({ type:'info', icon:'🌅', titre:'JOURNÉE COURTE', msg:`${soleil.duree_h}h de lumière — départ tôt, bivouac avant 16h.` });
    }

    return decisions;
  }

  /* ── RENDU HTML ─────────────────────────────────────────────── */
  function html_alerte(niveau, icon, titre, msg) {
    return `<div class="sbl-alerte sbl-${niveau}">
      <span class="sbl-al-icon">${icon}</span>
      <div><div class="sbl-al-titre">${titre}</div><p>${msg}</p></div>
    </div>`;
  }

  function renderBriefing(container, ctx) {
    const { lat, lng, posSource, meteo, marees, stocks, kommoda, now } = ctx;
    const moisNum  = moisCourant();
    const soleil   = sunTimes(lat, lng);
    const lune     = moonPhase();
    const proche   = obsProches(lat, lng, 120);
    const objectif = waypointObjectif(lat, lng);
    const decisions = calcDecisions(ctx);
    const analyse  = analyseStocks(stocks);
    const prev     = meteo?.previsions_3j;

    const d = new Date(now);
    const dateStr = `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS_LABEL[moisNum]} ${d.getFullYear()}`;

    // Alertes critiques
    const alertes = [];
    if (prev) {
      const vMax = Math.max(...prev.vent_max);
      if (vMax >= 60) alertes.push(html_alerte('danger','💨','TEMPÊTE',`Vent ${vMax}km/h prévu — abri impératif.`));
      else if (vMax >= 40) alertes.push(html_alerte('warning','🌬️','VENT FORT',`Rafales ${vMax}km/h — anticiper abri.`));
    }
    if (analyse.alerteSoudure) alertes.push(html_alerte('danger','⚠️','SOUDURE CRITIQUE',`Stocks à ${analyse.pctGlobal}% — période mars–avril. Minimum 30% requis.`));
    if (meteo?.source?.includes('périmé')) alertes.push(html_alerte('warning','📵','MÉTÉO PÉRIMÉE',meteo.source));
    if (!posSource?.includes('GPS réel')) alertes.push(html_alerte('info','📍','POSITION APPROXIMATIVE',posSource || 'GPS indisponible'));

    // Stocks HTML
    const ZONE_EMOJI = { vert:'🟢', orange:'🟠', rouge:'🔴' };
    const stocksHTML = analyse.details.map(s => `
      <div class="sbl-stock-item">
        <span class="sbl-stock-zone">${ZONE_EMOJI[s.zone]}</span>
        <span class="sbl-stock-nom">${s.id.replace(/_/g,' ')}</span>
        <div class="sbl-stock-bar"><div class="sbl-stock-fill sbl-fill-${s.zone}" style="width:${Math.min(s.pct,100)}%"></div></div>
        <span class="sbl-stock-pct">${s.pct}%</span>
      </div>`).join('');

    // Kommoda HTML
    const batClass = !kommoda?.batterie_pct ? 'sbl-unk'
      : kommoda.batterie_pct > 50 ? 'sbl-ok'
      : kommoda.batterie_pct > 20 ? 'sbl-warn' : 'sbl-crit';
    const komHTML = kommoda?.batterie_pct != null ? `
      <div class="sbl-kom-grid">
        <div class="sbl-kom-val ${batClass}">
          <span class="sbl-kom-n">${kommoda.batterie_pct}%</span>
          <span class="sbl-kom-l">🔋 Batterie</span>
        </div>
        <div class="sbl-kom-val">
          <span class="sbl-kom-n">Niv.${kommoda.assistance ?? '—'}</span>
          <span class="sbl-kom-l">⚡ Assistance</span>
        </div>
        <div class="sbl-kom-val">
          <span class="sbl-kom-n">${kommoda.distance_jour ?? '—'}<small>km</small></span>
          <span class="sbl-kom-l">📍 Aujourd'hui</span>
        </div>
        <div class="sbl-kom-val">
          <span class="sbl-kom-n">${kommoda.distance_total ?? '—'}<small>km</small></span>
          <span class="sbl-kom-l">🛣️ Total</span>
        </div>
      </div>` : `<p class="sbl-offline">Aucune donnée Kommoda — saisir dans l'onglet Stocks.</p>`;

    // Décisions HTML
    const decHTML = decisions.map(dec => `
      <div class="sbl-dec sbl-dec-${dec.type}">
        <span class="sbl-dec-icon">${dec.icon}</span>
        <div><strong>${dec.titre}</strong> — ${dec.msg}</div>
      </div>`).join('');

    // Observations proches HTML
    const obsHTML = proche.length === 0
      ? '<p class="sbl-offline">Aucun point terrain dans les 120km.</p>'
      : proche.slice(0, 5).map(o => {
          const saison = estEnSaison(o);
          return `<div class="sbl-obs ${saison ? 'sbl-obs-saison' : ''}">
            <span>${TYPE_ICON[o.type] || '📍'}</span>
            <div>
              <span class="sbl-obs-nom">${o.nom}</span>
              <span class="sbl-obs-meta">${o.dist_km}km · ${saison ? '✓ en saison' : '✗ hors saison'}</span>
            </div>
          </div>`;
        }).join('');

    // Objectif du jour
    const objHTML = objectif
      ? `<div class="sbl-objectif">
          <span class="sbl-obj-dist">${objectif.dist_km}km</span>
          <div>
            <div class="sbl-obj-nom">${TYPE_ICON[objectif.type] || '📍'} ${objectif.nom}</div>
            <div class="sbl-obj-coords">${objectif.lat.toFixed(4)}°N ${objectif.lng.toFixed(4)}°E</div>
          </div>
         </div>`
      : '<p class="sbl-offline">Aucun waypoint identifié à 40–100km.</p>';

    container.innerHTML = `
    <div class="sbl-brief" id="sbl-print-zone">

      <!-- EN-TÊTE -->
      <div class="sbl-header">
        <div class="sbl-header-left">
          <div class="sbl-date">${dateStr}</div>
          <div class="sbl-pos">📍 ${posSource}</div>
          <div class="sbl-coords">${lat.toFixed(5)}°N &nbsp;${lng.toFixed(5)}°E</div>
        </div>
        <div class="sbl-header-right">
          <div class="sbl-title">6BL</div>
          <div class="sbl-subtitle">Briefing Terrain</div>
        </div>
      </div>

      <!-- ALERTES -->
      ${alertes.length > 0 ? `<div class="sbl-alertes">${alertes.join('')}</div>` : ''}

      <!-- GRILLE PRINCIPALE -->
      <div class="sbl-grid">

        <!-- MÉTÉO -->
        <div class="sbl-card sbl-card-meteo">
          <div class="sbl-card-titre">🌦 Météo</div>
          ${meteo?.source === 'offline'
            ? '<p class="sbl-offline">Météo indisponible</p>'
            : `<div class="sbl-meteo-now">
                <span class="sbl-temp">${meteo.temperature_c}°</span>
                <span class="sbl-vent">${meteo.meteo} · 💨${meteo.vent_kmh}km/h ${ventDir(meteo.direction_vent)}</span>
               </div>
               ${prev ? `<div class="sbl-prev3j">
                ${prev.dates.map((dt,i) => {
                  const date = new Date(dt);
                  const vw = prev.vent_max[i];
                  return `<div class="sbl-prev-j">
                    <div class="sbl-prev-jour">${['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][date.getDay()]} ${date.getDate()}</div>
                    <div class="sbl-prev-temp">${prev.temp_min[i]}–${prev.temp_max[i]}°</div>
                    <div class="sbl-prev-pluie">🌧${prev.pluie_mm[i]}mm</div>
                    <div class="sbl-prev-vent ${vw>=40?'sbl-vent-alert':''}">💨${vw}km/h</div>
                  </div>`;
                }).join('')}
               </div>` : ''}`
          }
        </div>

        <!-- ASTRO -->
        <div class="sbl-card sbl-card-astro">
          <div class="sbl-card-titre">☀️ Astronomie</div>
          <div class="sbl-astro">
            <div><span class="sbl-a-val">🌅 ${soleil.lever}</span><span class="sbl-a-lbl">Lever</span></div>
            <div><span class="sbl-a-val">🌇 ${soleil.coucher}</span><span class="sbl-a-lbl">Coucher</span></div>
            <div><span class="sbl-a-val">${soleil.duree_h}h</span><span class="sbl-a-lbl">Durée</span></div>
          </div>
          <div class="sbl-lune">${lune.label} · J${lune.phase_jours}</div>
          ${marees ? `<div class="sbl-marees">
            <span>🌊 ${marees.etat}</span>
            <span>↑ dans ${marees.prochaine_haute_h}h</span>
            <span>↓ dans ${marees.prochaine_basse_h}h</span>
          </div>` : ''}
        </div>

        <!-- OBJECTIF DU JOUR -->
        <div class="sbl-card sbl-card-obj">
          <div class="sbl-card-titre">🧭 Objectif du jour</div>
          ${objHTML}
        </div>

        <!-- KOMMODA -->
        <div class="sbl-card sbl-card-kom">
          <div class="sbl-card-titre">⚡ Kommoda 3</div>
          ${komHTML}
        </div>

        <!-- DÉCISIONS -->
        <div class="sbl-card sbl-card-dec">
          <div class="sbl-card-titre">🎯 Décisions</div>
          <div class="sbl-decisions">${decHTML}</div>
        </div>

        <!-- STOCKS -->
        <div class="sbl-card sbl-card-stocks">
          <div class="sbl-card-titre">🎒 Stocks
            <span class="sbl-stock-global sbl-fill-${analyse.zoneGlobale}">${ZONE_EMOJI[analyse.zoneGlobale]} ${analyse.pctGlobal}% — ${MOIS_LABEL[moisNum]}</span>
          </div>
          <div class="sbl-stocks">${stocksHTML}</div>
          ${analyse.isSoudure ? '<div class="sbl-soudure">⚠️ Période soudure — maintenir ≥ 30%</div>' : ''}
        </div>

        <!-- TERRAIN PROCHE -->
        <div class="sbl-card sbl-card-obs">
          <div class="sbl-card-titre">📍 Terrain proche (120km)</div>
          <div class="sbl-obs-list">${obsHTML}</div>
        </div>

      </div><!-- /grid -->

      <div class="sbl-footer">Généré le ${new Date().toLocaleString('fr-FR')} · La Boucle Sauvage · 6BL v1</div>
    </div>`;
  }

  /* ── API publique ────────────────────────────────────────────── */
  async function generate(container) {
    container.innerHTML = '<div class="sbl-loading">⏳ Localisation GPS…</div>';

    const now = new Date();

    // 1. GPS
    const gps = await getGPS();
    const lastObs = window.BS ? BS.getObservations().slice().reverse().find(o => o.lat && o.lng) : null;
    const lat = gps?.lat ?? lastObs?.lat ?? 49.65;
    const lng = gps?.lng ?? lastObs?.lng ?? 3.27;
    const posSource = gps
      ? `GPS réel (±${gps.precision_m}m)`
      : lastObs ? `dernier waypoint: ${lastObs.nom} ⚠️` : 'défaut Artemps ⚠️';

    container.innerHTML = '<div class="sbl-loading">⏳ Récupération météo…</div>';

    // 2. Météo
    const meteo  = await getMeteo(lat, lng);
    const marees = tideSimple(lat, lng);

    // 3. Données BS
    const stocks  = window.BS ? BS.getStocks()  : {};
    const kommoda = window.BS ? BS.getKommoda() : null;

    // 4. Rendu
    renderBriefing(container, { lat, lng, posSource, meteo, marees, stocks, kommoda, now });
  }

  return { generate };

})();
