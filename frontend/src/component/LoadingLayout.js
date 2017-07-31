import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

export default class LoadingLayout extends Component {
  render() {
    return (
      <div className="caa-loading-layout" style={{height:screen.height-50}}>
        {this.props.visible && (
          <div className="caa-loading-layout-icon">
            <Icon type="loading" size="md" />
          </div>
        )}
        {!this.props.visible && (
          <div className="caa-loading-layout-content">
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
