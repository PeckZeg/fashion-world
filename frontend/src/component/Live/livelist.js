import React, { Component } from 'react';
import { WhiteSpace, ListView, RefreshControl, WingBlank } from 'antd-mobile';
import LiveCell from './livecell';
import jQ from 'jquery'
import Proxy from '../../tools/proxy.js';
// import icons from '../icons';
const lastposy = 0;
const scrolling = false;
const cards = [
    { id: 1, title: '轮播图 1', image: 'http://localhost/carousel-1.png' },
    { id: 2, title: '轮播图 2', image: 'http://localhost/carousel-1.png' },
    { id: 3, title: '轮播图 3', image: 'http://localhost/carousel-1.png' },
    { id: 4, title: '轮播图 4', image: 'http://localhost/carousel-1.png' },
    { id: 5, title: '轮播图 5', image: 'http://localhost/carousel-1.png' }
];
// const playIcon = icons.play({ size: 'xxs' });
export default class LivesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            newsdata: [],
            refreshing: false,
            isLoading: false,
            hasMore: true,
            next_page_url: null,
            height: screen.height - 50,
            page: 0,
            isup: false
        };
    };
    componentDidMount() {

        // var _this = this;

        if (this.props.nextpageurl == null) {
            this.setState({ hasMore: false });
        }
        // setTimeout(function () {
        this.setState({ newsdata: this.props.newslist, next_page_url: this.props.nextpageurl })
        // }, 500);

    }
    onRefresh = () => {
        const { newslist, onnewsclick } = this.props;
        this.setState({ refreshing: true });
        var _this = this;
        // var token = localStorage.getItem("usertoken");
        var url = 'http://cms.sdwhcn.com/api/article/list';

        Proxy.get(url, function (data) {
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
            });
        })
    };
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        var token = localStorage.getItem("usertoken");
        var _this = this;
        console.log('reach end', event);
        this.setState({ isLoading: true });
        Proxy.get(_this.state.next_page_url, function (data) {
            var listdata = JSON.parse(data).data.data;
            var newlist = _this.state.newsdata.concat(listdata);
            if (JSON.parse(data).data.next_page_url == null) {
                _this.setState({ hasMore: false, newsdata: newlist, isLoading: false, next_page_url: JSON.parse(data).data.next_page_url });
            }
            else {
                _this.setState({ newsdata: newlist, isLoading: false, next_page_url: JSON.parse(data).data.next_page_url });
            }
        }, token)
    }

    handleItemClick = (...args) => {
        if (typeof this.props.onVideoClick == 'function') {
            this.props.onVideoClick(...args);
        }
    }
    handleCardClick = card => {
        console.log(card);

    }
    onScroll = () => {
        if (scrolling == false) {
            var livesh = screen.height - 50;
            var scrollv = jQ('.am-list-view-scrollview-content')[0];
            var listpoy = JSON.parse(jQ('.am-list-view-scrollview-content')[0].style.transform.split(" ")[1].replace('px,', ''))
            var index = Math.floor(listpoy / -livesh)

            if (listpoy < lastposy) {
                // console.log('down', lastposy - listpoy);
                if (lastposy - listpoy > 100) {
                    scrolling = true;
                    lastposy = listpoy;
                    // jQ('.am-list-view-scrollview-content')[0].animate({})
                    // jQ('.am-list-view-scrollview-content').css({ transform: 'translate3d(0px, -1100px, 0px) scale(1)' });
                    // this.refs.liveslist.scrollTo(0, -index * livesh)
                    console.log('juli', -index * livesh);
                    setTimeout(function () { scrolling = false }, 500);
                }
            }
            else {
                // console.log('up', listpoy - lastposy);
                if (listpoy - lastposy > 100 && index != 0) {
                    scrolling = true;
                    lastposy = listpoy;
                    // this.refs.liveslist.scrollTo(0, -(index - 1) * livesh)
                    console.log('juli', -(index + 1) * livesh);
                    setTimeout(function () { scrolling = false }, 500);
                }
            }
        }
        // var index = Math.floor(listpoy / -livesh)
        // listpoy % livesh < -livesh / 2 ? this.refs.liveslist.scrollTo(0, -(index - 1) * livesh) : this.refs.liveslist.scrollTo(0, -index * livesh)
        // this.refs.liveslist.scrollTo(0,)
        // 
        // jQ('.am-list-view-scrollview-content')[0].style.transform;
        // console.log(lastposy - listpoy);

    }
    onScrollEnd = () => {
        console.log('onScrollEnd');
    }
    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const { newslist, onnewsclick } = this.props;
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
        //renderSeparator={separator}
        const row = (rowData, sectionID, rowID) => {
            return (
                <LiveCell rowData={rowData} rowID={rowID} sectionID={sectionID} onClick={onnewsclick} />
            );
        };

        return (
            <div>
                <ListView
                    ref='liveslist'
                    dataSource={ds.cloneWithRows(this.state.newsdata)}
                    renderRow={row}
                    initialListSize={10}
                    pageSize={5}
                    style={{
                        height: document.documentElement.clientHeight - 50,
                        width: document.documentElement.width,
                    }}
                    scrollerOptions={{ scrollbars: true }}
                    scrollRenderAheadDistance={500}
                    onScroll={this.onScroll}
                    pagingEnabled={true}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    renderFooter={() => <div style={{ marginBottom: '75px', marginTop: '20px', textAlign: 'center' }}>
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
