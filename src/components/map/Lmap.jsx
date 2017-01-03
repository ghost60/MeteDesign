import React from 'react';
import { Map,TileLayer,Marker,GeoJson,WMSTileLayer} from 'react-leaflet';
import './leaflet.css';

var values=[];

class Lmap extends React.Component{
  constructor(props) {
      super(props);
      this.state={data:{},style:{}};
  }
  componentDidMount(){
  }
  // onEachFeature(feature, layer) {
  //     var popupContent = '';
  //     if (feature.properties && feature.properties.MGMaxValue && feature.properties.MGMinValue) {
  //       popupContent = '最大值:' + feature.properties.MGMaxValue + ';最小值:' + feature.properties.MGMinValue;
  //     }
  //     layer.bindPopup(popupContent);
  // }
  style(feature) {
    if (feature.properties) {
      return feature.properties;
    }
  }
  // style(feature) {
  //     if (feature.properties.MGMaxValue && feature.properties.MGMinValue) {
  //       if (feature.properties.MGMaxValue>=25 && feature.properties.MGMinValue<=30) {
  //         return {
  //           weight: 2,
  //           color: "#999",
  //           opacity: 1,
  //           fillColor: "RGBA(255,255,164,255)",
  //           fillOpacity: 0.6
  //         }
  //       }
  //     }
  //     if (feature.properties.MGMaxValue && feature.properties.MGMinValue) {
  //       if (feature.properties.MGMaxValue>=25 && feature.properties.MGMinValue<=30) {
  //         return {
  //           weight: 2,
  //           color: "#999",
  //           opacity: 1,
  //           fillColor: "RGBA(255,255,164,255)",
  //           fillOpacity: 0.6
  //         }
  //       }
  //       if (feature.properties.MGMaxValue>=20 && feature.properties.MGMinValue<=25) {
  //         return {
  //           weight: 2,
  //           color: "#999",
  //           opacity: 1,
  //           fillColor: "RGBA(214,255,124,255)",
  //           fillOpacity: 0.6
  //         }
  //       }
  //       if (feature.properties.MGMaxValue>=15 && feature.properties.MGMinValue<=20) {
  //         return {
  //           weight: 2,
  //           color: "#999",
  //           opacity: 1,
  //           fillColor: "RGBA(173,255,164,255)",
  //           fillOpacity: 0.6
  //         }
  //       }
  //       if (feature.properties.MGMaxValue>=10 && feature.properties.MGMinValue<=15) {
  //         return {
  //           weight: 2,
  //           color: "#999",
  //           opacity: 1,
  //           fillColor: "RGBA(214,255,205,255)",
  //           fillOpacity: 0.6
  //         }
  //       }
  //       if (feature.properties.MGMaxValue>=5 && feature.properties.MGMinValue<=10) {
  //         return {
  //           weight: 2,
  //           color: "#999",
  //           opacity: 1,
  //           fillColor: "RGBA(187,214,246,255)",
  //           fillOpacity: 0.6
  //         }
  //       }
  //       if (feature.properties.MGMaxValue>=0 && feature.properties.MGMinValue<=5) {
  //         return {
  //           weight: 2,
  //           color: "#999",
  //           opacity: 1,
  //           fillColor: "RGBA(133,232,246,255)",
  //           fillOpacity: 0.6
  //         }
  //       }
  //     }
  // }
  addgeojson(){
    debugger
     $.ajax({
          url: './data/data.geojson',
          dataType: 'json',
          type: 'get',
          async: true,
          success: function(data) {
              this.setState({data:data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  setcolor(){
      this.setState({style:this.style});
  }
  render() {
      var x=102.8;
      var y=24.5;
      const position = [y,x];
      return  <div>
                <button onClick={this.addgeojson.bind(this)}>加载geojson</button>
                <button onClick={this.setcolor.bind(this)}>分段设色</button>
                <Map center={position} zoom={6} style={{height:"800px"}}>
                  <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                  <GeoJson data={this.state.data} style={this.state.style}/>
                  <Marker position={[30.67,104.06]}>
                  </Marker>
                </Map>
              </div>
      }
};
export default Lmap;
