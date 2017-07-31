import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import LoadingLayout from '../component/LoadingLayout';
import Intro from '../component/zixundetail/intro.js';
import Horizonscroll from '../component/zixundetail/horizonscroll.js';
import Zuixinlist from '../component/zixundetail/zuixin.js';
import Proxy from '../tools/proxy.js';

export default class Zixundetail extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            loadingVisible: true,
            intro: {},
            related: [],
            recommend: [
                {
                    id: 40,
                    cid: 1,
                    title: "title40",
                    thumb: "http://cms.sdwhcn.com/uploads/content/20170309/58c16c1c4ae4e_12o.png",
                    description: "descriptiondescriptiondescriptiondescriptiondescription",
                    created_at: "2017-03-01",
                    category: {
                        id: 1,
                        name: "大德开示"
                    }
                },
                {
                    id: 41,
                    cid: 3,
                    title: "title41",
                    thumb: "http://cms.sdwhcn.com/uploads/content/20170309/58c16c1c4ae4e_12o.png",
                    description: "descriptiondescriptiondescriptiondescriptiondescription",
                    created_at: "2017-03-01",
                    category: {
                        id: 3,
                        name: "高僧传奇"
                    }
                },
                {
                    id: 45,
                    cid: 2,
                    title: "title45",
                    thumb: "http://cms.sdwhcn.com/uploads/content/20170309/58c16c1c4ae4e_12o.png",
                    description: "descriptiondescriptiondescriptiondescriptiondescription",
                    created_at: "2017-03-01",
                    category: {
                        id: 2,
                        name: "佛教新闻"
                    }
                },
                {
                    id: 47,
                    cid: 1,
                    title: "title47",
                    thumb: "http://cms.sdwhcn.com/uploads/content/20170309/58c16c1c4ae4e_12o.png",
                    description: "123123123123",
                    created_at: "2017-03-01",
                    category: {
                        id: 1,
                        name: "大德开示"
                    }
                },
                {
                    id: 101,
                    cid: 1,
                    title: "12312312",
                    thumb: "http://cms.sdwhcn.com/uploads/content/20170309/58c16c1c4ae4e_12o.png",
                    description: "31231232131",
                    created_at: "2017-03-07",
                    category: {
                        id: 1,
                        name: "大德开示"
                    }
                },
                {
                    id: 104,
                    cid: 2,
                    title: "妈祖巡游",
                    thumb: "http://cms.sdwhcn.com/uploads/content/20170428/590228209ca1c_28o.png",
                    description: "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    created_at: "2017-03-28",
                    category: {
                        id: 2,
                        name: "佛教新闻"
                    }
                },
                {
                    id: 105,
                    cid: 7,
                    title: "测试数",
                    thumb: "http://cms.sdwhcn.com/uploads/content/20170413/58ef4d4b16a27_59o.png",
                    description: "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    created_at: "2017-03-28",
                    category: {
                        id: 7,
                        name: "一心公益"
                    }
                }
            ]
        };
    }
    componentDidMount() {
        var _this = this;
        var token = localStorage.getItem("usertoken")
        console.log(this.props.location);
        Proxy.get(`http://cms.sdwhcn.com/api/article/detail${this.props.location.search}`, function (data) {
            var introdata = JSON.parse(data).data;
            _this.setState({ intro: introdata });
            setTimeout(function () {
                _this.setState({ loadingVisible: false });
            }, 1000);
        }, token)
        Proxy.get(`http://cms.sdwhcn.com/api/article/related${this.props.location.search}`, function (data) {
            var introdata = JSON.parse(data).data;
            _this.setState({ related: introdata });
        })
        Proxy.get("http://cms.sdwhcn.com/api/article/recommendations", function (data) {
            var introdata = JSON.parse(data).data;
            _this.setState({ recommend: introdata });
        })
    }
    handleNewsClick = data => {
        // this.context.router.push(data.route);
        console.log(data);
        this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
        window.location.reload();
    }
    likeClick = data => {
        // this.context.router.push(data.route);
        console.log(data);
    }
    viewsClick = data => {
        // this.context.router.push(data.route);
        console.log(data);
    }
    backlastpage = () => {
        console.log('fanhui')
        // window.close();
        this.props.router.goBack();
    }
    handleCardClick = data => {
        this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
        window.location.reload();
        // Toast.info(JSON.stringify(data), 2);
        // console.log(data);
    }
    render() {
        return (
            <LoadingLayout visible={this.state.loadingVisible}>
                <Intro datainfo={this.state.intro} viewsaction={this.viewsClick} likeaction={this.likeClick} />
                <WhiteSpace size="md" />
                {
                    this.state.related && this.state.related.length >= 1 && this.state.related[0].thumb != null ?
                        <div>
                            <WhiteSpace style={{ backgroundColor: '#f0f0f0' }} size="sm" />
                            <WhiteSpace size="lg" />
                            <Horizonscroll related={this.state.related} oncardclick={this.handleCardClick} />
                        </div> : null
                }
                <WhiteSpace style={{ backgroundColor: '#f0f0f0' }} size="sm" />
                <Zuixinlist title="最新推荐" newslist={this.state.recommend} onnewsclick={this.handleNewsClick} />
                <img className='backitem'
                    src="http://cms.sdwhcn.com/web/libs/img/backitem.png"
                    onClick={this.backlastpage.bind(this)}
                />
            </LoadingLayout>
        );
    }
}
