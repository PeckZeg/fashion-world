import React, { Component } from 'react';
// import '../css/App.css';
class Applyplane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width:'100%',
            height:'45px',
        };
    }
    ShowInputPlane(){
     console.log("ShowInputPlane");
    }
    Collect(){
     console.log("Collect");
    }
    render() {
        const {showModel}= this.props;
        return (
            <div className="apply"> 
              <img className="apply-img-return" src="http://cms.sdwhcn.com/web/libs/img/back.png" />
              <img className="apply-img-col" onClick={this.Collect.bind(this)} src="http://cms.sdwhcn.com/web/libs/img/col.png" />
              <div className="apply-plane">
                 <img className="apply-plane-img" src="http://cms.sdwhcn.com/web/libs/img/apply.png" /> 
                 <div className="apply-plane-text" onClick={showModel}>我要报名</div>
             </div>
            </div>
        );
    }
}

export default Applyplane;