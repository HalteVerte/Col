// Style MapLibre — Protomaps v4 — version lisible humain
function mlStyle() {
  const SRC = 'basemap';
  return {
    version: 8,
    glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    sources: {
      basemap: {
        type: 'vector',
        url: 'pmtiles://' + window.location.origin + '/tiles.pmtiles',
        attribution: '© OpenStreetMap'
      }
    },
    layers: [

      // ── Fond ────────────────────────────────────────────
      { id:'bg', type:'background',
        paint:{'background-color':'#f2ede4'} },

      // ── Terre & végétation ──────────────────────────────
      { id:'earth', type:'fill', source:SRC, 'source-layer':'earth',
        paint:{'fill-color':'#ede8e0'} },

      { id:'landcover', type:'fill', source:SRC, 'source-layer':'landcover',
        paint:{'fill-color':['match',['get','kind'],
          'trees','#b8d8a0','forest','#b0d498','grass','#d4e8bc',
          'scrub','#cce0b0','snow','#eef4f8','sand','#e8e0c8',
          '#e4e0d8'],'fill-opacity':0.75} },

      { id:'landuse', type:'fill', source:SRC, 'source-layer':'landuse',
        paint:{'fill-color':['match',['get','kind'],
          'forest','#b0d498','wood','#b0d498',
          'park','#c4e0a8','nature_reserve','#bcd8a0',
          'farmland','#e4dfc4','meadow','#d8e8c0',
          'residential','#e4dfd8','cemetery','#d4d8c8',
          '#e0dbd2'],'fill-opacity':0.65} },

      // ── Eau ─────────────────────────────────────────────
      { id:'water', type:'fill', source:SRC, 'source-layer':'water',
        paint:{'fill-color':'#9ec8e0'} },

      { id:'waterway', type:'line', source:SRC, 'source-layer':'water',
        filter:['in',['get','kind'],['literal',['river','canal','stream']]],
        paint:{'line-color':'#6ab0d0',
               'line-width':['interpolate',['linear'],['zoom'],
                 6,0.6, 9,1.5, 12,3]} },

      // ── Bâtiments ────────────────────────────────────────
      { id:'buildings', type:'fill', source:SRC, 'source-layer':'buildings',
        minzoom:13,
        paint:{'fill-color':'#d8d0c0','fill-opacity':0.6} },

      // ── Routes ──────────────────────────────────────────
      { id:'road-motorway-bg', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'motorway'],
        paint:{'line-color':'#c07030','line-width':
               ['interpolate',['linear'],['zoom'],5,2,10,6,14,10],
               'line-opacity':0.9} },
      { id:'road-motorway', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'motorway'],
        paint:{'line-color':'#e8a060','line-width':
               ['interpolate',['linear'],['zoom'],5,1,10,4,14,8]} },

      { id:'road-trunk', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'trunk'],
        paint:{'line-color':'#d8a040','line-width':
               ['interpolate',['linear'],['zoom'],6,0.8,10,3,14,6]} },

      { id:'road-primary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'primary'],
        paint:{'line-color':'#c8a850','line-width':
               ['interpolate',['linear'],['zoom'],6,0.6,10,2.5,14,5]} },

      { id:'road-secondary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'secondary'],
        paint:{'line-color':'#b8a860','line-width':
               ['interpolate',['linear'],['zoom'],7,0.5,10,1.8,14,4]} },

      { id:'road-tertiary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'tertiary'],
        paint:{'line-color':'#a8a068','line-width':
               ['interpolate',['linear'],['zoom'],8,0.4,11,1.2,14,3]} },

      { id:'road-minor', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind'],['literal',['minor_road','residential','unclassified','service']]],
        minzoom:11,
        paint:{'line-color':'#c8c4b0','line-width':
               ['interpolate',['linear'],['zoom'],11,0.4,13,1,14,2]} },

      // Pistes cyclables — vert pointillé
      { id:'road-cycle', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind_detail'],['literal',['cycleway','path','track','bridleway']]],
        minzoom:7,
        paint:{'line-color':'#2a7a1a',
               'line-width':['interpolate',['linear'],['zoom'],7,0.8,11,1.8,14,3],
               'line-dasharray':[4,2],
               'line-opacity':0.9} },

      // Sentiers
      { id:'road-path', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'path'],
        minzoom:11,
        paint:{'line-color':'#8a7050','line-width':0.8,
               'line-dasharray':[2,3],'line-opacity':0.7} },

      // ── Frontières ──────────────────────────────────────
      { id:'boundary-country', type:'line', source:SRC, 'source-layer':'boundaries',
        filter:['==',['get','kind'],'country'],
        paint:{'line-color':'#8060a0',
               'line-width':2,
               'line-dasharray':[1,0],
               'line-opacity':0.8} },

      { id:'boundary-region', type:'line', source:SRC, 'source-layer':'boundaries',
        filter:['==',['get','kind'],'region'],
        minzoom:6,
        paint:{'line-color':'#9080b0',
               'line-width':1,
               'line-dasharray':[5,3],
               'line-opacity':0.6} },

      // ── Labels pays ─────────────────────────────────────
      { id:'label-country', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['==',['get','kind'],'country'],
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],3,12,7,20],
          'text-font':['Noto Sans Regular'],
          'text-transform':'uppercase',
          'text-letter-spacing':0.15
        },
        paint:{'text-color':'#4a3060',
               'text-halo-color':'rgba(255,255,255,0.85)',
               'text-halo-width':2} },

      // ── Labels régions ───────────────────────────────────
      { id:'label-region', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['==',['get','kind'],'region'],
        minzoom:5, maxzoom:9,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],5,10,8,14],
          'text-font':['Noto Sans Regular'],
          'text-transform':'uppercase',
          'text-letter-spacing':0.1
        },
        paint:{'text-color':'#6050a0',
               'text-halo-color':'rgba(255,255,255,0.8)',
               'text-halo-width':1.5} },

      // ── Labels villes & bourgs ───────────────────────────
      // Utilise min_zoom de Protomaps pour décider quand afficher
      { id:'label-city', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['city','town']]],
        minzoom:4,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],
            4,10, 7,13, 10,16, 13,18],
          'text-font':['Noto Sans Regular'],
          'symbol-sort-key':['*',-1,['coalesce',['get','population_rank'],0]]
        },
        paint:{'text-color':'#1a1208',
               'text-halo-color':'rgba(255,255,255,0.95)',
               'text-halo-width':2} },

      // ── Labels villages ──────────────────────────────────
      { id:'label-village', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['village','hamlet']]],
        minzoom:8,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],
            8,9, 11,12, 13,14],
          'text-font':['Noto Sans Regular'],
          'symbol-sort-key':['*',-1,['coalesce',['get','population_rank'],0]]
        },
        paint:{'text-color':'#2a2010',
               'text-halo-color':'rgba(255,255,255,0.95)',
               'text-halo-width':1.5} },

      // ── Micro-toponymes (lieux-dits) ─────────────────────
      { id:'label-locality', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['locality','suburb','quarter','neighbourhood']]],
        minzoom:12,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],12,9,14,11],
          'text-font':['Noto Sans Regular']
        },
        paint:{'text-color':'#4a3820',
               'text-halo-color':'rgba(255,255,255,0.9)',
               'text-halo-width':1,
               'text-opacity':0.8} },

    ]
  };
}

// Activer overlay OSM labels sur une carte MapLibre existante
function addOsmLabelsOverlay(map) {
  if (map.getSource('osm-raster')) return;
  map.addSource('osm-raster', {
    type: 'raster',
    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
    tileSize: 256,
    attribution: '© OpenStreetMap'
  });
  map.addLayer({
    id: 'osm-labels-overlay',
    type: 'raster',
    source: 'osm-raster',
    paint: {
      'raster-opacity': 0,  // transparent par défaut — activé si besoin
      'raster-opacity-transition': { duration: 300 }
    }
  });
}
