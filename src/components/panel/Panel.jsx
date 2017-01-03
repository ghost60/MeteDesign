import React from 'react';
import {Link,IndexLink} from 'react-router';
import './Panel.scss';

class Panel extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return  <div className="panel-body" style={this.props.panel_body}>
                </div>
        }
};

export default Panel;
