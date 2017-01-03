import React from 'react';
import {Link,IndexLink} from 'react-router';
import './Imgplayer.scss';
var c;
var length;
var now=0;

class imgplayer extends React.Component{ 
    constructor(props) {
        super(props);
        this.state=({imgurl:'',data:this.props.list,play:'播放'});
    } 
    componentWillReceiveProps(nextProps) {
        if (!!nextProps.list.content && nextProps.list.content.length>0) {
            let url = nextProps.list.url + nextProps.list.content[0];
            this.setState({imgurl:url,data:nextProps.list});
        }
    }
    liClick(e){
        let url = this.props.list.url + e.target.dataset.liname;
        this.setState({imgurl:url});
    }
    playClick(){
        if (this.state.play==='播放') {
            length = this.state.data.content.length;        
            c = setInterval(() => {
                this.play();
            }, 2000); 
        }else{
            window.clearInterval(c);
            this.setState({play:'播放'});
        }
    }
    play(){
        now++;
        if (now>length-1) {
            now=0;
        }
        let url = this.state.data.url + this.state.data.content[now];
        this.setState({imgurl:url,play:'暂停'});
    }
    componentWillUnmount(){
        window.clearInterval(c);
    }
    render() {
        if (!!this.state.imgurl) {
            return  <div className="imgplayer_panel">        
                      <Imgshow url={this.state.imgurl}/>
                      <Imglist play={this.state.play} list={this.props.list.content} callback={this.liClick.bind(this)} playClick={this.playClick.bind(this)}/>
                    </div>
        }else{
            return <div><span>无数据</span></div>;
        }         
    }     
};

class Imglist extends React.Component{ 
  constructor(props) {
        super(props);
    }    
    render() { 
        const list = this.props.list.map((li,i) => {
                var lin=li.split('_');
                var lina=lin[lin.length-1];
                var linam=lina.split('.');
                var liname=linam[0];
                return  <li className="Imglist_li" key={i}>
                            <span data-liname={li} onClick={this.props.callback}>{liname}</span>
                        </li>
                    }
        );
        return  <div style={{height:"100%",width:"18%",display:"inline-block"}}>
                    <span className="Imglist_title">选择图片：</span>
                    <button className="Imglist_button" onClick={this.props.playClick}>{this.props.play}</button>
                    <lu className="Imglist_lu">   
                        {list}               
                    </lu>
                </div>
    }     
};

class Imgshow extends React.Component{ 
  constructor(props) {
        super(props);
    }    
    render() {
        return  <div style={{width: "80%",display:"inline-block"}}>
                  <img src={this.props.url} style={{width:"100%"}}/>
                </div>
    }     
};
export default imgplayer;
 