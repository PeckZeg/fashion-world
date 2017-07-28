import React, { Component, PropTypes } from 'react';
// import '../css/App.css';
import jQ from 'jquery'
import Banner from '../component/Banner.js';
import TitleCell from '../component/simiao/titleCell.js';
import Infoplane from '../component/simiao/Infoplane.js';
import DetailNav from '../component/Detailnav.js';
import HoldCell from '../component/simiao/HoldCell.js';
import DetailproPlane from '../component/simiao/DetailproPlane.js';
import Applyplane from '../component/simiao/Applyplane.js';
import Modelapp from '../component/simiao/Modelapp.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      Banner: {
        name: "少林寺",
        tag: [{'name':'汉传'}],
        views: 12354,
        follow: 6546,
        banner: "http://cms.sdwhcn.com/web/libs/img/def_bg.png"
      },
      items: ['one', 'two', 'three'],
      visible: false,
    };
  }
  componentWillMount() {
    var _this = this;
    jQ.ajax({
      url: "http://cms.sdwhcn.com/api/temple/detail?id=8", success: function (data) {
        _this.setState({
          Banner:data.data,
          Title: {
            title: "嵩山少林寺举行【少林文化泰国行】现时现人参加",
            date: "2017.02.13"
          },
          Hold: {
            pic: "http://cms.sdwhcn.com/web/libs/img/s1.png",
            name: "嵩山少林寺",
            tag: "主办方",
            pro: "善灯万华官方账号，为你探索价值·乐趣·思想·新知，分享世界的另一个可能..."
          },
          Detail: {
            data: "善灯万华官方账号，万华价华价值·乐趣·思价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另值·乐趣·思价值·乐趣·思想界的另一个乐趣万华价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另值·乐趣·思价值·乐趣·思想界的另一个乐趣万华官方，分享世界的另一个可能价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另华价值·乐趣·思价值·乐趣·思想界的另值·乐趣·思价值·乐趣·思想界的另一个乐趣万华官方，分享世界的另一个可能官方，分享世界的另一个可能"
          }
        })
        console.log(data);
      }
    });
  }

  showModel() {
    console.log('show');
    this.setState({
      'visible': true
    });
  }
  hideModel() {
    this.setState({
      'visible': false
    });
  }
  render() {
    return (
      <div className="App">
        <Banner bdata={this.state.Banner} />
        <TitleCell {...this.state.Title} />
        <Infoplane />
        <HoldCell {...this.state.Hold} />
        <DetailproPlane {...this.state.Detail} />
        <Applyplane showModel={this.showModel.bind(this)} />
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {
            this.state.visible ?
              <Modelapp Cancle={this.hideModel.bind(this)} /> : null
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
