import React, { Component } from 'react';
import { WingBlank } from 'antd-mobile';
import LoadingLayout from '../component/LoadingLayout';
export default class Newspage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: window.screen.height,
            width: window.screen.width,
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
                <iframe frameBorder="0" style={{ backgroundColor: "transparent" }} width={this.state.width} height={this.state.height} marginWidth="0" marginWidth="0" src='http://cms.sdwhcn.com/web/zixunpage/index.html'>
                </iframe>
            </LoadingLayout>
        );
    }
}