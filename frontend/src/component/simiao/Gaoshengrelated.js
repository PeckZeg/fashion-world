
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import React, { Component, PropTypes } from 'react';
import { WhiteSpace,Toast } from 'antd-mobile';
// import '../css/App.css';
import Proxy from '../../tools/proxy.js';
class Gaoshengrelated extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            maxwidth: '100%',
            height: "auto",
            related: []
        };
        console.log(props)
    }
    componentDidMount() {
        var wlength = this.props.related.length * 145 + 15;

        this.setState({ maxwidth: `${wlength}px`, related: this.props.related });
    }

    gogaoshengdetail = data => {
        console.log(data);
        this.context.router.push({ pathname: '/gaoshengdetail', query: { id: data.id, tag: 'monk' } });
        window.location.reload();
    }
    gaoshengguanzhu = data => {
        var token = localStorage.getItem("usertoken")
        var _this = this;
        var mydata=data;
        Proxy.post("http://cms.sdwhcn.com/api/monk/follow?monk_id=" + data.id, function (data) {
            var carddata = JSON.parse(data).message
            // console.log(carddata);
            // var cur = _this.state.count + 1;
            _this.setState({ isfollow: 1, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_pressed.png" })
            Toast.info(carddata, 2);
            Proxy.get("http://cms.sdwhcn.com/api/monk/related?monk_id=" + mydata.id, function (data) {
                var carddata = JSON.parse(data).data
                // console.log(carddata);
                // var cur = _this.state.count + 1;
                _this.setState({ related: carddata })
                // Toast.info(carddata, 2);
            }, token)
        }, token)
        console.log(data);
    }
    render() {
        const { oncardclick, related } = this.props
        return (
            <div>
                <div className="yx-news-topic-sm" style={{ backgroundColor: '#f8f8f8' }}>{"相关高僧"}</div>
                <WhiteSpace size="sm" style={{ backgroundColor: '#f8f8f8' }} />
                <div style={{ width: '100%', marginBottom: '0px', backgroundColor: '#f8f8f8' }}>
                    <ReactIScroll iScroll={iScroll}
                        options={{ mouseWheel: true, scrollbars: false, scrollX: true }}>
                        <div style={{ width: this.state.maxwidth }}>
                            <ul style={{ padding: '5px', listStyleType: "none", clear: 'both', height: "183px" }}>
                                {
                                    this.state.related.map((redata, i) => {
                                        return <li style={{ float: 'left', textAlign: 'center', width: '135px', height: '183px', backgroundColor: '#fff', marginLeft: '10px' }} key={i}>
                                            <img style={{ position: 'relative', top: '15px', width: '55px', height: '55px', borderRadius: '50%' }} src={redata.avatar} onClick={oncardclick.bind(this, redata)} />
                                            <WhiteSpace size="sm" />
                                            <div style={{ color: '#333', position: 'relative', top: '15px' }}>{redata.name}</div>
                                            <WhiteSpace size="sm" />
                                            <div style={{ color: '#999', position: 'relative', top: '15px' }}>{redata.summary}</div>
                                            <WhiteSpace size="sm" />
                                            <div style={{ backgroundColor: '#ccc', height: '1px', width: '105px', left: '15px', position: 'relative', top: '15px' }} />
                                            <WhiteSpace size="sm" />{
                                                redata.is_follow == 0 ? <img ref='guanzhu' onClick={this.gaoshengguanzhu.bind(this, redata)} style={{ height: '25px', position: 'relative', top: '10px' }} src='http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_normal.png' /> : <img onClick={this.gogaoshengdetail.bind(this, redata)} style={{ height: '25px', position: 'relative', top: '10px' }} src='http://cms.sdwhcn.com/web/libs/img/btn_yiguanzhu_hover.png' />
                                            }
                                        </li>
                                    })}
                            </ul>
                        </div>
                    </ReactIScroll>
                </div>
            </div>
        )
    }
}

export default Gaoshengrelated;
