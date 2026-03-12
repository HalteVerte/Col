// Style MapLibre — fond OSM raster + couches vectorielles PMTiles par-dessus
function mlStyle() {
  return {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap'
      },
      basemap: {
        type: 'vector',
        url: 'pmtiles://' + window.location.origin + '/tiles.pmtiles',
        attribution: ''
      }
    },
    layers: [
      // Fond OSM raster — toutes les villes, villages, routes visibles
      {
        id: 'osm-tiles',
        type: 'raster',
        source: 'osm',
        paint: { 'raster-opacity': 1 }
      },
      // Pistes cyclables vertes par-dessus OSM (OSM les montre mais peu visibles)
      {
        id: 'road-cycle',
        type: 'line',
        source: 'basemap',
        'source-layer': 'roads',
        filter: ['in', ['get', 'kind_detail'], ['literal', ['cycleway', 'path', 'track', 'bridleway']]],
        minzoom: 7,
        paint: {
          'line-color': '#1a8a10',
          'line-width': ['interpolate', ['linear'], ['zoom'], 7, 1.5, 11, 2.5, 14, 4],
          'line-dasharray': [4, 2],
          'line-opacity': 0.85
        }
      }
    ]
  };
}
