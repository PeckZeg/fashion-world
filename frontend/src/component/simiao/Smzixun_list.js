import React, { Component } from 'react';
import { WhiteSpace, ListView, RefreshControl, WingBlank } from 'antd-mobile';
import NewsCell from '../zixun/NewsCell';
import Proxy from '../../tools/proxy.js';
export default class SmzixunList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            newsdata: [],
            refreshing: false,
            isLoading: false,
            hasMore: true,
            next_page_url: null,
        };
    };
    componentDidMount() {
        if (this.props.nextpageurl == null) {
            this.setState({ hasMore: false });
        }
        this.setState({ newsdata: this.props.newslist, next_page_url: this.props.nextpageurl })
    }
    onRefresh = () => {
        const { title, newslist, onnewsclick } = this.props;
        this.setState({ refreshing: true });
        var _this = this;
         var token = localStorage.getItem("usertoken");
        Proxy.get("http://cms.sdwhcn.com/api/article/list/temple?temple_id="+this.props.location.query.id, function (data) {
            // var listh = [{}];
            var listdata = JSON.parse(data).data.data;
            _this.setState({ next_page_url: JSON.parse(data).data.next_page_url });
            setTimeout(function () {
                _this.setState({ loadingVisible: false });
            }, 1000);
            // var newlist = listh.concat(listdata);
            _this.setState({ newsdata: listdata });
            _this.setState({
                // dataSource: this.state.dataSource.cloneWithRows(newslist),
                refreshing: false,
            },token);
        })

    };
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        var _this = this;
        console.log('reach end', event);
        this.setState({ isLoading: true });
        var token = localStorage.getItem("usertoken");
        Proxy.get(_this.state.next_page_url, function (data) {
            var listdata = JSON.parse(data).data.data;
            var newlist = _this.state.newsdata.concat(listdata);
            if (JSON.parse(data).data.next_page_url == null) {
                _this.setState({ hasMore: false, newsdata: newlist, isLoading: false, next_page_url: JSON.parse(data).data.next_page_url });
            }
            else {
                _this.setState({ newsdata: newlist, isLoading: false, next_page_url: JSON.parse(data).data.next_page_url });
            }
        },token)
    }



    handleItemClick = (...args) => {
        if (typeof this.props.onVideoClick == 'function') {
            this.props.onVideoClick(...args);
        }
    }
    handleCardClick = card => {
        console.log(card);
    }
    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const {tag,title, newslist, oncardclick, onnewsclick, cardslist } = this.props;
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#f8f8f8',
                    height: 8,
                    borderTop: '1px solid #f8f8f8',
                    borderBottom: '1px solid #f8f8f8',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                        <NewsCell tag='news' rowData={rowData} rowID={rowID} sectionID={sectionID} onClick={onnewsclick} />
            );
        };

        return (
            <div style={{backgroundColor:'#f8f8f8'}}>
                <ListView style={{ width: '100%', height: '100%' ,marginTop:'44px'}}
                    dataSource={ds.cloneWithRows(this.state.newsdata)}
                    renderRow={row}
                    renderSeparator={separator}
                    initialListSize={10}
                    pageSize={5}
                    style={{
                        height: document.documentElement.clientHeight,
                        width: document.documentElement.width,
                    }}
                    scrollerOptions={{ scrollbars: true }}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={20}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    renderFooter={() => <div style={{backgroundColor:'#f8f8f8',marginBottom:'75px',marginTop:'20px', textAlign: 'center' }}>
                        {this.state.isLoading ? '加载中...' : this.state.hasMore ? '加载完毕' : '没有数据了'}
                    </div>}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                >
                </ListView>
            </div>
        );
    }
}
