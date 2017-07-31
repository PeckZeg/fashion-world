import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import LoadingLayout from '../component/LoadingLayout';
import NewsList from '../component/zixun/NewsList';
import CaaCarousel from '../component/XYCarousel';
import Proxy from '../tools/proxy.js'

export default class Catelist extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: true,
      cards: [],
      newsdata: [],
      firsturl: null,
      nextpageurl: null,
      title: '推荐',
    };
  }
  componentDidMount() {
    var _this = this;
    Proxy.get("http://cms.sdwhcn.com/api/article/banner", function (data) {

      var carddata = JSON.parse(data).data;
      console.log(carddata);
      _this.setState({ cards: carddata });

    })

    _this.setState({ firsturl: `http://cms.sdwhcn.com/api/article/list?cid=${this.props.location.query.cid}` });

    Proxy.get(`http://cms.sdwhcn.com/api/article/list?cid=${this.props.location.query.cid}`, function (data) {
      var listh = [{}];
      var listdata = JSON.parse(data).data.data;
      setTimeout(function () {
        _this.setState({ loadingVisible: false });
      }, 500);
      var newlist = listh.concat(listdata);
      _this.setState({ title: _this.props.location.query.name, newsdata: newlist, nextpageurl: JSON.parse(data).data.next_page_url });
    })
  }
  handleNewsClick = data => {
    this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
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
        <NewsList firsturl={this.state.firsturl} title={this.state.title} cardslist={this.state.cards} oncardclick={this.handleCardClick} newslist={this.state.newsdata} onnewsclick={this.handleNewsClick} />
        <img className='backitem'
          src="http://cms.sdwhcn.com/web/libs/img/btn_classify_normal.png"
          onClick={this.gotoCategory.bind(this)}
        />
      </LoadingLayout>
    );
  }
}
