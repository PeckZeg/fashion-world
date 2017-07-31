import React, { Component } from 'react';
// import '../css/App.css';
class HoldCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '125px',
        };
    }
    addFocus() {
        console.log("addFocus");
    }
    callTo() {
        console.log("callTo");
    }
    render() {
        const {name, pic, tag, pro} = this.props;
        return (
            <div className="hold-panle" style={{ width: this.state.width, height: this.state.height }}>
                <img className="hold-panle-img" src={pic} />
                <div className="hold-title">{name}</div>
                <div className="hold-type">{tag}</div>
                <div className="hold-pro">{pro}</div>
                <div className="line-h"></div>
                <div className="line-v"></div>
                <div className="hold-addfocus" onClick={this.addFocus}>+ 关注</div>
                <div className="hold-call" onClick={this.callTo}>联系Ta</div>
            </div>
        );
    }
}

export default HoldCell;