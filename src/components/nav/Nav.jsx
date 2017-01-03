//导航栏
import React from 'react';
import {Link,IndexLink} from 'react-router';
import './Nav.scss';

class Nav extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        debugger
        const list = this.props.navlist.map( (list,i) => {
            if (list.id==0) {
                console.log('路由跳转到 /');
                return  <div className="nav_li" key={list.id}>
                        <span>
                            <IndexLink to = "/" activeClassName="active">
                            {list.name}
                            </IndexLink>
                        </span>
                        </div>
            }else{
                console.log('路由跳转到:'+list.type);
                return  <div className="nav_li" key={list.id}>
                        <span>
                            <Link to={list.type} activeClassName="active">
                            {list.name}
                            </Link>
                        </span>
                        </div>

            }
        }
        );
        return  <div className="nav_body">
                  {list}
                </div>
    }
};
export default Nav;
