import React from 'react';
import {Row,Col} from 'react-bootstrap';
import './Session.scss';

class session extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      return  <div className="session_title" >
                <span>{this.props.name}</span>
                <div className="session_content">
                   {this.props.children}
                </div>
              </div>
      }
};
export default session;
