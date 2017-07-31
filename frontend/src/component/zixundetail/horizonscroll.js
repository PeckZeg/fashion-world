
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import React, { Component } from 'react';
import { WhiteSpace } from 'antd-mobile';
// import '../css/App.css';
class HorizontalScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxwidth: '100%',
            height: "auto",
        };
        console.log(props)
    }
      componentDidMount() {
        var wlength = this.props.related.length * 210 + 15;

        this.setState({ maxwidth: `${wlength}px` });
    }
    render() {
        
        const { oncardclick, related } = this.props

        return (
            <div>
                <div className="yx-news-topic-sm">{"相关文章"}</div>
                <WhiteSpace size="sm" />
                <div style={{ width: '100%', marginBottom: '15px' }}>
                    <ReactIScroll iScroll={iScroll}
                        options={{ mouseWheel: true, scrollbars: false, scrollX: true }}>
                        <div style={{ width: this.state.maxwidth }}>
                            <ul style={{ padding: '5px', listStyleType: "none", clear: 'both', height: "160px" }}>
                                {
                                    related.map((redata,i) => {
                                        return <li style={{ float: 'left', width: '200px', height: '150px', marginLeft: '10px' }} key={i}>
                                            <img style={{ width: '200px', height: '102px' }} src={redata.thumb} onClick={oncardclick.bind(this, redata)} />
                                            <WhiteSpace size="xs" />
                                            <div className="yx-news-category">{redata.category.name}</div>
                                            <WhiteSpace size="xs" />
                                            <div className='yx-detail-title'>{redata.title}</div>
                                        </li>
                                    })}
                            </ul>
                        </div>
                    </ReactIScroll>
                </div>
            </div>
        )
    }
}

export default HorizontalScroll;
