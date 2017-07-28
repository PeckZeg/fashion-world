import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import LoadingLayout from '../component/LoadingLayout';
import Simiaolist from '../component/simiao/Simiaolist';
import CaaCarousel from '../component/XYCarousel';
import Proxy from '../tools/proxy.js';
const cards = [
  { id: 1, title: '轮播图 1', image: 'http://localhost/carousel-1.png' },
  { id: 2, title: '轮播图 2', image: 'http://localhost/carousel-1.png' },
  { id: 3, title: '轮播图 3', image: 'http://localhost/carousel-1.png' },
  { id: 4, title: '轮播图 4', image: 'http://localhost/carousel-1.png' },
  { id: 5, title: '轮播图 5', image: 'http://localhost/carousel-1.png' }
];
const newsdata = [
  {},
  { id: 1, thumb: 'http://localhost/carousel-1.png', category: '佛教新闻', createAt: '2017.01.15', title: '标题 1', summary: '空asdajkahkajh啊刷空asdajkahkajh啊刷啊刷空间很大jkahkajh啊刷空间很大空间的sdasd 1', duration: '03:12' },
  { id: 2, thumb: 'http://localhost/carousel-1.png', category: '大德开示', createAt: '2017.01.15', title: '标题 2', summary: '简asdasda介 2', duration: '03:12' },
  { id: 3, thumb: 'http://localhost/carousel-1.png', category: 'Fashion TV', createAt: '2017.01.15', title: '标题 3', summary: '简asdasdasda介as 3', duration: '03:12' },
  { id: 4, thumb: 'http://localhost/carousel-1.png', category: 'Fashion TV', createAt: '2017.01.15', title: '标题 4', summary: '简介asdasdasdasd 4', duration: '03:12' },
  { id: 5, thumb: 'http://localhost/carousel-1.png', category: 'Fashion TV', createAt: '2017.01.15', title: '标题 5', summary: '简介asdasdasdasd 5', duration: '03:12' },
]
export default class Simiao extends Component {
    static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: true,
      cards:[],
      newsdata:[],
       nextpageurl:null,
    };
  }
  componentDidMount() {
     var _this=this;
    Proxy.get("http://cms.sdwhcn.com/api/temple/banner",function(data){
      var carddata=JSON.parse(data).data;
       console.log(carddata);
      _this.setState({ cards:carddata});
    })
    Proxy.get("http://cms.sdwhcn.com/api/temple/list",function(data){
      var listh=[{}];
      var listdata=JSON.parse(data).data.data;
      setTimeout(function () {
        _this.setState({ loadingVisible: false });
      }, 500);
      var newlist=listh.concat(listdata);
      _this.setState({newsdata:newlist,nextpageurl:JSON.parse(data).data.next_page_url});
    })
  }
  handleNewsClick = data => {
    this.context.router.push({ pathname: 'simiaodetail', query: { id: data.id } });
    // console.log(data);
  }
  handleCardClick = data => {
    this.context.router.push({ pathname: 'simiaodetail', query: { id: data.id } });
  }
  render() {
    return (
     <LoadingLayout visible={this.state.loadingVisible}>
        <Simiaolist title="推荐" newslist={this.state.newsdata} nextpageurl={this.state.nextpageurl} cardslist={this.state.cards} oncardclick={this.handleCardClick} onnewsclick={this.handleNewsClick} />
     </LoadingLayout>
    ); 
  }
}