import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';

function init() {
  aylesfordlayers(map);

  let basemap1 = new TileLayer({
    source: new OSM("OSM_Links.html/OSM_Links.html")
  });
  
  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: fromLonLat([-64.835958, 45.027436]),
      zoom: 2
    })
  });
}

let aylesfordlayers = (map) => {

  // define style for restaurants
  let restStyle = new Style({
    image: new Icon({
      src: './icons/dining.png',
      scale: 0.25
    })
  });

  let roadStyle = new Style({
    stroke: new Stroke({
      color: 'red',
      width: 5
    })
  });

  // Define the restaurant layer
  let restFile = './geojsons/map.geojson';

  let restLayer = new VectorLayer({
    source: new VectorSource({
      url: restFile,
      format: new GeoJSON()
    }),
    style: restStyle
  });

  // define the road layer
  let roadFile = '/geojsons/roads.geojson';
  
  let roadLayer = new VectorLayer({
    source: new VectorSource({
      url: roadFile,
      format: new GeoJSON()
    }),
    style: roadStyle
  })

  // define the forest layer
  let forestFile = './geojsons/forests.geojson';

  let forestLayer = new VectorLayer({
    source: new VectorSource({
      url: forestFile,
      format: new GeoJSON()
    })
  })

  // add layers to map
  map.getLayers().extend([
    forestLayer,
    roadLayer,
    restLayer
  ]);

}
