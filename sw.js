/* ══════════════════════════════════════════════════════
   SERVICE WORKER — La Boucle Sauvage
   v5 — Précache tuiles zoom 5-8 + fallback offline
══════════════════════════════════════════════════════ */

const CACHE_APP   = 'boucle-app-v60';
const CACHE_TILES = 'boucle-tiles-v2';
const TILES_MAX   = 3000;  // limite LRU du cache tuiles

// App shell
const APP_SHELL = [
  './index.html',
  './carnet.html',
  // './data.js' — chargé en Network First, jamais mis en cache
  './main.css',
  './map.css',
  './carnet.css',
  './stocks.js',
  './terrain.js',
  './zones.js',
  './quetes.js',
  './6bl.js',
  './recettes.js',
  './recettes.json',
  './trajets.js',
  // './gpx.js' — chargé à la demande, mis en cache au 1er accès
  './map-style.js',
  './app.js',
  './manifest.json',
];

// Tuiles pré-cachées : CyclOSM zoom 5-8, bbox France+Portugal
// 297 tuiles ~4 Mo
const PRECACHE_TILES = [
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/5/15/10.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/5/15/11.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/5/15/12.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/5/16/10.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/5/16/11.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/5/16/12.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/30/21.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/30/22.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/30/23.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/30/24.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/30/25.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/31/21.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/31/22.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/31/23.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/31/24.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/31/25.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/32/21.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/32/22.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/32/23.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/32/24.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/32/25.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/33/21.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/33/22.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/33/23.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/33/24.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/6/33/25.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/42.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/43.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/44.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/45.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/46.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/47.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/48.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/49.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/60/50.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/42.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/43.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/44.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/45.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/46.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/47.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/48.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/49.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/61/50.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/42.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/43.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/44.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/45.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/46.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/47.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/48.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/49.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/62/50.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/42.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/43.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/44.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/45.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/46.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/47.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/48.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/49.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/63/50.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/42.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/43.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/44.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/45.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/46.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/47.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/48.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/49.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/64/50.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/42.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/43.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/44.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/45.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/46.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/47.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/48.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/49.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/65/50.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/42.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/43.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/44.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/45.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/46.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/47.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/48.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/49.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/7/66/50.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/121/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/122/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/123/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/124/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/125/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/126/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/127/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/128/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/129/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/130/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/131/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/132/100.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/85.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/86.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/87.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/88.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/89.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/90.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/91.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/92.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/93.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/94.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/95.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/96.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/97.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/98.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/99.png",
  "https://tile-cyclosm.openstreetmap.fr/cyclosm/8/133/100.png"
];

// Tuile de fallback SVG (hors ligne, zoom trop fort)
const TILE_FALLBACK = new Response(
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
  <rect width="256" height="256" fill="#d4cfc7"/>
  <text x="128" y="118" font-family="sans-serif" font-size="13" fill="#8a8078" text-anchor="middle">carte non disponible</text>
  <text x="128" y="140" font-family="sans-serif" font-size="11" fill="#a09888" text-anchor="middle">hors ligne</text>
</svg>`,
  { headers: { 'Content-Type': 'image/svg+xml' } }
);

// ── Installation ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // 1. App shell
      caches.open(CACHE_APP).then(c => c.addAll(APP_SHELL)),
      // 2. Tuiles zoom 5-8 — fetch en parallèle par batch de 20
      caches.open(CACHE_TILES).then(async cache => {
        const BATCH = 20;
        for (let i = 0; i < PRECACHE_TILES.length; i += BATCH) {
          const batch = PRECACHE_TILES.slice(i, i + BATCH);
          await Promise.allSettled(
            batch.map(url =>
              fetch(url, { mode: 'no-cors' })
                .then(r => { if (r && r.status !== 0) cache.put(url, r); })
                .catch(() => {})  // silencieux si déjà offline
            )
          );
        }
      })
    ]).then(() => self.skipWaiting())
  );
});

// ── Activation ────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_APP && k !== CACHE_TILES)
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // PMTiles — laisser passer directement (Range requests nécessaires)
  if (url.pathname.endsWith('.pmtiles')) return;

  // Tuiles OSM raster — laisser passer directement (CORS, pas de cache opaque)
  if (url.hostname.includes('tile.openstreetmap.org')
   || url.hostname.includes('tile-cyclosm.openstreetmap.fr')
   || url.hostname.includes('wxs.ign.fr')) return;


  // data.js — Network First sans cache (state JS dynamique)
  if (url.pathname.endsWith('data.js')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // HTML — Network First (toujours la dernière version)
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response && response.ok) {
          const toCache = response.clone();
          caches.open(CACHE_APP).then(c => c.put(event.request, toCache));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // JS/CSS/JSON/images — Network First avec fallback cache
  event.respondWith(
    fetch(event.request).then(response => {
      if (response && response.ok) {
        const toCache = response.clone();
        caches.open(CACHE_APP).then(c => c.put(event.request, toCache));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});

// ── Messages ──────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  if (event.data === 'CLEAR_TILES') {
    caches.delete(CACHE_TILES).then(() => {
      if (event.ports[0]) event.ports[0].postMessage('tiles cleared');
    });
  }
});
