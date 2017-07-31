import React, { Component } from 'react';
import { Modal, Button, Toast, WhiteSpace, ListView, WingBlank, RefreshControl } from 'antd-mobile';
import Proxy from '../../tools/proxy.js';
import jQ from 'jquery';
import AlertLayout from '../AlertLayout.js';
const alert = Modal.alert;
export default class TempleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            newsdata: [],
            refreshing: false,
            isLoading: false,
            hasMore: true,
            next_page_url: null,
            currentdata: {},
            isshowandroid: false
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
        var url = 'http://cms.sdwhcn.com/api/temple/follows';

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
    backlastpage = () => {
        // this.refs.mymessage.style.display='none'
        //  jQ('.am-tabs-bar')[0].style.display = 'block';
        // console.log(this.refs.mymessage);
    }
    androidclick = (data) => {
        this.setState({ currentdata: data, isshowandroid: true });
    }
    cancleclick = () => {
        this.setState({ isshowandroid: false });
    }
    cancelfocus = (card) => {
        var _this = this;
        var token = localStorage.getItem("usertoken")
        if (!this.state.isshowandroid) {
            Proxy.delete("http://cms.sdwhcn.com/api/temple/follow?temple_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                var cur = _this.state.count - 1;
                Toast.info(carddata, 2);
                var url = 'http://cms.sdwhcn.com/api/temple/follows';
                Proxy.get(url, function (data) {
                    // var listh = [{}];
                    var listdata = JSON.parse(data).data.data;
                    _this.setState({ next_page_url: JSON.parse(data).data.next_page_url });
                    _this.setState({ newsdata: listdata });
                }, token)
                // _this.setState({ is_collection: 0, count: cur, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_normal.png" })
            }, token)
        } else {
            Proxy.delete("http://cms.sdwhcn.com/api/temple/follow?temple_id=" + this.state.currentdata.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                var cur = _this.state.count - 1;
                Toast.info(carddata, 2);
                var url = 'http://cms.sdwhcn.com/api/temple/follows';
                Proxy.get(url, function (data) {
                    // var listh = [{}];
                    var listdata = JSON.parse(data).data.data;
                    _this.setState({ next_page_url: JSON.parse(data).data.next_page_url });
                    _this.setState({ newsdata: listdata });
                    // setTimeout(function () {
                    _this.setState({ isshowandroid: false });
                    // }, 300)
                }, token)
                // _this.setState({ is_collection: 0, count: cur, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_normal.png" })
            }, token)
        }
    }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const { title, newslist, itemclick, onnewsclick, cardslist, backclick, isAndroid } = this.props;
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#f8f8f8',
                    height: 1,
                    borderTop: '1px solid #f8f8f8',
                    borderBottom: '1px solid #f8f8f8',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                <div style={{ backgroundColor: '#fff', height: '90px' }} >
                    <div onClick={itemclick.bind(this, rowData)}>
                        <img style={{ margin: '15px', height: '60px', width: '80px', float: 'left' }} src={rowData.banner} />
                        <div style={{ fontSize: '16px', position: 'relative', width: '50%', top: '24px', overflow: 'hidden', textOverflow: 'ellipsis', WhiteSpace: 'nowap', lineHeight: '15px', height: '15px' }}>{rowData.name}</div>
                        <div style={{ position: 'relative', width: '70%', top: '39px', color: '#999', overFlow: 'hidden', WhiteSpace: 'nowap', textOverflow: 'ellipsis' }}>{rowData.follows + "关注"}</div>
                    </div>
                    {isAndroid != true ? <img style={{ marginTop: '-15px', marginRight: '15px', height: '20px', width: '20px', float: 'right' }} src='http://cms.sdwhcn.com/web/libs/img/picto_dele.png' onClick={() => alert('取消关注', '确定取消关注么?', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        {
                            text: '确定', onPress: () => {
                                this.cancelfocus(rowData)
                                console.log('确定')
                            }, style: { fontWeight: 'bold' }
                        },
                    ])}
                    ></img> : <img style={{ marginTop: '-15px', marginRight: '15px', height: '20px', width: '20px', float: 'right' }}
                        src='http://cms.sdwhcn.com/web/libs/img/picto_dele.png'
                        onClick={this.androidclick.bind(this, rowData)}></img>
                    }
                </div>
            );
        };
        return (
            <div id='mymessage' ref='mymessage' style={{ position: 'absolute', top: '0px', backgroundColor: '#fff', zIndex: 20, height: '100%', width: '100%' }}>
                <div style={{ width: '100%', lineHeight: '50px', height: '50px', textAlign: 'center' }}>关注寺庙</div>
                <WhiteSpace style={{ backgroundColor: '#f8f8f8', height: '1px' }} />
                {this.state.isshowandroid == true ?
                    <AlertLayout
                        title={'取消关注'}
                        content={'确定取消吗？'}
                        okaction={this.cancelfocus.bind(this, this.state.currentdata)}
                        cancleaction={this.cancleclick} />
                    : null}
                <ListView style={{ width: '100%', height: '100%' }}
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
                    renderFooter={() => <div style={{ marginBottom: '75px', marginTop: '20px', textAlign: 'center' }}>
                        {this.state.isLoading ? '加载中...' : this.state.hasMore ? '加载完毕' : '没有数据了'}
                    </div>}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                >
                </ListView>
                <img className='backitem' style={{ position: 'absolute' }}
                    src="http://cms.sdwhcn.com/web/libs/img/backitem.png"
                    onClick={backclick.bind(this, false)}
                />
            </div>
        );
    }
}
