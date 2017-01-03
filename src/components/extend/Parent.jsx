import React from 'react';

class Parent extends React.Component{
  constructor(props) {
        super(props);
        this.state={name:'lala'};
        this.mm='mm';
    }
    show(){
        alert("父组件的方法");
    }
    render() {
        return  <h1>hello</h1>
    }
};
export default Parent;
