import React, { Component } from 'react';
import { WhiteSpace, ListView, RefreshControl, WingBlank } from 'antd-mobile';
import CaaCarousel from '../XYCarousel';
import SimiaoCell from './SimiaoCell';
import Proxy from '../../tools/proxy.js';
// import icons from '../icons';
const cards = [
  { id: 1, title: '轮播图 1', image: 'http://localhost/carousel-1.png' },
  { id: 2, title: '轮播图 2', image: 'http://localhost/carousel-1.png' },
  { id: 3, title: '轮播图 3', image: 'http://localhost/carousel-1.png' },
  { id: 4, title: '轮播图 4', image: 'http://localhost/carousel-1.png' },
  { id: 5, title: '轮播图 5', image: 'http://localhost/carousel-1.png' }
];
// const playIcon = icons.play({ size: 'xxs' });
export default class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            refreshing: false,
            isLoading: false,
            hasMore: true,
            next_page_url: null,
        };
    };
    onRefresh = () => {
        const { title, newslist, onnewsclick } = this.props;
        this.setState({ refreshing: true });
          var _this = this;
        Proxy.get("http://cms.sdwhcn.com/api/temple/list", function (data) {
            var listh = [{}];
            var listdata = JSON.parse(data).data.data;
            _this.setState({ next_page_url: JSON.parse(data).data.next_page_url });
            setTimeout(function () {
                _this.setState({ loadingVisible: false });
            }, 1000);
            var newlist = listh.concat(listdata);
            _this.setState({ newsdata: newlist });
            _this.setState({
                // dataSource: this.state.dataSource.cloneWithRows(newslist),
                refreshing: false,
            });
        })
    };
    componentDidMount() {
        if(this.props.nextpageurl==null)
          {
            this.setState({hasMore:false});
          }
        this.setState({ newsdata: this.props.newslist, next_page_url: this.props.nextpageurl })
    }
    onScroll = () => {
        console.log('sss');
    };
    handleItemClick = (...args) => {
        if (typeof this.props.onVideoClick == 'function') {
            this.props.onVideoClick(...args);
        }
    }
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
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
        })
    }
    handleCardClick = card => {
        console.log(card);
    }
    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const { title, newslist, oncardclick,onnewsclick,cardslist} = this.props;
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#FFFFFF',
                    height: 8,
                    borderTop: '1px solid #FFFFFF',
                    borderBottom: '1px solid #FFFFFF',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
              rowID == 0 ? <div> <WhiteSpace  style={{backgroundColor:'#fff'}} size="lg" />
                    <div className="yx-news-topic" style={{backgroundColor:'#fff'}}>{title}</div>
                    <WhiteSpace style={{backgroundColor:'#fff'}} size="xs" /></div> :
                    <SimiaoCell rowData={rowData} rowID={rowID} sectionID={sectionID} onClick={onnewsclick} />
            );
        };

        return (
            <div>
                <ListView style={{backgroundColor:'#fff',width:'100%',height:'100%'}}
                    dataSource={ds.cloneWithRows(newslist)}
                    renderRow={row}
                      renderHeader={ () => {
						return (
                            <CaaCarousel tag='simiao' cards={cardslist} onCardClick={oncardclick} />)
					     } }
                    renderSeparator={separator}
                    initialListSize={5}
                    pageSize={5}
                    scrollRenderAheadDistance={200}
                    scrollEventThrottle={20}
                    style={{
                        height: document.documentElement.clientHeight,
                        width:document.documentElement.width,
                    }}
                    scrollerOptions={{ scrollbars: true }}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
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
