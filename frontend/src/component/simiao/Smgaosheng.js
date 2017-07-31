import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import Proxy from '../../tools/proxy.js';
import LoadingLayout from '../LoadingLayout';
import Gongfolist from './Gongfolist.js';
export default class Simiaogaosheng extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            newsdata: [],
            nextpageurl: null,
            loadingVisible: true,
        };
        // console.log(props)
    }
    componentDidMount() {
        console.log(this.props);
        var _this = this;
        Proxy.get(`http://cms.sdwhcn.com/api/temple/monk${this.props.location.search}`, function (data) {
            // var listh = [{}];
            var listdata = JSON.parse(data).data.data;
            setTimeout(function () {
                _this.setState({ loadingVisible: false });
            }, 500);
            // var newlist = listdata);
            _this.setState({ newsdata: listdata, nextpageurl: JSON.parse(data).data.next_page_url });
        })
    }
    onClickcell = data => {
        console.log(data);
        this.context.router.push({ pathname: 'gaoshengdetail', query: { id: data.id,tag:'monk' } });
    }
   
    render() {
        return (
            <LoadingLayout visible={this.state.loadingVisible}>
                <WhiteSpace size="sm" style={{ backgroundColor: '#f8f8f8' }} />
                <Gongfolist tag='gaosheng' newslist={this.state.newsdata} nextpageurl={this.state.nextpageurl} oncardclick={this.onClickcell} />
            </LoadingLayout>
        );
    }
}
