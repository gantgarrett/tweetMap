import React, {PureComponent} from 'react';
import EsriLoaderReact from 'esri-loader-react';

class WebMapView extends PureComponent {

  render() {
    const options = {
      url: 'https://js.arcgis.com/4.6/'
    };

    return (
      <EsriLoaderReact 
        options={options} 
        modulesToLoad={[
          'esri/Map', 
          'esri/views/SceneView', 
          'esri/layers/StreamLayer', 
          'esri/layers/GraphicsLayer'
        ]}    
        onReady={({loadedModules: [Map, SceneView, StreamLayer, GraphicsLayer], containerNode}) => {
          /***************************************
          * Set up map view with initial extent
          ***************************************/
          let map = new Map({
            basemap: "gray"
          })

          let view = new SceneView({
            map: map,
            container: containerNode,
            zoom: 7,
            center: [-87, 34]
          })

          let graphicsLayer = new GraphicsLayer()
          map.add(graphicsLayer)

          // Construct Stream Layer
          let streamLayer = new StreamLayer({
            url: 'https://geoeventsample1.esri.com:6443/arcgis/rest/services/LABus/StreamServer', // add actual URL here from Express server
            purgeOptions: {
              displayCount: 10000
            }
          })

          map.add(streamLayer)
        }}
      />
    );
  }
}

export default WebMapView