// Style MapLibre partagé — Protomaps couches complètes
function mlStyle() {
  const SRC = 'basemap';
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
      // Fond
      { id:'bg', type:'background', paint:{'background-color':'#f5f0e8'} },

      // Eau
      { id:'water-area', type:'fill', source:SRC, 'source-layer':'water',
        paint:{'fill-color':'#a8cce0','fill-opacity':0.9} },
      { id:'water-line', type:'line', source:SRC, 'source-layer':'waterway',
        paint:{'line-color':'#7ab0d0','line-width':['interpolate',['linear'],['zoom'],6,0.4,12,2]} },

      // Forêts et parcs
      { id:'landuse-forest', type:'fill', source:SRC, 'source-layer':'landuse',
        filter:['in',['get','kind'],['literal',['forest','wood','nature_reserve','park','national_park','protected_area']]],
        paint:{'fill-color':'#c8e0b8','fill-opacity':0.7} },
      { id:'landuse-farm', type:'fill', source:SRC, 'source-layer':'landuse',
        filter:['in',['get','kind'],['literal',['farmland','farmyard','meadow','grass']]],
        paint:{'fill-color':'#e8ead8','fill-opacity':0.5} },

      // Bâti
      { id:'buildings', type:'fill', source:SRC, 'source-layer':'buildings',
        minzoom:13,
        paint:{'fill-color':'#ddd8cc','fill-opacity':0.6} },

      // Routes — ordre : autoroutes → nationales → secondaires → locales → vélo/chemin
      { id:'road-motorway', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'motorway'],
        paint:{'line-color':'#e89060','line-width':['interpolate',['linear'],['zoom'],5,1,12,5]} },
      { id:'road-trunk', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'trunk'],
        paint:{'line-color':'#e8b060','line-width':['interpolate',['linear'],['zoom'],5,0.8,12,4]} },
      { id:'road-primary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'primary'],
        paint:{'line-color':'#d8c080','line-width':['interpolate',['linear'],['zoom'],6,0.6,12,3]} },
      { id:'road-secondary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'secondary'],
        paint:{'line-color':'#d0c090','line-width':['interpolate',['linear'],['zoom'],7,0.5,12,2.5]} },
      { id:'road-tertiary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'tertiary'],
        paint:{'line-color':'#c8c098','line-width':['interpolate',['linear'],['zoom'],8,0.4,13,2]} },
      { id:'road-minor', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind'],['literal',['minor_road','service','unclassified','residential']]],
        minzoom:11,
        paint:{'line-color':'#d8d0c0','line-width':['interpolate',['linear'],['zoom'],11,0.4,14,1.5]} },
      // Pistes cyclables — en vert
      { id:'road-cycleway', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind'],['literal',['cycleway','path','track']]],
        minzoom:9,
        paint:{'line-color':'#4a8a3a','line-width':['interpolate',['linear'],['zoom'],9,0.6,14,2],'line-dasharray':[3,2]} },

      // Frontières
      { id:'boundaries', type:'line', source:SRC, 'source-layer':'boundaries',
        filter:['<=',['get','admin_level'],4],
        paint:{'line-color':'#a09080','line-width':1,'line-dasharray':[4,3],'line-opacity':0.6} },

      // Labels routes
      { id:'road-labels', type:'symbol', source:SRC, 'source-layer':'roads',
        minzoom:12,
        filter:['in',['get','kind'],['literal',['primary','secondary','tertiary']]],
        layout:{'text-field':['get','name'],'text-size':9,'text-font':['Noto Sans Regular'],'symbol-placement':'line'},
        paint:{'text-color':'#666','text-halo-color':'#fff','text-halo-width':1} },

      // Labels villes — toutes tailles
      { id:'place-country', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['==',['get','kind'],'country'],
        layout:{'text-field':['coalesce',['get','name:fr'],['get','name']],'text-size':['interpolate',['linear'],['zoom'],3,10,8,16],'text-font':['Noto Sans Bold'],'text-transform':'uppercase'},
        paint:{'text-color':'#3a2a1a','text-halo-color':'rgba(255,255,255,.8)','text-halo-width':1.5} },
      { id:'place-state', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['==',['get','kind'],'region'],
        minzoom:5,
        layout:{'text-field':['coalesce',['get','name:fr'],['get','name']],'text-size':['interpolate',['linear'],['zoom'],5,9,10,13],'text-font':['Noto Sans Italic']},
        paint:{'text-color':'#5a4a3a','text-halo-color':'rgba(255,255,255,.8)','text-halo-width':1} },
      { id:'place-city', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['city','town']]],
        minzoom:5,
        layout:{'text-field':['coalesce',['get','name:fr'],['get','name']],'text-size':['interpolate',['linear'],['zoom'],5,9,12,15],'text-font':['Noto Sans Regular']},
        paint:{'text-color':'#2a2018','text-halo-color':'rgba(255,255,255,.9)','text-halo-width':1.5} },
      { id:'place-village', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['village','hamlet','suburb','neighbourhood']]],
        minzoom:9,
        layout:{'text-field':['coalesce',['get','name:fr'],['get','name']],'text-size':['interpolate',['linear'],['zoom'],9,9,14,13],'text-font':['Noto Sans Regular']},
        paint:{'text-color':'#3a3028','text-halo-color':'rgba(255,255,255,.9)','text-halo-width':1} },
    ]
  };
}

