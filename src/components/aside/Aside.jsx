//导航栏
import React from 'react';
import {Link} from 'react-router'
import * as menudata from '../../pages/menudata/menudata';
import './Aside.scss';

class aside extends React.Component{
    constructor(props) {
        super(props);
        this.state={list:[],luheight:[]};
    }
    componentDidMount(){
		var product = menudata.navlist[this.props.id];
        var luheight =[];
        for (var i = 0; i < product.aside.length; i++) {
            luheight.push({height:"26px"});
        }
		this.setState({list:product.aside,luheight:luheight});
    }
    _titleClick(e){
        var luheight =[];
        for (var i = 0; i < this.state.list.length; i++) {
            luheight.push({height:"26px"});
        }
        var h='100%';
        for (var key in this.state.list[e]) {
            h=this.state.list[e][key].length*26+26+'px';
        }
        luheight[e]={height:h,transition:"height 1s"};
        this.setState({luheight:luheight});
    }
    render() {
    const alist = this.state.list.map((list,i) => {
        if (list.no!=null&&list.on!='undefined') {
            return <Asideli parent={this.props.parent} li={list.no} key={i}/>;
        }else{
            return <Asidelu parent={this.props.parent} handleClick={this._titleClick.bind(this,i)} luheight={this.state.luheight[i]} lu={list} key={i} callback={this.props.callback}/>;
        }
    });
    return  <div>
              {alist}
            </div>
    }
};

class Asideli extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const ali = this.props.li.map((list,i) => {
        return  <span className="aside_li" key={i}>
                <Link to={this.props.parent+'/'+this.props.parent+'session/' + list} activeClassName="active">
                {list}
                </Link>
        </span>
    });
        return  <div>
                  {ali}
                </div>
    }
};

class Asidelu extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        var lus=[];
        var key='';
        for(key in this.props.lu){
            lus=this.props.lu[key];
        }
        return  <div className='aside_lu' style={this.props.luheight}>
                    <span className="aside_title" onClick={this.props.handleClick}>{key}</span>
                    <Asideli parent={this.props.parent} li={lus} callback={this.props.callback}/>
                </div>
    }
};

export default aside;
