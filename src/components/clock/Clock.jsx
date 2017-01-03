//主面板
import React from 'react';
import {Row,Col} from 'react-bootstrap';
import './Clock.scss';
var c;
class clock extends React.Component{ 
  constructor(props) {
    super(props);
    var dt = new Date()
    var time=dt.getFullYear()+'年'+ parseInt(dt.getMonth())+1+'月'+dt.getDate()+'日  '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
    this.state=({nowtime:time});
  }
  componentDidMount() {
    c = setInterval(() => {
      this.clock();
    }, 1000);   
  } 
  clock(){
    var dt = new Date()
    var time=dt.getFullYear()+'年'+ parseInt(dt.getMonth())+1+'月'+dt.getDate()+'日  '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
    this.setState({nowtime:time});
  }
  componentWillUnmount(){
    window.clearInterval(c);
  }  
  render() {
      return  <div className="clock_div">
                <img src={require('./images/clock.png')} />
                <span id="clock_time" className="clock_span">{this.state.nowtime}</span>             
              </div>                                  			            	
      }     
};
export default clock;
