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
        modulesToLoad={['esri/Map', 'esri/views/SceneView']}    
        onReady={({loadedModules: [Map, SceneView], containerNode}) => {
          new SceneView({
            container: containerNode,
            map: new Map({basemap: 'streets', ground: 'world-elevation'})
          });
        }}
      />
    );
  }
}

export default WebMapView