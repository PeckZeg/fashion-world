import React, { Component } from 'react';
// import '../css/App.css';
class titleCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width:'100%',
            height:'80px',
        };
    }
    render() {
         const {date, title} = this.props;
        return (
            <div className="title-panle" style={{width:this.state.width,height:this.state.height}}> 
              <div className="title-title">{title}</div>
              <div className="title-date">{date}</div>
            </div>
        );
    }
}

export default titleCell;