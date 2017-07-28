import React, { Component, PropTypes } from 'react';
import { WhiteSpace, Toast } from 'antd-mobile';
import Proxy from '../../tools/proxy.js';
// import '../css/App.css';
class Intro extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: "auto",
            likeimage: "http://cms.sdwhcn.com/web/libs/img/icon_likes_normal.png",
            viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_normal.png",
            count: 0,
            islike: 0,
            isview: 0,
            thumb_count:0,
            sumheight:210,
            showmore:'block'
        };
        console.log(props)
    }
    componentDidMount() {
        if(this.refs.summary.getElementsByTagName('img').length>0){
        this.refs.summary.getElementsByTagName('img')[0].style.marginLeft='0px';
        }
        this.setState({ thumb_count:this.props.datainfo.thumbs_up,count: parseInt(this.props.datainfo.views), isview: this.props.datainfo.is_collection,islike:this.props.datainfo.is_thumb_up });
        if (this.props.datainfo.is_collection == 1) {
            this.setState({ viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_selected.png" })
        } else {
            this.setState({ viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_normal.png" })
        }
    }
    handlikeClick = card => {
        // if (!this.state.islike) {
        //     this.state.count++;
        //     this.setState({ islike: true, likeimage: "http://cms.sdwhcn.com/web/libs/img/icon_likes_selected.png", count: this.state.count++ })
        // }
        var _this = this;
        var token = localStorage.getItem("usertoken")
        if (this.state.islike != 1) {
            Proxy.post("http://cms.sdwhcn.com/api/article/thumbs_up?article_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                var cur=_this.state.thumb_count+1;
                _this.setState({ islike: 1,thumb_count:cur, likeimage: "http://cms.sdwhcn.com/web/libs/img/icon_likes_selected.png" })
                Toast.info(carddata, 2);
                // _this.setState({ categorylist: carddata });
            }, token)
        }
        else {
            Proxy.delete("http://cms.sdwhcn.com/api/article/thumbs_up?article_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                 var cur=_this.state.thumb_count-1;
                Toast.info(carddata, 2);
                _this.setState({ islike: 0,thumb_count:cur, likeimage: "http://cms.sdwhcn.com/web/libs/img/icon_likes_normal.png" })
            }, token)
        }
    }
    showmoreClick=()=>{
             this.setState({sumheight:null,showmore:'none'})
    }
    tagClick = data => {
        this.context.router.push({ pathname: 'taglist', query: { tag_id: data.pivot.tid, name: data.name } });
    }
    handviewClick = card => {
        var token = localStorage.getItem("usertoken")
        var _this = this;
        if (this.state.isview != 1) {
            Proxy.post("http://cms.sdwhcn.com/api/article/collection?article_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                // var cur=_this.state.count+1;

                _this.setState({ isview: 1, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_selected.png" })
                Toast.info(carddata, 2);

                // _this.setState({ categorylist: carddata });
            }, token)
        }
        else {
            Proxy.delete("http://cms.sdwhcn.com/api/article/collection?article_id=" + card.id, function (data) {
                var carddata = JSON.parse(data).message
                // console.log(carddata);
                //  var cur=_this.state.count-1;
                Toast.info(carddata, 2);
                _this.setState({ isview: 0, viewimage: "http://cms.sdwhcn.com/web/libs/img/btn_collect_normal.png" })
            }, token)
        }
    }
    render() {
        const { datainfo, likeaction, viewsaction } = this.props;
        // console.log(name)
        return (
            <div className="Banner" style={{ width: this.state.width, height: this.state.height }}>
                {
                    datainfo.thumb == null ? <div style={{ marginLeft: '15px', marginTop: '30px', marginRight: '15px' }}>
                        <div className='yx-detail-title'>{datainfo.title}</div>
                        <WhiteSpace size="sm" />
                        <div className="yx-news-summary">{datainfo.description}</div>
                    </div> : <img className='Banner-img' src={datainfo.thumb} />
                }
                <div style={{ marginLeft: '15px', marginRight: '15px' }}>
                    <WhiteSpace size="sm" />
                    <div style={{ display: 'inline-block', clear: 'both', width: '100%' }}>
                        <div><span className="yx-news-category">{datainfo.category.name}</span>
                            <span className="yx-news-createAt">{datainfo.created_at}</span>
                            <div style={{ display: 'inline-block', alignItems: 'center', float: 'right' }} onClick={this.handviewClick.bind(this,datainfo)}>
                                <img style={{ height: "20px" }} src={this.state.viewimage} />
                            </div>
                        </div>
                    </div>
                    <span className='yx-detail-author'>{'来源于:' + datainfo.author.realname}</span>
                    <WhiteSpace size="sm" />
                    {
                        datainfo.thumb != null ? <div>
                            <div className='yx-detail-title'>{datainfo.title}</div>
                            <WhiteSpace size="sm" />
                            <div className="yx-news-summary">{datainfo.description}</div>
                        </div> : null
                    }
                    <div ref='summary' className="yx-detail-summary" style={{height:this.state.sumheight,overflow:'hidden'}} dangerouslySetInnerHTML={{ __html: datainfo.content }}></div>
                    <div style={{display:this.state.showmore,color:'rgba(27,146,207,255)',height:'75px',textAlign:'center',verticalAlign:'middle',lineHeight:'50px',marginTop:'-80px',marginBottom:'80px'}}><img style={{height:'80px',width:'100%'}} src='http://cms.sdwhcn.com/web/libs/img/showmark.png'/><div style={{marginTop:'-25px'}} onClick={this.showmoreClick.bind(this)}>展开全部</div></div>
                    {
                        datainfo.tags && datainfo.tags.length >= 1 ? <div><div style={{ display: 'inline-block', clear: 'both' }}>
                            <div>
                                { datainfo.tags.map((data, idx) => (
                                        <span key={idx} className="yx-simiao-tag" onClick={this.tagClick.bind(this, data)}>{data.name}</span>
                                    ))
                                }</div>
                        </div>
                            <WhiteSpace size="sm" />
                        </div> : null
                    }
                </div>
                <WhiteSpace size="md" />
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} onClick={this.handlikeClick.bind(this,datainfo)}>
                    <img style={{ height: '25px', marginLeft: '15px' }} src={this.state.likeimage} />
                    <span className="yx-detail-views">{this.state.thumb_count}</span>
                </div>
            </div>
        );
    }
}

export default Intro;
