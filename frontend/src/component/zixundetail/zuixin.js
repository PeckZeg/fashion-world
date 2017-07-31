import React, { Component } from 'react';
import { WhiteSpace, ListView, RefreshControl, WingBlank } from 'antd-mobile';
import NewsCell from '../zixun/NewsCell';
// const playIcon = icons.play({ size: 'xxs' });
export default class Zuixinlist extends Component {

    render() {
        const { title, newslist, oncardclick, onnewsclick, cardslist } = this.props;
        return (
            <div style={{backgroundColor:'#fff'}}>
                <WhiteSpace size="lg" />
                <div className="yx-news-topic-sm">{title}</div>
                <WhiteSpace size="xs" />
                {this.props.newslist && this.props.newslist.map((data, index) => (
                    <NewsCell tag='detail' rowData={data} key={index} onClick={onnewsclick} />
                ))
                }
            </div >
        );
    }
}
