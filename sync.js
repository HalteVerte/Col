/* ===============================================================
   sync.js — Sync automatique Coll → API
   Dépend de config.js (chargé avant)
   =============================================================== */

async function syncToAPI(payload) {
  const cfg = window.COLL_CONFIG;

  // Pas configuré ou pas d'URL → silencieux
  if (!cfg?.apiUrl || !cfg?.apiKey || cfg.apiKey === 'REMPLACER_PAR_TA_CLÉ_SECRÈTE') {
    console.info('[sync] ⚙️ API non configurée — sync désactivé');
    return null;
  }

  try {
    const r = await fetch(cfg.apiUrl, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${cfg.apiKey}`,
      },
      body:   JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const report = await r.json();
    console.log(`[sync] ✅ ${report.message}`);
    return report;

  } catch(e) {
    // Offline ou erreur réseau → silencieux, jamais bloquant
    console.warn('[sync] ⚠️ offline ou erreur:', e.message);
    return null;
  }
}
