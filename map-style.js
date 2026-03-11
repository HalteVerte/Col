// Style MapLibre partagé — Protomaps couches complètes
function mlStyle() {
  const SRC = 'basemap';
  const PMTILES_URL = 'pmtiles://' + window.location.origin + '/tiles.pmtiles';
  return {
    version: 8,
    glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    sources: {
      basemap: {
        type: 'vector',
        url: PMTILES_URL,
        attribution: '© OpenStreetMap'
      }
    },
    layers: [
      // Fond
      { id:'bg', type:'background',
        paint:{'background-color':'#f5f0e8'} },

      // Eau
      { id:'water-area', type:'fill', source:SRC, 'source-layer':'water',
        paint:{'fill-color':'#a8cce0'} },
      { id:'waterway', type:'line', source:SRC, 'source-layer':'waterway',
        paint:{'line-color':'#7ab0d0',
               'line-width':['interpolate',['linear'],['zoom'],6,0.5,12,2]} },

      // Landuse
      { id:'landuse', type:'fill', source:SRC, 'source-layer':'landuse',
        paint:{'fill-color':[
          'match',['get','kind'],
          'forest','#c8e0b8','wood','#c8e0b8',
          'park','#d0e8c0','nature_reserve','#c8ddb8',
          'farmland','#ede8d8','meadow','#e8ecd8',
          '#ece8e0'
        ],'fill-opacity':0.6} },

      // Routes — toutes en une seule couche par zoom
      { id:'road-major', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind'],['literal',['motorway','trunk','primary']]],
        paint:{'line-color':'#d4a060',
               'line-width':['interpolate',['linear'],['zoom'],5,0.8,10,3,14,6]} },
      { id:'road-secondary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind'],['literal',['secondary','tertiary']]],
        paint:{'line-color':'#c8b878',
               'line-width':['interpolate',['linear'],['zoom'],7,0.5,12,2.5]} },
      { id:'road-minor', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind'],['literal',['minor_road','residential','unclassified','service']]],
        minzoom:11,
        paint:{'line-color':'#d8d0b8',
               'line-width':['interpolate',['linear'],['zoom'],11,0.4,14,1.5]} },
      // Pistes cyclables en vert
      { id:'road-cycle', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind'],['literal',['cycleway','path','track','bridleway']]],
        minzoom:9,
        paint:{'line-color':'#4a8a3a',
               'line-width':['interpolate',['linear'],['zoom'],9,0.8,14,2.5],
               'line-dasharray':[3,2]} },

      // Villes — labels
      { id:'place-city', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['city','town','village','hamlet']]],
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],
            5,9, 8,11, 12,14],
          'text-font':['Noto Sans Regular'],
          'text-anchor':'center',
          'text-max-width':8
        },
        paint:{
          'text-color':'#2a2018',
          'text-halo-color':'rgba(255,255,255,0.9)',
          'text-halo-width':1.5
        }
      },
    ]
  };
}
