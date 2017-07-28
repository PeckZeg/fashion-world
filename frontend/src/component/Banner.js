import React, { Component } from 'react';
import { WhiteSpace, Toast } from 'antd-mobile';
import Proxy from '../tools/proxy.js';
// import '../css/App.css';
class SimiaoBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '32%',
            // isfollow: 0,
            viewimage:"http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_default.png"
        };
        console.log(props)
    }
    componentDidMount() {
        this.setState({isfollow: this.props.isfollow})
        if (this.props.isfollow == 1) {
            this.setState({ viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_pressed.png" })
        } else {
            this.setState({ viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_default.png" })
        }
        // this.setState({ newsdata: this.props.newslist, next_page_url: this.props.nextpageurl })
    }
    handviewClick = card => {
        var _this = this;
        var token = localStorage.getItem("usertoken")
        if (this.state.isfollow != 1) {
            Proxy.post("http://cms.sdwhcn.com/api/temple/follow?temple_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                // var cur = _this.state.count + 1;

                _this.setState({ isfollow: 1, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_pressed.png" })
                Toast.info(carddata, 2);

                // _this.setState({ categorylist: carddata });
            }, token)
        }
        else {
            Proxy.delete("http://cms.sdwhcn.com/api/temple/follow?temple_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                // var cur = _this.state.count - 1;
                Toast.info(carddata, 2);
                _this.setState({ isfollow: 0, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_guanzhu_default.png" })
            }, token)
        }

        // if (!this.state.isview) {
        //     this.setState({ isview: true, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_selected.png" })
        // }
        // console.log(card);
    }
    render() {
        const { bdata ,isfollow} = this.props;
        // console.log(name, tag, banner, follow, views, this.props)
        return (
            <div className="Banner" style={{ width: this.state.width, height: this.state.height, maxHeight: '211px' }}>
                <img className='Banner-img' style={{ maxHeight: '211px' }} src={bdata.banner} />
                <div className="Banner-plane">
                    <div className="Banner-title">{bdata.name}</div>
                    {
                        bdata.tag.length >= 1 ? <div style={{ position: 'absolute', top: '95px', left: '30px', display: 'inline-block', clear: 'both' }}>
                            <div>
                                {
                                    bdata.tag.map((data, idx) => (
                                        <span key={idx} className="yx-simiao-tag" >{data.name}</span>
                                    ))
                                }
                            </div>
                        </div> : null
                    }
                    <div className="Banner-like">{bdata.views + '次浏览' + bdata.follows + '人关注'}</div>
                    <img className='Banner-guanzhu'
                        src={this.state.viewimage}
                        onClick={this.handviewClick.bind(this,bdata)} />
                </div>
            </div>
        );
    }
}

export default SimiaoBanner;
