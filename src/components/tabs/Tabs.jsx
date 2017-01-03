import React from 'react';
import './tab.style.css'

//tab主体
class Tabs extends React.Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0
        }
    }
    handleControlClick(e) {
        if (e.target && e.target.nodeName == "LI") {
            this.setState({currentIndex:parseInt(e.target.id,10)})
        }
    }
    getControlTabClass(index){
        return this.state.currentIndex === index ? "tab-li tab-li__active":"tab-li";
    }
    getPanelClass(index){

         return this.state.currentIndex === index ? "tab-panel tab-panel__active tab-panel__in":"tab-panel";
    }
    render() {
        return (
            <div className="tab-container">
                {/*Tab 导航栏*/}
                <ul onClick={this.handleControlClick.bind(this)} className="tab-ul">
                    {
                        React.Children.map(this.props.children, (element, index) => {
                            return <li className={this.getControlTabClass(index)} id={index}>{element.props.name}
                            </li>
                        })
                    }
                </ul>
                {/*Tab panel*/}
                <div className="tab-panel--container">
                    {
                        React.Children.map(this.props.children, (element, index) => {
                            return <div className={this.getPanelClass(index)}>{element}</div>
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Tabs;