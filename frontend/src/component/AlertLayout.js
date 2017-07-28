import React, { Component, PropTypes } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import tabs, { defaultActiveKey } from '../const/simiaodetailtap.js';
// import '../css/Detailnav.css';
class AlertLayout extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    render() {
        const { title, content, okaction, cancleaction } = this.props;
        return (
            <div className="lt_alert">
                <div className='lt_alert_content'>
                    <div className='lt_alert_title'>{'取消关注'}</div>
                    <div className='lt_alert_info'>{'确定取消吗？'}</div>
                    <div className='lt_alert_foot'>
                        <div className='lt_alert_foot_bottom'  onClick={cancleaction}>{'取消'}</div>
                        <div className='lt_alert_foot_bottom'  onClick={okaction}>{'确定'}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AlertLayout;
