import React, { Component, PropTypes } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import tabs from '../const/tabs';

export default class TabsLayout extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleChange = key => {

    this.context.router.push(`/${key}`)
  }

  callback = (...args) => {
    console.log(...args);
  }

  render() {
    const {active_key,default_ActiveKey}=this.props;
    return (
      <div className="caa-layout">
        <Tabs
          defaultActiveKey={default_ActiveKey}
          pageSize={3}
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
