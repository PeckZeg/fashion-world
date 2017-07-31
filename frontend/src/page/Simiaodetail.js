import React, { Component, PropTypes } from 'react';
import { WingBlank } from 'antd-mobile';
import Banner from '../component/Banner.js';
import DetailNav from '../component/Detailnav.js';
import Proxy from '../tools/proxy.js';
import tabs, { defaultActiveKey } from '../const/simiaodetailtap.js';
import * as _ from 'lodash';
export default class Simiaodetail extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            bannerdata: {
                id: '',
                name: '',
                banner: '',
                views: '',
                follows: '',
                // is_follow: 0,
                tag: []
            },
            is_follow: 0,
            items: ['one', 'two', 'three'],
            visible: false,
        };
    }
    componentDidMount() {
        var _this = this;
        var token = localStorage.getItem("usertoken");
        Proxy.get(`http://cms.sdwhcn.com/api/temple/detail${this.props.location.search}`, function (data) {
            var introdata = JSON.parse(data).data;
            console.log(introdata);
            _this.setState({ bannerdata: introdata, is_follow: introdata.is_follow });
            setTimeout(function () {
                _this.setState({ loadingVisible: false });
            }, 1000);
        }, token)
    }
    backlastpage = () => {
        console.log('fanhui')
        localStorage.getItem("mycurrent") == 0 ? this.context.router.push({ pathname: '/simiao' }):this.props.router.goBack()
    }
    handleTabChange = key => {
        let link = _.chain(tabs).filter(tab => tab.key == key).first().get('route').value();
        if (link) {
            this.context.router.push(link);
        }
    }
    render() {   
        let active_Key = this.props.location.pathname == 'simiaodetail' ? defaultActiveKey : this.props.location.pathname.split('/')[1]
        return (
            <div style={{
                height: '100%',
                fontSize: '18px',
                color: '#808080'
            }}>
                <Banner bdata={this.state.bannerdata} isfollow={this.state.is_follow} />
                <DetailNav
                    simiaoid={this.props.location.search}
                    tabs={tabs}
                    default_ActiveKey={active_Key}
                    onChange={this.handleTabChange}>
                    {this.props.children}
                </DetailNav>
                <img className='backitem'
                    src="http://cms.sdwhcn.com/web/libs/img/backitem.png"
                    onClick={this.backlastpage}
                />
            </div>
        );
    }
}
