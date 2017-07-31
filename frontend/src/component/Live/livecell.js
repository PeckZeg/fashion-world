import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { WhiteSpace, Toast } from 'antd-mobile';
import Proxy from '../../tools/proxy.js';
export default class LiveCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_normal.png",
            count: 0,
            is_collection: false,
        };
    }
    componentDidMount() {
        this.setState({ is_collection: this.props.rowData.is_collection, count: this.props.rowData.collection })
        if (this.props.rowData.is_collection == 1) {
            this.setState({ viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_selected.png" })
        } else {
            this.setState({ viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_normal.png" })
        }
        // this.setState({ newsdata: this.props.newslist, next_page_url: this.props.nextpageurl })
    }
    handviewClick = card => {
        var _this = this;
        var token = localStorage.getItem("usertoken")
        if (this.state.is_collection != 1) {
            Proxy.post("http://cms.sdwhcn.com/api/article/collection?article_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                var cur = _this.state.count + 1;

                _this.setState({ is_collection: 1, count: cur, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_selected.png" })
                Toast.info(carddata, 2);

                // _this.setState({ categorylist: carddata });
            }, token)
        }
        else {
            Proxy.delete("http://cms.sdwhcn.com/api/article/collection?article_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                var cur = _this.state.count - 1;
                Toast.info(carddata, 2);
                _this.setState({ is_collection: 0, count: cur, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_normal.png" })
            }, token)
        }

        // if (!this.state.isview) {
        //     this.setState({ isview: true, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_selected.png" })
        // }
        // console.log(card);
    }
    render() {
        const { rowData, rowID, sectionID, onClick } = this.props;
        return (
            <div style={{position:'relative'}} >
                <div onClick={onClick} style={{ textAlign: "center" }}>
                    <img src="http://cms.sdwhcn.com/web/libs/img/liveimg.png" />
                </div>
                <div style={{
                    position: 'absolute', bottom: '20px', height: '30px',
                    bottom: '120px',
                    lineHeight: '30px',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '30px',
                    color: 'white'
                }}>巴黎时装秀</div>
                <div style={{
                    position: 'absolute', bottom: '20px', height: '14px',
                    bottom: '90px',
                    lineHeight: '14px',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: 'white'
                }}>i feel fabulous and i just love it!</div>
            </div>
        );
    }
}
