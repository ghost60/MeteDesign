import React from 'react';
import './Title.scss';

class Title extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      const backimg=this.props.backimg;
      const backurl='url('+backimg+') no-repeat';
      return  <div className="title_body" style={{background:backurl}}>
                <img className="title_img" src={this.props.imgurl} />
                <span>{this.props.text}</span>
              </div>
      }
};

Title.defaultProps = {
    imgurl: '',
    backimg:'',
}

export default Title;
