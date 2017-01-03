import React from 'react';
import Parent from './Parent';

class Son extends Parent{
  constructor(props) {
        super(props);
    }
    show(){
    	alert('aaa');
    }
    render() {
    	debugger
    	React.Children.forEach(this.props.children, function(child){
    		debugger
    		var mm =child;
    	});
        return  <div>
                    <h1>hello</h1>
                    <button onClick={this.show.bind(this)}>方法</button>
                    {this.props.children}
                </div>
    }
};
export default Son;
