import React, { Component } from 'react';
// import '../css/App.css';
class Infoplane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: "90%",
            height: "40px",
            time: {
                pic: "http://cms.sdwhcn.com/web/libs/img/icon_time.png",
                start: "03-31 09:00",
                end: "04-01 19:00"
            },
            address: {
                pic: "http://cms.sdwhcn.com/web/libs/img/icon_address.png",
                text: "郑州等分时嵩山少零食非晶期内"
            },
            entered: {
                pic: "http://cms.sdwhcn.com/web/libs/img/icon_entered.png",
                text: "已报名166人/限200人报名"
            }
        };
    }
    goToBaidu() {
        console.log("Baidu地图定位");
    }
    render() {
        //  const {date, title} = this.props;
        return (
            <div className="Infoplane">
                <div className="infoplane-info" style={{ width: this.state.width, height: this.state.height, borderBottom: "1px solid #f0f0f0" }}>
                    <img className="infoplane-img" src={this.state.time.pic} />
                    <div className="info-time">
                        <div className="info-time-num">{this.state.time.start}</div>
                        <div className="info-time-to">至</div>
                        <div className="info-time-num">{this.state.time.end}</div>
                    </div>
                </div>
                <div className="infoplane-info" onClick={this.goToBaidu} style={{ width: this.state.width, height: this.state.height, borderBottom: "1px solid #f0f0f0" }}>
                    <img className="infoplane-img" src={this.state.address.pic} />
                    <img className="infoplane-img-return" src="http://cms.sdwhcn.com/web/libs/img/icon_return.png" />
                    <div className="info-time">
                        <div className="info-time-to">{this.state.address.text}</div>
                    </div>
                </div>
                <div className="infoplane-info" style={{ width: this.state.width, height: this.state.height }}>
                    <img className="infoplane-img" src={this.state.entered.pic} />
                    <div className="info-time">
                        <div className="info-time-to">{this.state.entered.text}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Infoplane;