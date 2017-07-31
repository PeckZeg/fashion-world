import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import Proxy from '../../tools/proxy.js';
import LoadingLayout from '../LoadingLayout';
import Horizonscroll from './smhorizonscroll.js';
import Zuixinlist from '../zixundetail/zuixin.js';
export default class Simiaojianjie extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            intro: {
                name: '',
                introduction: ''
            },
            related: [],
            recommend: [],
            loadingVisible: true
        };
        console.log(props)
    }
    componentDidMount() {
        // console.log(this.props);
        var _this = this;
        Proxy.get(`http://cms.sdwhcn.com/api/temple/intro${this.props.location.search}`, function (data) {
            var introdata = JSON.parse(data).data;
            console.log(introdata);
            _this.setState({ intro: introdata });
        })
        Proxy.get(`http://cms.sdwhcn.com/api/temple/related?temple_id=${this.props.location.query.id}`, function (data) {
            var introdata = JSON.parse(data).data.data;
            _this.setState({ related: introdata });
        })
        Proxy.get(`http://cms.sdwhcn.com/api/temple/recommendations?temple_id=${this.props.location.query.id}`, function (data) {
            var introdata = JSON.parse(data).data;
            _this.setState({ recommend: introdata });
        })
        setTimeout(function () {
            _this.setState({ loadingVisible: false });
        }, 500);
    }
    handleNewsClick = data => {
        this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
        window.location.reload();
        // this.context.router.push(data.route);
        console.log(data);
    }
    handleCardClick = data => {
        this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
        window.location.reload();
        console.log(data);
    }
    likeClick = data => {
        // this.context.router.push(data.route);
        console.log(data);
    }
    viewsClick = data => {
        // this.context.router.push(data.route);
        console.log(data);
    }
    render() {
        return (
            <LoadingLayout visible={this.state.loadingVisible}>
                <div style={{
                    height: '100%',
                    backgroundColor: '#fff'
                }}>
                    <WhiteSpace size="sm" style={{ backgroundColor: '#f8f8f8' }} />
                    <div style={{ margin: '15px' }}>
                        <div className='yx-detail-title'>{this.state.intro.name}</div>
                        <div className="yx-detail-summary" dangerouslySetInnerHTML={{ __html: this.state.intro.introduction }}></div>
                    </div>
                    {
                        this.state.related && this.state.related.length >= 1 ? <div>
                            <WhiteSpace style={{ backgroundColor: '#f0f0f0' }} size="sm" />
                            <WhiteSpace size="lg" />
                            <Horizonscroll related={this.state.related} oncardclick={this.handleCardClick} />
                        </div> : null
                    }
                    <WhiteSpace style={{ backgroundColor: '#f0f0f0' }} size="sm" />

                </div>
            </LoadingLayout>
        );
    }
}
