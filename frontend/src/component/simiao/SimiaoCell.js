import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { WhiteSpace } from 'antd-mobile';

export default class SimiaoCell extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { rowData, rowID, sectionID, onClick } = this.props;
        return (
            <div key={rowData.id} onClick={this.props.onClick.bind(this, rowData)}
                style={{
                    paddingTop: '15px',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    height:screen.width*0.7,
                    backgroundColor: 'white',
                }}>
                <div style={{ width: '100%', height:screen.width*0.55, background: `url(${rowData.banner}) no-repeat center` }} />

                <div style={{ top: '-55px', height: '55px', position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.33)', width: '100%' }}>
                    <div style={{ display: 'inline-block', marginTop: '10px' }}>
                        <div><span className="yx-simiao-title">{rowData.name}</span><span className="yx-simiao-tag">{"汉传"}</span></div>
                    </div>
                    <div className="yx-simiao-views">{rowData.views + '浏览 ·' + rowData.follows + '关注'}</div>
                </div>
                <div style={{
                    textAlign: "center",position: 'relative',
                    top: '-30px'
                }}>
                    <img className="yx-news-hua" src="http://cms.sdwhcn.com/web/libs/img/icon_hua.png" />
                </div>
            </div>
        );
    }
}
