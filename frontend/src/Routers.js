import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Toast } from 'antd-mobile';
import Proxy from './tools/proxy.js';
import App from './page/App.js';
import Detail from './page/Zixundetail.js';
import Lifo from './page/Lifo';
import Simiao from './page/Simiao';
import Index from './page/Navbar.js';
import Search from './page/Search';
import Zixun from './page/Zixun';
import Login from './page/Login';
import Newspage from './page/News';
import Temple from './page/Temple';
import Category from './page/Category';
import Catelist from './page/Categorylist';
import Taglist from './page/Taglist';
import Simiaodetail from './page/Simiaodetail';
import Simiaojianjie from './component/simiao/Smjianjie';
import Simiaogongfo from './component/simiao/Smgongfo';
import Simiaosheng from './component/simiao/Smgaosheng';
import Smzixun from './component/simiao/Smzixun';
import PersonalCenter from './page/PersonalCenter';

import Gaoshengdetail from './page/Gaoshenginfo.js'

let count = 0;

export default class Routers extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  // wechat = () => {
  //   var code = document.location.search.split('?')[1] ? document.location.search.split('?')[1].split('=')[1].split('&')[0] : null
  //   var _this = this;
  //   var url = "http://cms.sdwhcn.com/api/oauth/wechat/web?code=" + code;
  //   // code = '021QAUa409iIfF1PTi740JB1b40QAUaK';
  //   Proxy.get(url, function (data, heads) {
  //     // Toast.info(url, 3);
  //     var jsondata = JSON.parse(data);
  //     if (jsondata.status == 1) {
  //       Toast.info(jsondata.message, 2);
  //     }
  //     else {
  //       localStorage.setItem('usertoken', jsondata.data.token);
  //       localStorage.setItem('userinfo', JSON.stringify(jsondata.data));
  //       _this.context.router.push({ pathname: '/lifo' });
  //       // _this.push({ pathname: '/lifo' });
  //     }
  //   });
  //   localStorage.setItem('mycurrent', 0);
  //   // "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdap&connect_redirect=1#wechat_redirect"
  //   // document.location="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c9fc131cfa23a7a&redirect_uri=http://cms.sdwhcn.com/api/oauth/wechat/web&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
  // }
  render() {
    return (
      <Router history={hashHistory}>
        {/*<Route path="/" onEnter={this.wechat.bind(this)} component={Login} />
        <Route path="/index" component={Index}>
          <IndexRoute component={Lifo} />
          <Route path="/zixun" component={Zixun} />
          <Route path="/lifo" component={Lifo} />
          <Route path="/simiao" component={Simiao} />
          <Route path="/search" component={Search} />
          <Route path="/personal-center" component={PersonalCenter} />
        </Route>*/}

        <Route path="/" component={Login} />
        <Route path="/zixundetail" component={Detail} />

        <Route path="/zixunpage" component={Zixun} />
        <Route path="/simiao" component={Simiao} />
        <Route path="/category" component={Category} />
        <Route path="/categorylist" component={Catelist} />
        <Route path="/taglist" component={Taglist} />
        <Route path="/simiaodetail" component={Simiaodetail} >
          <IndexRoute component={Simiaojianjie} />
          <Route path="/smjianjie" component={Simiaojianjie} />
          <Route path="/smzixun" component={Smzixun} />
          <Route path="/smhuodong" component={Search} />
          <Route path="/smgongfo" component={Simiaogongfo} />
          <Route path="/smgaosheng" component={Simiaosheng} />
        </Route>
        <Route path="/gaoshengdetail" component={Gaoshengdetail} />
      </Router>
    );
  }
}
