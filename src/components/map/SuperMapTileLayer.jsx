import { tileLayer } from 'leaflet'
import { CanvasTileLayer } from 'react-leaflet'
import { PropTypes } from 'react'

class SuperMapTileLayer extends CanvasTileLayer {
    constructor(props) {
      super(props);
      this.state={resolutions:[],scales:[],projection:'3857',url:''};
  }
    preImage(url,callback){
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }

        img.onload = function () { //图片下载完毕时异步调用callback函数。
            callback.call(img);//将回调函数的this替换为Image对象
        };
    }
    drawTile(canvas, tilePoint, zoom){
        var resolutions=this.state.resolutions;
        var scales=this.state.scales;
        var projection=this.state.projection;
        var url=this.state.url;

        var ctx = canvas.getContext('2d');
        var x = tilePoint.x;
        var y = tilePoint.y;
        var po = Math.pow(2,zoom);

        x-=po/2;
        y=po/2-y-1;
        //使用bounds出图（也可以使用center）
        var left = x*256*resolutions[ zoom];
        var bottom = y*256*resolutions[zoom];
        var right = (x + 1)*256*resolutions[zoom];
        var top = (y + 1)*256*resolutions[zoom];
        //将bounds组合到url里面
        var tileUrl = url + "&viewBounds=" +"{\"leftBottom\" : {\"x\":" + left +",\"y\":" + bottom +"},\"rightTop\" : {\"x\":" + right +",\"y\":" +top + "}}";

        tileUrl +="&scale=" +scales[zoom];
        var epsg=projection==="3857"?3857:4326;
        tileUrl += "&prjCoordSys={\"epsgCode\":"+epsg+"}";
        this.preImage(tileUrl,function(){
            ctx.drawImage(this,0,0,256,256);
        });
    }
    componentWillMount () {
        super.componentWillMount();
        const { url, options, ...props} = this.props;
        let layer = tileLayer.canvas();
        var layerurl = url + "/image.png?redirect=false&width=256&height=256";
        //为url添加安全认证信息片段
        // if (SuperMap.Credential && SuperMap.Credential.CREDENTIAL) {
        //     layerurl += "&" + SuperMap.Credential.CREDENTIAL.getUrlParameters();
        // }
        //切片是否透明
        var transparent = true;
        if(options && options.transparent !=undefined)
        {
            transparent = options.transparent;
        }
        layerurl += "&transparent=" + transparent;
        //是否使用缓存
        var cacheEnabled = true;
        if(options && options.cacheEnabled !=undefined)
        {
            cacheEnabled = options.cacheEnabled;
        }
        layerurl += "&cacheEnabled=" + cacheEnabled;
        //如果有layersID，则是在使用专题图
        if(options && options.layersID !=undefined)
        {
            layerurl += "&layersID=" +options.layersID;
        }
        //如果有projection，并且只能是4326或者3857的地图。
        var projection="3857";
        if(options&&options.projection){
               if(options.projection==="3857"){
                    projection="3857";
               }else if(options.projection==="4326"){
                    projection="4326";
               }
        }
        layerurl+="&projection="+projection;
        //计算分辨率和比例尺
        var resLen = 17;
        var resStart = 0;
        var resolutions=[];

        var dpi = 95.99999999999984;

        var scales=[];
        if(projection==="3857"){
            for(var i=resStart;i<=resLen;i++){
               var res3857 = 156543.0339/Math.pow(2,i);
               resolutions.push(res3857);
               var scale3857 = 0.0254/dpi/res3857;
               scales.push(scale3857);
            }
            layer.scales=scales;
         }
        else{
            for(var i=resStart;i<=resLen;i++){
                var res4326 = 1.40625/Math.pow(2,i);
                resolutions.push(res4326);
                var scale4326 = 0.0254*360/dpi/res4326/Math.PI/2/6378137;
                scales.push(scale4326);
            }
            layer.scales=scales;
        }
        this.setState({resolutions:resolutions});
        this.setState({scales:scales});
        this.setState({projection:projection});
        this.setState({url:layerurl});

        layer.url = layerurl;
        layer.drawTile=this.drawTile.bind(this);
        this.leafletElement = layer;
    }

    // componentDidUpdate (prevProps: Object) {
    //     super.componentDidUpdate(prevProps);
    //     const { type, options, ...props} = this.props;
    //     this.leafletElement.setUrl(prevProps.url);
    // }
}

SuperMapTileLayer.propTypes = {
    url: PropTypes.string.isRequired,
  };

export default SuperMapTileLayer;