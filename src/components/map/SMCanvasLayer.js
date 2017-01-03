import {
    GridLayer
}
from 'leaflet'

var SMCanvasLayer = GridLayer.extend({
    initialize: function(url, options) {
        this._url = url;
        this._options = L.setOptions(this, options);
        this.geturl();
    },
    preImage: function(url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }

        img.onload = function() { //图片下载完毕时异步调用callback函数。
            callback.call(img); //将回调函数的this替换为Image对象
        };
    },
    geturl: function() {
        var layerurl = this._url + "/image.png?redirect=false&width=256&height=256";
        //为url添加安全认证信息片段
        // if (SuperMap.Credential && SuperMap.Credential.CREDENTIAL) {
        //     layerurl += "&" + SuperMap.Credential.CREDENTIAL.getUrlParameters();
        // }
        //切片是否透明
        var transparent = true;
        if (this._options && this._options.transparent != undefined) {
            transparent = this._options.transparent;
        }
        layerurl += "&transparent=" + transparent;
        //是否使用缓存
        var cacheEnabled = true;
        if (this._options && this._options.cacheEnabled != undefined) {
            cacheEnabled = this._options.cacheEnabled;
        }
        layerurl += "&cacheEnabled=" + cacheEnabled;
        //如果有layersID，则是在使用专题图
        if (this._options && this._options.layersID != undefined) {
            layerurl += "&layersID=" + this._options.layersID;
        }
        //如果有projection，并且只能是4326或者3857的地图。
        var projection = "3857";
        if (this._options && this._options.projection) {
            if (this._options.projection === "3857") {
                projection = "3857";
            } else if (this._options.projection === "4326") {
                projection = "4326";
            }
        }
        layerurl += "&projection=" + projection;
        //计算分辨率和比例尺
        var resLen = 17;
        var resStart = 0;
        var resolutions = [];

        var dpi = 95.99999999999984;

        var scales = [];
        if (projection === "3857") {
            for (var i = resStart; i <= resLen; i++) {
                var res3857 = 156543.0339 / Math.pow(2, i);
                resolutions.push(res3857);
                var scale3857 = 0.0254 / dpi / res3857;
                scales.push(scale3857);
            }
        } else {
            for (var i = resStart; i <= resLen; i++) {
                var res4326 = 1.40625 / Math.pow(2, i);
                resolutions.push(res4326);
                var scale4326 = 0.0254 * 360 / dpi / res4326 / Math.PI / 2 / 6378137;
                scales.push(scale4326);
            }
        }
        this._resolutions = resolutions;
        this._scales = scales;
        this._projection = projection;
        this._url = layerurl;
    },
    createTile: function(coords) {
        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;
        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        var ctx = tile.getContext('2d');
        // return the tile so it can be rendered on screen
        var x = coords.x;
        var y = coords.y;
        var po = Math.pow(2, coords.z);

        x -= po / 2;
        y = po / 2 - y - 1;
        //使用bounds出图（也可以使用center）
        var left = x * 256 * this._resolutions[coords.z];
        var bottom = y * 256 * this._resolutions[coords.z];
        var right = (x + 1) * 256 * this._resolutions[coords.z];
        var top = (y + 1) * 256 * this._resolutions[coords.z];
        //将bounds组合到url里面
        var tileUrl = this._url + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + left + ",\"y\":" + bottom + "},\"rightTop\" : {\"x\":" + right + ",\"y\":" + top + "}}";

        tileUrl += "&scale=" + this._scales[coords.z];
        var epsg = this._projection === "3857" ? 3857 : 4326;
        tileUrl += "&prjCoordSys={\"epsgCode\":" + epsg + "}";
        this.preImage(tileUrl, function() {
            ctx.drawImage(this, 0, 0, 256, 256);
        });
        return tile;
    }
});

var smcanvasLayer = function(url, options) {
    return new SMCanvasLayer(url, options);
};

module.exports = smcanvasLayer;