import React from 'react';
import './MapSideBar.scss';

export class MapSideBar extends React.Component{
  constructor(props){
    super(props);
    this.state={show:'mapSideBar open',icon:'mapSideBar-show left',currentIndex:0};
  }
  show(e){
    this.state.show==='mapSideBar open'?this.setState({show:'mapSideBar close',icon:'mapSideBar-show right'}):this.setState({show:'mapSideBar open',icon:'mapSideBar-show left'});
  }
  tabselect(e){
    if (e.target && e.target.nodeName == "LI") {
            this.setState({currentIndex: parseInt(e.target.dataset.id)})
        }
  }
  tabliselect(index){
    return this.state.currentIndex==index?"tab-li active":"tab-li";
  }
  tabpaneselect(index){
    return this.state.currentIndex==index?"tab-pane active":"tab-pane";
  }
  getTabs(){
    var nav=React.Children.map(this.props.children, (tab, i) => {
      return  <li className={this.tabliselect(i)} data-id={i} onClick={this.tabselect.bind(this)}>{tab.props.name}</li>
    });
    var pane=React.Children.map(this.props.children, (pane, i) => {
      return  <div className={this.tabpaneselect(i)}>{pane.props.children}</div>
    });
    return  <div>
              <ul className="tab-nav">
                {nav}
              </ul>
              <div className="tab-content">
                {pane}
              </div>
            </div>
  }
  render(){
    return <div className={this.state.show}>
              <div className="mapSideBar-header">
                <span className={this.state.icon} onClick={this.show.bind(this)}></span>
              </div>
              <div className="mapSideBar-body">
                <div className="mapSideBar-tab clearfix">
                  {this.getTabs()}
                </div>
              </div>
           </div>
    }
}