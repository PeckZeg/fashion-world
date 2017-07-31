import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import LoadingLayout from '../LoadingLayout';
import Smzixunlist from './Smzixun_list';
import Proxy from '../../tools/proxy.js'

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
    console.log(this.props.location);
     var token = localStorage.getItem("usertoken");
    Proxy.get("http://cms.sdwhcn.com/api/article/list/temple?temple_id="+this.props.location.query.id, function (data) {
      var listh = [{}];
      var listdata = JSON.parse(data).data.data;
      setTimeout(function () {
        _this.setState({ loadingVisible: false });
      }, 1000);
    //   var newlist = listh.concat(listdata);
      _this.setState({ newsdata: listdata, nextpageurl: JSON.parse(data).data.next_page_url });
    },token)
  }
  handleNewsClick = data => {
    this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
    // console.log(data);
  }
  handleCardClick = data => {
    this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
  }
  gotoCategory = () => {
    this.context.router.push({ pathname: 'category'});
  }
  render() {
    return (
      <LoadingLayout visible={this.state.loadingVisible}>
        <Smzixunlist title="推荐" newslist={this.state.newsdata} nextpageurl={this.state.nextpageurl} cardslist={this.state.cards} oncardclick={this.handleCardClick} onnewsclick={this.handleNewsClick} />
      </LoadingLayout>
    );
  }
}
