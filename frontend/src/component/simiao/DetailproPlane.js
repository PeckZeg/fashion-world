import React, { Component } from 'react';
// import '../css/App.css';
class DetailproPlane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '150px',
            maxheight: '',
            more: "更多详情",
            show: false,
            dataclass: 'detail-data'
        };
    }
    componentWillMount() {

    }

    getMore(state) {
        if (!this.state.show) {
            this.setState({ show: true, dataclass: "detail-data-all" });
            var _this = this;
            setTimeout(function () {
                _this.setState({ more: "收起", height: _this.refs.data.offsetHeight + 70 });
            }, 1);
        }
        else {
            this.setState({ show: false, dataclass: "detail-data" });
            var _this = this;
            setTimeout(function () {
                _this.setState({ more: "更多详情", height: 150 });
            },1);
        }
    }
    render() {
        const {data} = this.props;
        return (
            <div className="detail-panle" style={{ width: this.state.width, height: this.state.height }}>
                <div className={this.state.dataclass} ref='data'>{data}</div>
                
                <div className="detail-more" onClick={this.getMore.bind(this, data)}><div style={{backgroundColor:"#ccc",height:"1px",width:"100%", marginBottom:"10px"}}></div>{this.state.more}</div>
            </div>
        );
    }
}
window.count = 0;
export default DetailproPlane;