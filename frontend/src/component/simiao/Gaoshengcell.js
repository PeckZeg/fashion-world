import React, { Component } from 'react';
import { WhiteSpace } from 'antd-mobile';
// import '../css/App.css';
class Gaoshengcell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxHight: '130px',
            height: '130px',
            width: '100%',
            dataSource: [],
            newsdata: [],
            refreshing: false,
            isLoading: false,
            hasMore: true,
            next_page_url: null,
        };
    };
    addFocus() {
        console.log("addFocus");
    }
    callTo() {
        console.log("callTo");
    }
    render() {
        const { tag, rowData,onClick} = this.props;
        return (
            <div style={{
                height: this.state.height,
                backgroundColor: "#fff",
                marginLeft: '15px',
                marginRight: '15px',
                borderRadius: '8px'
            }} onClick={onClick.bind(this, rowData)} >
                <div style={{ display: 'flex' }}>
                    <img style={{ position: 'relative', marginTop: '15px', marginLeft: '15px', width: '70px', backgroundColor: '#ddd', height: '70px', borderRadius: '35px' }} src={rowData.avatar} />
                    <div style={{ display: 'inline-block', marginTop: '20px', marginLeft: '15px' }} >
                        <div style={{display:'inline-flex'}}>
                        <div className="text-overflow-one" style={{ marginRight: '10px',fontSize: '16px', color: "#333",ineHeight:'18px'}}>{rowData.name}</div>
                        <div className="yx-news-summar" style={{lineHeight:'18px',marginLeft:'15px',fontSize: '14px' }}>{rowData.summary}</div>
                        </div>
                        <WhiteSpace size="xs" />
                        <div className="yx-news-category text-overflow-one" style={{ lineHeight:'18px',marginRight:'10px',fontSize: '14px' }}>{rowData.description}</div>
                        <WhiteSpace size="xs" />
                        <div className="yx-news-summar text-overflow-one" style={{ ineHeight:'18px',marginRight:'10px',fontSize: '14px' }}>{rowData.views+'人关注'}</div>
                    </div>
                </div>
                <WhiteSpace size="sm" />
                <div style={{ backgroundColor: '#f8f8f8', height: '1px', width: '100%' }}></div>
                <WhiteSpace size="xs" />
                <div  style={{ display: 'flex',width:'100%'}}>
                    <div className="yx-news-summar text-overflow-one" style={{ ineHeight:'18px',marginLeft: '15px', fontSize: '14px', marginTop: '2px' }}>查看更多详情</div>
                    <div style={{paddingLeft:'4px',paddingRight:'4px',paddingTop:'2px',paddingBottom:'2px',fontSize:'14px',border:'1px solid #666',borderRadius:'5px',position:'absolute',right:'30px'}}>进入</div>
                </div>
            </div>
        );
    }
}

export default Gaoshengcell;