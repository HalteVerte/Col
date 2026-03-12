// Style MapLibre — Protomaps style officiel "light" + surcharges
function mlStyle() {
  return {
    version: 8,
    glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    sprite: 'https://protomaps.github.io/basemaps-assets/sprites/v4/light',
    sources: {
      basemap: {
        type: 'vector',
        url: 'pmtiles://' + window.location.origin + '/tiles.pmtiles',
        attribution: '© OpenStreetMap'
      }
    },
    layers: [
      // ── Fond ──────────────────────────────────────────
      { id:'background', type:'background', paint:{'background-color':'#f2ede4'} },
      { id:'earth', type:'fill', source:'basemap', 'source-layer':'earth', paint:{'fill-color':'#ede8e0'} },

      // ── Végétation ────────────────────────────────────
      { id:'landcover-wood',   type:'fill', source:'basemap', 'source-layer':'landcover', filter:['in',['get','kind'],['literal',['trees','forest']]], paint:{'fill-color':'#b8d898','fill-opacity':0.8} },
      { id:'landcover-grass',  type:'fill', source:'basemap', 'source-layer':'landcover', filter:['in',['get','kind'],['literal',['grass','scrub']]], paint:{'fill-color':'#d4e8bc','fill-opacity':0.7} },
      { id:'landuse-forest',   type:'fill', source:'basemap', 'source-layer':'landuse',   filter:['in',['get','kind'],['literal',['forest','wood','park','nature_reserve']]], paint:{'fill-color':'#b0d498','fill-opacity':0.7} },
      { id:'landuse-farm',     type:'fill', source:'basemap', 'source-layer':'landuse',   filter:['in',['get','kind'],['literal',['farmland','meadow','grass']]], paint:{'fill-color':'#e4dfc4','fill-opacity':0.6} },
      { id:'landuse-urban',    type:'fill', source:'basemap', 'source-layer':'landuse',   filter:['in',['get','kind'],['literal',['residential','commercial','industrial']]], paint:{'fill-color':'#e0dbd4','fill-opacity':0.5} },

      // ── Eau ───────────────────────────────────────────
      { id:'water',     type:'fill', source:'basemap', 'source-layer':'water', paint:{'fill-color':'#9ec8e0'} },
      { id:'waterway',  type:'line', source:'basemap', 'source-layer':'water', filter:['in',['get','kind'],['literal',['river','canal','stream','ditch']]], paint:{'line-color':'#6ab0d0','line-width':['interpolate',['linear'],['zoom'],6,0.6,10,1.5,13,3]} },

      // ── Routes ────────────────────────────────────────
      { id:'road-motorway',  type:'line', source:'basemap', 'source-layer':'roads', filter:['==',['get','kind'],'motorway'],  paint:{'line-color':'#e8904a','line-width':['interpolate',['linear'],['zoom'],5,1.5,10,5,14,9]} },
      { id:'road-trunk',     type:'line', source:'basemap', 'source-layer':'roads', filter:['==',['get','kind'],'trunk'],     paint:{'line-color':'#e0a040','line-width':['interpolate',['linear'],['zoom'],6,1,10,3.5,14,7]} },
      { id:'road-primary',   type:'line', source:'basemap', 'source-layer':'roads', filter:['==',['get','kind'],'primary'],   paint:{'line-color':'#d4aa50','line-width':['interpolate',['linear'],['zoom'],6,0.8,10,2.5,14,5]} },
      { id:'road-secondary', type:'line', source:'basemap', 'source-layer':'roads', filter:['==',['get','kind'],'secondary'], paint:{'line-color':'#c8b060','line-width':['interpolate',['linear'],['zoom'],7,0.6,10,2,14,4]} },
      { id:'road-tertiary',  type:'line', source:'basemap', 'source-layer':'roads', filter:['==',['get','kind'],'tertiary'],  paint:{'line-color':'#bca870','line-width':['interpolate',['linear'],['zoom'],8,0.5,11,1.5,14,3]} },
      { id:'road-minor',     type:'line', source:'basemap', 'source-layer':'roads', filter:['in',['get','kind'],['literal',['minor_road','residential','unclassified']]], minzoom:11, paint:{'line-color':'#ccc8b0','line-width':['interpolate',['linear'],['zoom'],11,0.4,14,2]} },

      // Pistes cyclables — vert pointillé, visible dès zoom 7
      { id:'road-cycle', type:'line', source:'basemap', 'source-layer':'roads',
        filter:['in',['get','kind_detail'],['literal',['cycleway','path','track','bridleway']]],
        minzoom:7,
        paint:{'line-color':'#1a7a10','line-width':['interpolate',['linear'],['zoom'],7,1,11,2,14,3.5],'line-dasharray':[4,2],'line-opacity':0.9} },

      // ── Frontières ────────────────────────────────────
      { id:'boundary-country', type:'line', source:'basemap', 'source-layer':'boundaries', filter:['==',['get','kind'],'country'], paint:{'line-color':'#7050a0','line-width':2,'line-opacity':0.9} },
      { id:'boundary-region',  type:'line', source:'basemap', 'source-layer':'boundaries', filter:['==',['get','kind'],'region'], minzoom:5, paint:{'line-color':'#9878c0','line-width':1,'line-dasharray':[5,3],'line-opacity':0.6} },

      // ── Bâtiments ─────────────────────────────────────
      { id:'buildings', type:'fill', source:'basemap', 'source-layer':'buildings', minzoom:13, paint:{'fill-color':'#d4ccbc','fill-opacity':0.7} },

      // ── Labels — pays ─────────────────────────────────
      { id:'label-country', type:'symbol', source:'basemap', 'source-layer':'places',
        filter:['==',['get','kind'],'country'],
        layout:{'text-field':['coalesce',['get','name:fr'],['get','name'],''],'text-size':['interpolate',['linear'],['zoom'],3,12,7,20],'text-font':['Noto Sans Regular'],'text-transform':'uppercase','text-letter-spacing':0.2},
        paint:{'text-color':'#3a2060','text-halo-color':'rgba(255,255,255,0.9)','text-halo-width':2} },

      // ── Labels — villes (city + town) ─────────────────
      { id:'label-city', type:'symbol', source:'basemap', 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['city','town']]],
        minzoom:4,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],4,10,8,14,12,17],
          'text-font':['Noto Sans Regular'],
          'text-max-width':8,
          'symbol-sort-key':['*',-1,['coalesce',['get','population_rank'],0]]
        },
        paint:{'text-color':'#160e04','text-halo-color':'rgba(255,255,255,0.98)','text-halo-width':2} },

      // ── Labels — villages ─────────────────────────────
      { id:'label-village', type:'symbol', source:'basemap', 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['village','hamlet']]],
        minzoom:9,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],9,10,12,13,14,15],
          'text-font':['Noto Sans Regular'],
          'text-max-width':8,
          'symbol-sort-key':['*',-1,['coalesce',['get','population_rank'],0]]
        },
        paint:{'text-color':'#201408','text-halo-color':'rgba(255,255,255,0.98)','text-halo-width':1.8} },

      // ── Labels — lieux-dits & toponymes ───────────────
      { id:'label-locality', type:'symbol', source:'basemap', 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['locality','suburb','quarter','neighbourhood']]],
        minzoom:13,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':10,
          'text-font':['Noto Sans Regular'],
          'text-max-width':6
        },
        paint:{'text-color':'#4a3820','text-halo-color':'rgba(255,255,255,0.9)','text-halo-width':1.2,'text-opacity':0.85} },

      // ── Labels — POIs (zoom fort) ─────────────────────
      { id:'label-poi', type:'symbol', source:'basemap', 'source-layer':'pois',
        minzoom:14,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':10,
          'text-font':['Noto Sans Regular'],
          'text-max-width':6,
          'text-offset':[0,0.5]
        },
        paint:{'text-color':'#3a2810','text-halo-color':'rgba(255,255,255,0.9)','text-halo-width':1} },
    ]
  };
}
