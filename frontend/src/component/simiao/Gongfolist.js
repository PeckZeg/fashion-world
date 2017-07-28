import React, { Component } from 'react';
import { WhiteSpace, ListView, WingBlank } from 'antd-mobile';
import Gongfocell from './Gongfocell';
import Gaoshengcell from './Gaoshengcell';
import Proxy from '../../tools/proxy.js';
// import icons from '../icons';

// const playIcon = icons.play({ size: 'xxs' });
export default class Gongfolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        console.log("当前" + this.props.newlist);
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



    handleItemClick = (...args) => {
        if (typeof this.props.onVideoClick == 'function') {
            this.props.onVideoClick(...args);
        }
    }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const { tag, newslist, oncardclick } = this.props;
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#f8f8f8',
                    height: 8
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                this.props.tag=='gongfo'?<Gongfocell tag='gongfo' rowData={rowData} rowID={rowID} sectionID={sectionID} onClick={oncardclick} />:
                <Gaoshengcell tag='gaosheng' rowData={rowData} rowID={rowID} sectionID={sectionID} onClick={oncardclick} />
            );
        };
        // console.log(newslist);
        return (
            <div style={{backgroundColor:'#f8f8f8'}}>
                <ListView style={{backgroundColor:'#f8f8f8', width: '100%', height: '100%'}}
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
                    renderFooter={() => <div style={{ marginBottom:'75px',marginTop:'20px', textAlign: 'center' }}>
                        {this.state.isLoading ? '加载中...' : this.state.hasMore ? '加载完毕' : '没有数据了'}
                    </div>}>
                </ListView>
            </div>
        );
    }
}
