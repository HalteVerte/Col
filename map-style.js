// Style MapLibre — Protomaps v4 couches vérifiées
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
      // Fond
      { id:'bg', type:'background',
        paint:{'background-color':'#f5f0e8'} },

      // Terre (earth = continents/îles)
      { id:'earth', type:'fill', source:SRC, 'source-layer':'earth',
        paint:{'fill-color':'#f0ece4'} },

      // Couverture végétale (landcover — zoom 0-7)
      { id:'landcover', type:'fill', source:SRC, 'source-layer':'landcover',
        paint:{'fill-color':[
          'match',['get','kind'],
          'grass','#ddeec8','scrub','#d8e8c0','trees','#c8e0b0','forest','#c0dca8',
          'snow','#f0f4f8','sand','#ede8d0',
          '#e8e4dc'
        ],'fill-opacity':0.7} },

      // Landuse (zoom 2+)
      { id:'landuse', type:'fill', source:SRC, 'source-layer':'landuse',
        paint:{'fill-color':[
          'match',['get','kind'],
          'forest','#c0dca8','park','#cce8b8','nature_reserve','#c8e0b0',
          'farmland','#ede8d4','meadow','#e4ecd0','residential','#e8e4dc',
          'industrial','#ddd8cc','commercial','#e0dcd4',
          '#e8e4dc'
        ],'fill-opacity':0.6} },

      // Eau
      { id:'water', type:'fill', source:SRC, 'source-layer':'water',
        paint:{'fill-color':'#a8cce0'} },
      { id:'water-line', type:'line', source:SRC, 'source-layer':'water',
        filter:['==',['get','kind'],'river'],
        paint:{'line-color':'#7ab0d0',
               'line-width':['interpolate',['linear'],['zoom'],5,0.5,12,2.5]} },

      // Bâtiments (zoom 13+)
      { id:'buildings', type:'fill', source:SRC, 'source-layer':'buildings',
        minzoom:13,
        paint:{'fill-color':'#ddd8cc','fill-opacity':0.5} },

      // Routes principales
      { id:'road-motorway', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'motorway'],
        paint:{'line-color':'#e08840',
               'line-width':['interpolate',['linear'],['zoom'],5,1,10,4,14,7]} },
      { id:'road-trunk', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'trunk'],
        paint:{'line-color':'#e0a040',
               'line-width':['interpolate',['linear'],['zoom'],5,0.8,10,3,14,6]} },
      { id:'road-primary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'primary'],
        paint:{'line-color':'#d4b060',
               'line-width':['interpolate',['linear'],['zoom'],6,0.6,10,2.5,14,5]} },
      { id:'road-secondary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'secondary'],
        paint:{'line-color':'#c8b870',
               'line-width':['interpolate',['linear'],['zoom'],7,0.5,12,2,14,4]} },
      { id:'road-tertiary', type:'line', source:SRC, 'source-layer':'roads',
        filter:['==',['get','kind'],'tertiary'],
        paint:{'line-color':'#c0b878',
               'line-width':['interpolate',['linear'],['zoom'],8,0.4,12,1.5,14,3]} },
      { id:'road-minor', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind'],['literal',['minor_road','service']]],
        minzoom:11,
        paint:{'line-color':'#d4ceb8',
               'line-width':['interpolate',['linear'],['zoom'],11,0.4,14,1.5]} },

      // Pistes cyclables — kind_detail contient cycleway/path/track
      { id:'road-cycle', type:'line', source:SRC, 'source-layer':'roads',
        filter:['in',['get','kind_detail'],['literal',['cycleway','path','track','bridleway']]],
        minzoom:8,
        paint:{'line-color':'#3a8a2a',
               'line-width':['interpolate',['linear'],['zoom'],8,0.8,12,2,14,3],
               'line-dasharray':[4,2]} },

      // Frontières
      { id:'boundaries', type:'line', source:SRC, 'source-layer':'boundaries',
        paint:{'line-color':'#b0a090',
               'line-width':0.8,
               'line-dasharray':[4,3],
               'line-opacity':0.7} },

      // Labels places — toutes tailles, filtrées par population_rank
      { id:'place-country', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['==',['get','kind'],'country'],
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],3,11,8,18],
          'text-font':['Noto Sans Regular'],
          'text-transform':'uppercase'
        },
        paint:{'text-color':'#3a2a1a','text-halo-color':'rgba(255,255,255,0.9)','text-halo-width':2} },

      { id:'place-city', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['city','town']]],
        minzoom:4,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],4,9,8,13,12,16],
          'text-font':['Noto Sans Regular'],
          'text-anchor':'center'
        },
        paint:{'text-color':'#1a1410','text-halo-color':'rgba(255,255,255,0.95)','text-halo-width':1.5} },

      { id:'place-village', type:'symbol', source:SRC, 'source-layer':'places',
        filter:['in',['get','kind'],['literal',['village','hamlet','locality','suburb','quarter','neighbourhood']]],
        minzoom:9,
        layout:{
          'text-field':['coalesce',['get','name:fr'],['get','name'],''],
          'text-size':['interpolate',['linear'],['zoom'],9,9,12,12,14,14],
          'text-font':['Noto Sans Regular'],
          'text-anchor':'center'
        },
        paint:{'text-color':'#3a3020','text-halo-color':'rgba(255,255,255,0.95)','text-halo-width':1.2} },
    ]
  };
}
