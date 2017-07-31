import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import { Toast, WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile';
import Proxy from '../tools/proxy.js';
import LoadingLayout from '../component/LoadingLayout';
import jQ from 'jquery';
import Home from '../component/Login/Home';
import Redwine from '../component/Redwine/Redwine';
import FashionOne from '../component/FashionOne/FashionOne';
import LiveScroll from '../component/Live/livelist';
const cards = [
    { id: 1, title: 'live', image: 'http://cms.sdwhcn.com/web/libs/img/live.png' },
    { id: 2, title: 'wine', image: 'http://cms.sdwhcn.com/web/libs/img/redwine.png' },
    // { id: 3, title: 'tv', image: 'http://cms.sdwhcn.com/web/libs/img/fashiontv.png' },
    { id: 3, title: 'one', image: 'http://cms.sdwhcn.com/web/libs/img/fashionone.png' },
    { id: 4, title: 'deep', image: 'http://cms.sdwhcn.com/web/libs/img/deep.png' },
    // { id: 6, title: 'music', image: 'http://cms.sdwhcn.com/web/libs/img/fashionmusic.png' },
    { id: 5, title: 'tv', image: 'http://cms.sdwhcn.com/web/libs/img/fashionlive.png' }
];
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            related: [{ thumb: 'http://cms.sdwhcn.com/web/libs/img/live.png' }, { thumb: 'http://cms.sdwhcn.com/web/libs/img/live.png' }],
            transx: screen.width / 3,
            tabwidth: ['4', '10', '10', '6', '8', '8'],
            loadingVisible: true,
            cards: [],
            newsdata: [],
            currentpage: 'home',
            nextpageurl: null
        };
    }

    componentDidMount() {
        if (this.state.currentpage == 'home') {
            jQ('#fsnav').hide();
        }
        // if (this.state.transx == 480) {
        //     this.refs.scrolltable.style.transform = 'translate(' + this.state.transx / 2 + 'px, 0px) translateZ(0px)';
        // }
        // else {
        this.refs.scrolltable.style.transform = 'translate(' + this.state.transx + 'px, 0px) translateZ(0px)';
        // }
        jQ('#sideline').width(this.state.tabwidth[0] + '%');

        jQ('#sideline').css({ left: '6%' });

        var _this = this;
        // var token = localStorage.getItem("usertoken");
        Proxy.get("http://cms.sdwhcn.com/api/article/list", function (data) {
            // var listh = [{}];
            var listdata = JSON.parse(data).data.data;
            setTimeout(function () {
                _this.setState({ loadingVisible: false });
            }, 1000);
            // var newlist = listh.concat(listdata);
            _this.setState({ newsdata: listdata, nextpageurl: JSON.parse(data).data.next_page_url });
        })

    }
    goHome = () => {
        jQ('#fsnav').hide();
        this.setState({ currentpage: 'home' });
    }
    EnterList = (data) => {
        jQ('#fsnav').show();
        // console.log(data)
        this.onClickTable(data.id);
        this.setState({ currentpage: data.title });

    }
    onClickTable = (data) => {
        if (data == 0) {
            jQ('#navlogo').animate({ opacity: 1 }, 300);
        }
        else {
            jQ('#navlogo').animate({ opacity: 0 }, 300);
        }
        var transx = screen.width / 3;
        // console.log(jQ('#scrolltable').width());
        jQ('#scrolltable').animate({ left: transx * (-data) + 'px' });

        jQ('#sideline').stop(true);
        var offsetx = (16.6 - this.state.tabwidth[data]) / 2;
        jQ('#sideline').animate({ left: data * 16.6 + offsetx + '%', width: this.state.tabwidth[data] + '%' }, 300);
        this.setState({ currentpage: cards[data].title });
        // jQ('#sideline').animate({width:this.state.tabwidth[data]})
        console.log(data);
    }
    handleCardClick = data => {
        // this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
        // window.location.reload();
        // Toast.info(JSON.stringify(data), 2);
        console.log(data);
    }
    handleNewsClick = data => {
        // window.open(`http://cms.sdwhcn.com/web/shandeng/#/zixundetail?id=${data.id}`);
        // this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
        console.log(jQ('.am-list-view-scrollview-content'));
        // jQ('.am-list-view-scrollview-content').css({ transform: 'translate3d(0px, -617px, 0px) scale(1)' },300);
    }

    gotoCategory = () => {
        // this.context.router.push({ pathname: 'category' });
    }
    render() {
        const tabname = ['LIVE', 'WINELIFE', 'Fashion One', 'Deep', 'FASHIONTV', 'Personal']
        var i = 0, len = 7, listOfLi = [];
        for (i; i < len; i++) {
            if (i == 6) {
                listOfLi.push(<li key={i} id='sideline' className='sideline'></li>)
            }
            else {
                listOfLi.push(<li style={{ textAlign: 'center', color: '#fff', lineHeight: '50px', float: 'left', width: '16.6%', height: '50px' }} key={i}
                    onClick={this.onClickTable.bind(this, i)}>{tabname[i]}</li>)
            }
        }
        // const {getFieldProps}=this.props.from;
        return (
            <div>

                <div id='fsnav'>
                    <div style={{ position: 'fixed', top: '0px', height: '50px', width: '100%', backgroundColor: '#000', zIndex: 998 }} />
                    <img id='navlogo' style={{ position: 'fixed', top: '10px', left: '20px', height: '30px', zIndex: 1000 }} src="http://cms.sdwhcn.com/web/libs/img/nav-bar_logo.png" />
                    <ul id='scrolltable' ref='scrolltable' style={{ margin: 'auto', padding: '0px', listStyle: 'none', position: 'fixed', top: '0px', width: '200%', maxWidth: '1500px', zIndex: 999 }}>
                        {listOfLi}
                    </ul>
                    <div style={{ height: '50px', position: 'relative', width: '100%', backgroundColor: '#000', zIndex: 998 }} />
                    <img style={{ position: 'fixed', bottom: '50px', right: '20px', height: '50px', zIndex: 998 }} src="http://cms.sdwhcn.com/web/libs/img/fwmenu.png" />
                    <img style={{ position: 'fixed', bottom: '50px', left: '20px', height: '50px', zIndex: 998 }}
                        onClick={this.goHome}
                        src="http://cms.sdwhcn.com/web/libs/img/fwback.png" />
                </div>
                {this.state.currentpage == 'home' ?
                    <Home EnterList={this.EnterList} /> : this.state.currentpage == 'wine' ?
                        <Redwine /> : this.state.currentpage == 'one' ?
                            <FashionOne /> :
                            <div>
                                <LoadingLayout visible={this.state.loadingVisible}>
                                    <LiveScroll newslist={this.state.newsdata} nextpageurl={this.state.nextpageurl} onnewsclick={this.handleNewsClick} />
                                    <img style={{ position: 'fixed', bottom: '30px', left: (screen.width - 40) / 2 + 'px', width: '40px' }} src="http://cms.sdwhcn.com/web/libs/img/fwup.png" />
                                </LoadingLayout>
                            </div>
                }
            </div>
        );
    }
}
