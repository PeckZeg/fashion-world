import React, { Component, PropTypes } from 'react';
import { WingBlank, Toast } from 'antd-mobile';
import LoadingLayout from '../component/LoadingLayout';
import Personallist from '../component/personal/personal-list.js';
import MessageList from '../component/personal/messagelist.js';
import TempleList from '../component/personal/templelist.js';
import MonkList from '../component/personal/monklist.js';
import CallMe from '../component/personal/callme.js';
import Proxy from '../tools/proxy.js';
import jQ from 'jquery';
export default class PersonalCenter extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      height: window.screen.height,
      width: window.screen.width,
      visible: false,
      loadingVisible: true,
      personaldata: {
        balance: "0.00",
        birthday: "0000-00-00",
        city_id: "110200",
        created_at: "2017-05-10 17:28:31",
        district_id: "110229",
        email: "",
        gender: 0,
        generation: "80",
        id: 24,
        is_check_in: 0,
        last_login: "0000-00-00 00:00:00",
        level: 13,
        location_name: "北京市延庆县",
        mobile: "15506969605",
        monk_follows: "",
        nickname: "善灯9605",
        pious: 1572,
        points_difference: 28,
        province_id: "110000",
        realname: "",
        signature: "哦哦哦",
        source: 0,
        status: 0,
        temple_follows: "",
        thumb: "http://59.57.240.50/storage/avatars/default.png",
        updated_at: "2017-07-13 23:50:27",
        username: "15506969605"
      },
      newslist: [],
      templelist: [],
      monklist: [],
      messagenextpageurl: '',
      templenextpageurl: '',
      monkpageurl: '',
      showmessage: false,
      showtemple: false,
      showmonk: false,
      showcallme: false,
      isAndroid:false
    };
  }
  componentDidMount() {
    var _this = this;
    var token = localStorage.getItem("usertoken");

    var userinfo = localStorage.getItem("userinfo");
    // Toast.info(userinfo.nickname,100);
    if (userinfo != null) {
      this.setState({ personaldata: JSON.parse(userinfo) })
    }
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    this.setState({ isAndroid: isAndroid })

    Proxy.get(`http://cms.sdwhcn.com/api/article/collections`, function (data) {
      var introdata = JSON.parse(data).data.data;
      _this.setState({ newslist: introdata, messagenextpageurl: JSON.parse(data).data.next_page_url });
    }, token)

    Proxy.get(`http://cms.sdwhcn.com/api/temple/follows`, function (data) {
      var introdata = JSON.parse(data).data.data;
      _this.setState({ templelist: introdata, templenextpageurl: JSON.parse(data).data.next_page_url });
    }, token)

    Proxy.get(`http://cms.sdwhcn.com/api/monk/follows`, function (data) {
      var introdata = JSON.parse(data).data.data;
      _this.setState({ monklist: introdata, monkpageurl: JSON.parse(data).data.next_page_url });
    }, token)

    var currentpage = localStorage.getItem("mycurrent");
    if (currentpage != null && currentpage != 0) {
      currentpage == 1 ? this.setState({ showmessage: true }) : currentpage == 2 ? this.setState({ showtemple: true }) : currentpage == 3 ? this.setState({ showmonk: true }) : null
      jQ('.am-tabs-bar')[0].style.display = 'none';
    } else {
      jQ('.am-tabs-bar')[0].style.display = 'block';
    }
    setTimeout(() => {
      this.setState({ loadingVisible: false });
    }, 500);

  }
  backlastpage = () => {

  }
  showmessagelist = (data) => {
    data == true ? (jQ('.am-tabs-bar')[0].style.display = 'none', localStorage.setItem('mycurrent', 1)) : (jQ('.am-tabs-bar')[0].style.display = 'block', localStorage.setItem('mycurrent', 0))
    this.setState({ showmessage: data });
  }
  showtemplelist = (data) => {
    data == true ? (jQ('.am-tabs-bar')[0].style.display = 'none', localStorage.setItem('mycurrent', 2)) : (jQ('.am-tabs-bar')[0].style.display = 'block', localStorage.setItem('mycurrent', 0))
    this.setState({ showtemple: data });
  }
  showmonklist = (data) => {
    data == true ? (jQ('.am-tabs-bar')[0].style.display = 'none', localStorage.setItem('mycurrent', 3)) : (jQ('.am-tabs-bar')[0].style.display = 'block', localStorage.setItem('mycurrent', 0))
    this.setState({ showmonk: data });
  }
  showcallmeplane = (data) => {
    data == true ? (jQ('.am-tabs-bar')[0].style.display = 'none', localStorage.setItem('mycurrent', 4)) : (jQ('.am-tabs-bar')[0].style.display = 'block', localStorage.setItem('mycurrent', 0))
    this.setState({ showcallme: data });
  }
  gotomessagedetail = (data) => {
    this.context.router.push({ pathname: 'zixundetail', query: { id: data.id } });
  }
  gotomonkdetail = (data) => {
    this.context.router.push({ pathname: 'gaoshengdetail', query: { id: data.id, tag: 'monk' } });
  }
  gototempledetail = (data) => {
    this.context.router.push({ pathname: 'simiaodetail', query: { id: data.id } });
  }
  render() {
    return (
      <LoadingLayout visible={this.state.loadingVisible}>
        <img src="http://cms.sdwhcn.com/web/shandeng/static/media/user_bg@2x.5f3140c2.png" />
        <Personallist persondata={this.state.personaldata} showmessagelist={this.showmessagelist} showtemplelist={this.showtemplelist} showmonklist={this.showmonklist} showcallmeplane={this.showcallmeplane} />
        {
          this.state.showmessage ? <MessageList newslist={this.state.newslist} nextpageurl={this.state.messagenextpageurl} backclick={this.showmessagelist} itemclick={this.gotomessagedetail} isAndroid={this.state.isAndroid}/> : null
        }
        {
          this.state.showtemple ? <TempleList newslist={this.state.templelist} nextpageurl={this.state.templenextpageurl} backclick={this.showtemplelist} itemclick={this.gototempledetail} isAndroid={this.state.isAndroid}/> : null
        }
        {
          this.state.showmonk ? <MonkList newslist={this.state.monklist} nextpageurl={this.state.monkpageurl} backclick={this.showmonklist} itemclick={this.gotomonkdetail} isAndroid={this.state.isAndroid}/> : null
        }
        {
          this.state.showcallme ? <CallMe newslist={this.state.monklist} nextpageurl={this.state.monkpageurl} backclick={this.showcallmeplane} /> : null
        }
      </LoadingLayout>
    );
  }
}