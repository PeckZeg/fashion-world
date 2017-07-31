import React, { Component } from 'react';
import { WhiteSpace, Toast } from 'antd-mobile';
// import Proxy from '../../tools/proxy.js';
// import '../css/App.css';
class GaoshengIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sumheight: null,
            showmore: 'block'
        }
    }
    componentDidMount() {
        if (this.refs.summary.getElementsByTagName('img').length > 0) {
            var m = this.refs.summary.getElementsByTagName('img')[0];
            m.style.marginLeft = '0px';
            m.style.width = (screen.width - 30) + 'px';
            m.style.marginBottom = '15px';
        }
    }
    showmoreClick = () => {
        this.setState({ sumheight: null, showmore: 'none' })
    }
    render() {
        const { datainfo } = this.props;
        // console.log(name)
        return (
            <div ref='summary' className="yx-detail-summary" style={{ height: this.state.sumheight,width:screen.width-30}} dangerouslySetInnerHTML={{ __html: datainfo }}></div>
        );
    }
}

export default GaoshengIntro;
