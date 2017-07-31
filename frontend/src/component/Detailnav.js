import React, { Component, PropTypes } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import tabs, { defaultActiveKey } from '../const/simiaodetailtap.js';
// import '../css/Detailnav.css';
class DetailNav extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    handleChange = key => {
        this.context.router.push(`/${key}${this.props.simiaoid}`)
    }
    callback = (...args) => {
        console.log(...args);
    }
    render() {
        // let activekey = _.chain(this.props.routes).last().get('path').value() || defaultActiveKey;
       const {default_ActiveKey} = this.props;
        return (
            <div className="smcaa-layout">
                <Tabs
                    defaultActiveKey={default_ActiveKey}
                    pageSize={4}
                    swipeable={false}
                    onChange={this.handleChange}
                >
                    {
                        this.props.tabs && this.props.tabs.map(tab => (
                            <Tabs.TabPane key={tab.key} tab={tab.name}>
                                {this.props.children}
                            </Tabs.TabPane>
                        ))
                    }
                </Tabs>
            </div>
        );
    }
}

export default DetailNav;
