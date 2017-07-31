import React, { Component, PropTypes } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import tabs, { defaultActiveKey } from '../const/tabs.js';
import * as _ from 'lodash';
import TabsLayout from '../component/TabsLayout';

class NavBar extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false
        };
    }
    componentDidMount() {
    localStorage.getItem('usertoken')==null? this.context.router.push({ pathname: '/' }):null
    }
    handleTabChange = key => {
        let link = _.chain(tabs).filter(tab => tab.key == key).first().get('route').value();
        if (link) {
            this.context.router.push(link);
        }
    }
    render() {
        // let activekey = _.chain(this.props.routes).last().get('path').value() || defaultActiveKey;
             let activekey = this.props.location.pathname.split('/')[1]
        return (
            <TabsLayout
                default_ActiveKey={activekey}
                tabs={tabs}
                active_key={activekey}
                onChange={this.handleTabChange}>
                {this.props.children}
            </TabsLayout>
        );
    }
}
export default NavBar;