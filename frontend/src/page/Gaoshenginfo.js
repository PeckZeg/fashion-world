import React, { Component } from 'react';
import LoadingLayout from '../component/LoadingLayout';
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import GaoshengIntro from '../component/simiao/Gaoshengintro.js';
import Horizonscroll from '../component/simiao/Gaoshengrelated.js';
import Proxy from '../tools/proxy.js';
class Gaoshenginfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['one', 'two', 'three'],
            visible: false,
            // tag: 'monk',
            intro: { banner: '' },
            loadingVisible: true,
            sumheight: 210,
            related: [],
            isfollow:0,
            viewimage: 'http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_default.png'
        };
    }
    componentDidMount() {

        var _this = this;
        var token = localStorage.getItem("usertoken");
        var url = `http://cms.sdwhcn.com/api/monk/detail${this.props.location.search}`;
        if (this.props.location.query.tag != 'monk') {
            url = `http://cms.sdwhcn.com/api/buddha${this.props.location.search}`;
        }
        Proxy.get(url, function (data) {
            var introdata = JSON.parse(data).data;
            if (introdata.is_follow == 1) {
                _this.setState({ intro: introdata,isfollow:introdata.is_follow, viewimage: 'http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_pressed.png' });
            }
            else {
                _this.setState({ intro: introdata,isfollow:introdata.is_follow, viewimage: 'http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_default.png' });
            }
            setTimeout(function () {
                _this.setState({ loadingVisible: false });
            }, 1000);
        }, token)
        if (this.props.location.query.tag == 'monk') {
            Proxy.get(`http://cms.sdwhcn.com/api/monk/related?monk_id=${this.props.location.query.id}`, function (data) {
                // console.log(JSON.parse(data));
                var array = JSON.parse(data).data;
                _this.setState({ related: array })
                // this.state.related=
            }, token)
        }

    }
    handleCardClick = data => {
        // this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
        // window.location.reload();
        console.log(data);
    }
    backlastpage = () => {
        console.log('fanhui')
        this.props.router.goBack();
    }
    handviewClick = card => {
        var _this = this;
        var token = localStorage.getItem("usertoken")
        if (this.state.isfollow != 1) {
            Proxy.post("http://cms.sdwhcn.com/api/monk/follow?monk_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                // var cur = _this.state.count + 1;

                _this.setState({ isfollow: 1, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_pressed.png" })
                Toast.info(carddata, 2);

                // _this.setState({ categorylist: carddata });
            }, token)
        }
        else {
            Proxy.delete("http://cms.sdwhcn.com/api/monk/follow?monk_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                // var cur = _this.state.count - 1;
                Toast.info(carddata, 2);
                _this.setState({ isfollow: 0, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_default.png" })
            }, token)
        }
    }

    render() {

        return (
            <LoadingLayout visible={this.state.loadingVisible}>
                <div style={{
                    backgroundColor: "#f8f8f8", height: '100%', width: '100%'
                }} >
                    {
                        this.props.location.query.tag == 'monk' ? <div style={{ backgroundImage: `url(${this.state.intro.avatar})`, backgroundSize: '100%', height: '30%', width: '100%' }} >
                            <div style={{ height: '100%', position: 'relative', width: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
                            <img style={{ zIndex: '99', height: '40px', position: 'relative', top: '30%', left: '70%', marginTop: '-20px' }} src={this.state.viewimage} onClick={this.handviewClick.bind(this, this.state.intro)} />
                        </div> : <div style={{ backgroundImage: `url(http://cms.sdwhcn.com${this.state.intro.avatar})`, backgroundSize: '100%', height: '30%', width: '100%' }} >
                                <div style={{ height: '100%', position: 'relative', width: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
                            </div>
                    }

                    <div style={{ position: 'relative', backgroundColor: "#fff", width: '100%', height: '15%' }}>
                        <div style={{ position: 'absolute', left: '15px', top: '15%', fontSize: '18px', color: '#333' }}>{this.state.intro.name}</div>
                        <div style={{ position: 'absolute', left: '15px', top: '43%', fontSize: '16px', color: '#999' }}>{this.state.intro.summary}</div>
                        <div style={{ position: 'absolute', left: '15px', top: '70%', fontSize: '16px', color: '#999' }}>{this.state.intro.views + '次浏览·' + this.state.intro.follows + '次关注'}</div>
                    </div>
                    <WhiteSpace size='sm' />
                    <div style={{ backgroundColor: '#fff', width: '100%', height: 'auto', padding: '15px' }}>
                        <div style={{ position: 'relative', fontSize: '16px', height: '20px', lineHeight: '20px', color: '#333' }}>简介</div>
                        <WhiteSpace size='sm' />
                        <div style={{ position: 'relative', fontSize: '16px', width: '93%', lineHeight: '20px', color: '#999' }}>{this.state.intro.description}</div>
                        <WhiteSpace size='sm' />
                        <GaoshengIntro datainfo={this.state.intro.introduction} />
                    </div>
                    <WhiteSpace size='lg' style={{ backgroundColor: '#f8f8f8' }} />
                    {
                        this.props.location.query.tag == 'monk' ? <Horizonscroll related={this.state.related} oncardclick={this.handleCardClick} /> : null
                    }
                </div>
                <img className='backitem'
                    src="http://cms.sdwhcn.com/web/libs/img/backitem.png"
                    onClick={this.backlastpage.bind(this)}
                />
            </LoadingLayout>
        );
    }
}

export default Gaoshenginfo;