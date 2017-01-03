import React from 'react';
import {Link,IndexLink} from 'react-router';

export default class Card extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return  <div className="card-body" style={this.props.card_body}>
                    <div className="card-title" style={this.props.card_title}>
                        <span>{this.props.title}</span>
                    </div>
                    <div className="card-content" style={this.props.card_content}>
                        {this.props.children}
                    </div>
                </div>
        }
};

