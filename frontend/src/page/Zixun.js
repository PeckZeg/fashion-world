import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import LoadingLayout from '../component/LoadingLayout';
import NewsList from '../component/zixun/NewsList';
import CaaCarousel from '../component/XYCarousel';
import Proxy from '../tools/proxy.js'

export default class Zixun extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: true,
      cards: [],
      newsdata: [],
      nextpageurl: null,
    };
  }
  componentDidMount() {
    var _this = this;
    Proxy.get("http://cms.sdwhcn.com/api/article/banner", function (data) {

      var carddata = JSON.parse(data).data;
      console.log(carddata);
      _this.setState({ cards: carddata });

    })
    var token = localStorage.getItem("usertoken");
    Proxy.get("http://cms.sdwhcn.com/api/article/list", function (data) {
      var listh = [{}];
      var listdata = JSON.parse(data).data.data;
      setTimeout(function () {
        _this.setState({ loadingVisible: false });
      }, 500);
      var newlist = listh.concat(listdata);
      _this.setState({ newsdata: newlist, nextpageurl: JSON.parse(data).data.next_page_url });
    }, token)
  }

  handleNewsClick = data => {
    // window.open(`http://cms.sdwhcn.com/web/shandeng/#/zixundetail?id=${data.id}`);
    this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
    // console.log(data);
  }
  handleCardClick = data => {
    this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
  }
  gotoCategory = () => {
    this.context.router.push({ pathname: 'category' });
  }
  render() {
    return (
      <LoadingLayout visible={this.state.loadingVisible}>
        <NewsList title="推荐" newslist={this.state.newsdata} nextpageurl={this.state.nextpageurl} cardslist={this.state.cards} oncardclick={this.handleCardClick} onnewsclick={this.handleNewsClick} />
        <img className='menuitem'
          src="http://cms.sdwhcn.com/web/libs/img/btn_classify_normal.png"
          onClick={this.gotoCategory.bind(this)}
        />
      </LoadingLayout>
    );
  }
}
