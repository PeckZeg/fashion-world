import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { WhiteSpace, Toast } from 'antd-mobile';
import Proxy from '../../tools/proxy.js';
export default class NewsCell extends Component {
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
        const { tag, rowData, rowID, sectionID, onClick } = this.props;
        return (
            <div>
                {tag == 'detail' ? <div key={rowData.id}
                    style={{
                        paddingTop: '15px',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        backgroundColor: '#fff',
                    }}>
                    {
                        rowData.thumb != null ?
                            <div style={{ backgroundColor: '#fff' }}>
                                <img onClick={onClick.bind(this, rowData)} style={{ width: '100%', height: screen.width * 0.55 }} src={rowData.thumb} />
                                <div style={{ padding: '15px' }}>
                                    <div style={{ display: 'inline-block', width: '100%' }}>
                                        <div>
                                            <span className="yx-news-category">{rowData.category.name}</span>
                                            <span className="yx-news-createAt">{rowData.updated_at}</span>
                                            {
                                                tag && tag == 'news' ?
                                                    <div onClick={this.handviewClick.bind(this, rowData)} style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
                                                        <img style={{ height: "20px" }} src={this.state.viewimage} />
                                                        <span className="yx-news-col">{this.state.count}</span>
                                                    </div> : null
                                            }
                                        </div>
                                    </div>
                                    <WhiteSpace size="sm" />
                                    <div style={{ fontSize: '18px', color: "#333" }}>{rowData.title}</div>
                                </div>
                            </div> :
                            <div style={{ backgroundColor: '#fff' }}>
                                <div style={{ padding: '15px' }}>
                                    <div onClick={onClick.bind(this, rowData)} style={{ fontSize: '18px', color: "#333" }}>{rowData.title}</div>
                                    <WhiteSpace size="sm" />
                                    <div style={{ display: 'inline-block', width: '100%' }}>
                                        <div>
                                            <span className="yx-news-category">{rowData.category.name}</span>
                                            <span className="yx-news-createAt">{rowData.updated_at}</span>
                                            {
                                                tag && tag == 'news' ?
                                                    <div onClick={this.handviewClick} style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
                                                        <img style={{ height: "20px" }} src={this.state.viewimage} />
                                                        <span className="yx-news-col">{this.state.count}</span>
                                                    </div> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div> :
                    <div key={rowData.id}
                        style={{
                            paddingTop: '15px',
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            backgroundColor: '#f8f8f8',
                        }}>
                        {
                            rowData.thumb != null ?
                                <div style={{ backgroundColor: '#fff' }}>
                                    <img onClick={onClick.bind(this, rowData)} style={{ width: '100%', height: screen.width * 0.55 }} src={rowData.thumb} />
                                    <div style={{ padding: '15px' }}>
                                        <div style={{ display: 'inline-block', width: '100%' }}>
                                            <div>
                                                <span className="yx-news-category">{rowData.category.name}</span>
                                                <span className="yx-news-createAt">{rowData.updated_at}</span>
                                                {
                                                    tag && tag == 'news' ?
                                                        <div onClick={this.handviewClick.bind(this, rowData)} style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
                                                            <img style={{ height: "20px" }} src={this.state.viewimage} />
                                                            <span className="yx-news-col">{this.state.count}</span>
                                                        </div> : null
                                                }
                                            </div>
                                        </div>
                                        <WhiteSpace size="sm" />
                                        <div style={{ fontSize: '18px', color: "#333" }}>{rowData.title}</div>
                                    </div>
                                </div> :
                                <div style={{ backgroundColor: '#fff' }}>
                                    <div style={{ padding: '15px' }}>
                                        <div onClick={onClick.bind(this, rowData)} style={{ fontSize: '18px', color: "#333" }}>{rowData.title}</div>
                                        <WhiteSpace size="sm" />
                                        <div onClick={onClick.bind(this, rowData)} style={{ fontSize: '14px', color: "#999" }}>{rowData.description}</div>
                                        <WhiteSpace size="sm" />
                                        <div style={{ display: 'inline-block', width: '100%' }}>
                                            <div>
                                                <span className="yx-news-category">{rowData.category.name}</span>
                                                <span className="yx-news-createAt">{rowData.updated_at}</span>
                                                {
                                                    tag && tag == 'news' ?
                                                        <div onClick={this.handviewClick} style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
                                                            <img style={{ height: "20px" }} src={this.state.viewimage} />
                                                            <span className="yx-news-col">{this.state.count}</span>
                                                        </div> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                }
                <WhiteSpace size="md" />
                <div style={{ textAlign: "center" }}>
                    <img className="yx-news-hua" src="http://cms.sdwhcn.com/web/libs/img/icon_hua.png" />
                </div>
            </div>
        );
    }
}
