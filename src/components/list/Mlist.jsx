import React from 'react';
import {Link,IndexLink} from 'react-router';
import './Mlist.scss';

class mlist extends React.Component{
  constructor(props) {
        super(props);
    }
    render() {
        const list = this.props.list.map((li,i) => {
                return  <li className="mlist_li" key={i}>
                            <IndexLink to = "/" activeClassName="active">
                            {li.content}
                            </IndexLink>
                            <span>{li.tag}</span>
                        </li>
                    }
        );
        return  <lu>
                  {list}
                </lu>
    }
};
export default mlist;
