import React from 'react';
import './Footer.scss';
import {Row,Col} from 'react-bootstrap';

class footer extends React.Component{ 
  constructor(props) {
      super(props);
  }    
  render() {             
	return  <div className="footer_div">
            <div>&copy;版权所有 2005-2011 国家海洋局厦门预报台</div>
            <div>电话：0592-2065005 地址：厦门市思明区环岛东路3909号 邮编：361008</div>
          </div>  
    		                      			            	
      }     
};
export default footer;
