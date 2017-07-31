import React, { Component } from 'react';
import { WhiteSpace, ListView, RefreshControl, WingBlank } from 'antd-mobile';
import CaaCarousel from '../../XYCarousel';
import NewsCell from './cellview';
import CateNav from './catetab';
import Proxy from '../../../tools/proxy.js';
// import icons from '../icons';
// const playIcon = icons.play({ size: 'xxs' });
export default class OneList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            newsdata: [],
            refreshing: false,
            isLoading: false,
            hasMore: true,
            next_page_url: null,
            catelist:['服装时尚','流行趋势','人类学视角','循环经济','知识产权','社会影响','经济影响','全部']
        };
    };

    componentDidMount() {
        var _this = this;
        setTimeout(function () {
            if (_this.props.nextpageurl == null) {
                _this.setState({ hasMore: false });
            }
            _this.setState({ newsdata: _this.props.newslist, next_page_url: _this.props.nextpageurl })
        }, 500)
    }
    onRefresh = () => {
        const { tag, title, newslist, onnewsclick } = this.props;
        this.setState({ refreshing: true });
        var _this = this;
        var token = localStorage.getItem("usertoken");
        var url = 'http://cms.sdwhcn.com/api/article/list';
        if (tag == 'taglist') {
            url = `http://cms.sdwhcn.com/api/article/list/tag?tag_id=${this.props.location.query.tag_id}`;
        }
        Proxy.get(url, function (data) {
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
        }, token)
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
        if (this.state.next_page_url != null) {
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
        const { tag, title, newslist, onCardClick, onnewsclick, cardslist } = this.props;
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
                rowID == 0 ? tag == 'taglist' ? null :
                    <div> <WhiteSpace size="lg" />
                        <div className="yx-news-topic">{title}</div>
                        <WhiteSpace size="xs" /></div> :
                    <NewsCell tag='news' rowData={rowData} rowID={rowID} sectionID={sectionID} onClick={onnewsclick} />
            );
        };

        return (
            <div>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.newsdata)}
                    renderRow={row}
                    initialListSize={10}
                    pageSize={5}
                    renderHeader={() => {
                        return (
                            <div>
                            <CaaCarousel cards={cardslist} onCardClick={onCardClick} />
                            <CateNav catelist={this.state.catelist}/>
                            </div>
                        )
                    }}
                    style={{
                        height: document.documentElement.clientHeight - 50,
                        width: document.documentElement.width,
                    }}
                    scrollerOptions={{ scrollbars: true }}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={20}
                    onEndReached={this.onEndReached.bind(this)}
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
