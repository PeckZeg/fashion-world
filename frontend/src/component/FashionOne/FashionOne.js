import React, { Component } from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import jQ from 'jquery';
import CaaCarousel from '../XYCarousel';
import Proxy from '../../tools/proxy.js';
import ListView from './listview/listview'
// const playIcon = icons.play({ size: 'xxs' });
export default class FashionOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardslist: [],
            newsdata: [],
            nextpageurl: null
        };
    };
    componentDidMount() {
        var _this = this;
        Proxy.get("http://cms.sdwhcn.com/api/article/banner", function (data) {
            var carddata = JSON.parse(data).data;
            console.log(carddata);
            setTimeout(function () {
                _this.setState({ cardslist: carddata });
            }, 500);
        })
        var token = localStorage.getItem("usertoken");
        Proxy.get("http://cms.sdwhcn.com/api/article/list", function (data) {
            var listh = [{}];
            var listdata = JSON.parse(data).data.data;
            var newlist = listh.concat(listdata);
             console.log(newlist);
            //  setTimeout(function() {
                  _this.setState({ newsdata: newlist, nextpageurl: JSON.parse(data).data.next_page_url });
            //  }, 1000);
                // _this.setState({ loadingVisible: false });
        }, token)
    }
    handleNewsClick = data => {
        // window.open(`http://cms.sdwhcn.com/web/shandeng/#/zixundetail?id=${data.id}`);
        // this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
        console.log(data);
    }
    onCardClick = data => {
        console.log(data);
        // this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
    }
    gotoCategory = () => {
        this.context.router.push({ pathname: 'category' });
    }
    render() {
        return (
            <div className='homebody'>
                <ListView title='热门视频' newslist={this.state.newsdata} onnewsclick={this.handleNewsClick} nextpageurl={this.state.nextpageurl} cardslist={this.state.cardslist} onCardClick={this.onCardClick} />
            </div>
        );
    }
}
