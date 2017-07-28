import React, { Component } from 'react';
import { WingBlank } from 'antd-mobile';
import LoadingLayout from '../component/LoadingLayout';
export default class lifo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: screen.height,
      width: '100%',
      Banner: {
        name: "少林寺",
        tag: "汉传",
        views: 12354,
        follow: 6546,
        banner: "http://cms.sdwhcn.com/web/libs/img/def_bg.png"
      },
      items: ['one', 'two', 'three'],
      visible: false,
      loadingVisible: true,
    };
  }
  componentDidMount() {

    setTimeout(() => {
      this.setState({ loadingVisible: false });
    }, 1024);
  }

  render() {
    return (
      <LoadingLayout visible={this.state.loadingVisible}>
        <iframe frameBorder="0px" style={{ overflow: 'hidden', margin: '0px', padding: '0px', height: screen.height, width: screen.width, backgroundColor: "transparent" }} src='http://cms.sdwhcn.com/web/public/wx_lifopage/index.html'>
        </iframe>
      </LoadingLayout>
    );
  }
}
