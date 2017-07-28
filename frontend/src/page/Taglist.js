import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import LoadingLayout from '../component/LoadingLayout';
import NewsList from '../component/zixun/NewsList';
import CaaCarousel from '../component/XYCarousel';
import Proxy from '../tools/proxy.js'

export default class Taglist extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            loadingVisible: true,
            newsdata: [],
            nextpageurl: null,
            title: '推荐',
        };
    }
    componentDidMount() {
        var _this = this;
        Proxy.get(`http://cms.sdwhcn.com/api/article/list/tag?tag_id=${this.props.location.query.tag_id}`, function (data) {
            var listh = [{}];
            var listdata = JSON.parse(data).data.data;
            setTimeout(function () {
                _this.setState({ loadingVisible: false });
            }, 1000);
            var newlist = listh.concat(listdata);
            _this.setState({ title: _this.props.location.query.name, newsdata: newlist, nextpageurl: JSON.parse(data).data.next_page_url });
        })
    }
    handleNewsClick = data => {
        this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
    }

    handleCardClick = data => {
        this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
    }
    
    gotoback = () => {
        this.context.router.goBack();
    }

    render() {
        return (
            <LoadingLayout visible={this.state.loadingVisible}>
                <div style={{ display: 'flex', position: 'fixed', zIndex: '99' }}>
                    <img style={{ width: '100%', height: 'auto', maxHeight: '100px', clear: 'both' }} src='http://cms.sdwhcn.com/web/libs/img/gaosheng1.png' />
                    <div style={{ position: 'absolute', color: '#fff', top: '35px', left: '20px', fontSize: ' 22px' }}>{this.state.title}</div>
                    <div style={{ position: 'absolute', color: '#ccc', top: '70px', left: '20px', fontSize: ' 14px' }}>{this.state.title}</div>
                </div>
                <div style={{ height: '80px' }}></div>
                <NewsList tag='taglist' title={this.state.title} newslist={this.state.newsdata} onnewsclick={this.handleNewsClick} />
                <img className='backitem'
                    src="http://cms.sdwhcn.com/web/libs/img/backitem.png"
                    onClick={this.gotoback.bind(this)}
                />
            </LoadingLayout>
        );
    }
}
