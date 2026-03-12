// Style MapLibre — fond OSM raster uniquement (PMTiles CORS non supporté sur GitHub Releases)
function mlStyle() {
  return {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap'
      }
    },
    layers: [
      {
        id: 'osm-tiles',
        type: 'raster',
        source: 'osm',
        paint: { 'raster-opacity': 1 }
      }
    ]
  };
}

// Déclenche cb immédiatement si la carte est déjà chargée, sinon attend load
function onMapReady(map, cb) {
  if (map.isStyleLoaded()) cb();
  else map.on('load', cb);
}
