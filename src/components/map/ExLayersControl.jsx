import React, { Component } from 'react'
import {LayerGroup,LayersControl,Map,TileLayer,Marker} from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl
import SuperMapTileLayer from './SuperMapTileLayer';
import ExWMSTileLayer from './ExWMSTileLayer';
import './leaflet.css';

export default class ExLayersControl extends Component {
  constructor(props) {
      super(props);
  }
  render () {
    let url = "http://support.supermap.com.cn:8090/iserver/services/map-china400/rest/maps/China";
    // let url = "http://localhost:8090/iserver/services/map-china400/rest/maps/China";
    // let url = "http://localhost:8090/iserver/services/map-ChinaProvinces/rest/maps/ChinaProvinces";
    return (
        <LayersControl position='topright'>
          <BaseLayer checked name='SuperMap'>
            <SuperMapTileLayer url={url}/>
          </BaseLayer>
          <BaseLayer name='天地图地图'>
            <LayerGroup>
              <ExWMSTileLayer type={'TianDiTu.Normal.Map'} options={{maxZoom: 18,minZoom: 1}} />
              <ExWMSTileLayer type={'TianDiTu.Normal.Annotion'} options={{maxZoom: 18,minZoom: 1}} />
            </LayerGroup>
          </BaseLayer>
          <BaseLayer name='天地图影像'>
            <LayerGroup>
             <ExWMSTileLayer type={'TianDiTu.Satellite.Map'} options={{maxZoom: 18,minZoom: 1}} />
             <ExWMSTileLayer type={'TianDiTu.Satellite.Annotion'} options={{maxZoom: 18,minZoom: 1}} />
            </LayerGroup>
          </BaseLayer>
          <BaseLayer name='高德地图'>
            <LayerGroup>
              <ExWMSTileLayer type={'GaoDe.Normal.Map'} options={{maxZoom: 18,minZoom: 1}} />
            </LayerGroup>
          </BaseLayer>
          <BaseLayer name='高德影像'>
            <LayerGroup>
              <ExWMSTileLayer type={'GaoDe.Satellite.Map'} options={{maxZoom: 18,minZoom: 1}} />
              <ExWMSTileLayer type={'GaoDe.Satellite.Annotion'} options={{maxZoom: 18,minZoom: 1}} />
            </LayerGroup>
          </BaseLayer>
          <BaseLayer name='Google地图'>
            <LayerGroup>
              <ExWMSTileLayer type={'Google.Normal.Map'} options={{maxZoom: 18,minZoom: 1}} />
            </LayerGroup>
          </BaseLayer>
          <BaseLayer name='Google影像'>
            <LayerGroup>
              <ExWMSTileLayer type={'Google.Satellite.Map'} options={{maxZoom: 18,minZoom: 1}} />
            </LayerGroup>
          </BaseLayer>
          <Overlay name='数据'>
            {this.props.children}
          </Overlay>
          <Overlay name='标记'>
            <Marker position={[30.67,104.06]}>
            </Marker>
          </Overlay>
        </LayersControl>
    )
  }
}
