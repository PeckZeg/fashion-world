import React, { Component, PropTypes } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import tabs, { defaultActiveKey } from '../const/simiaodetailtap.js';
// import '../css/Detailnav.css';
class SeachInput extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    onGetSearch = () => {
        console.log('onGetSearch',this.refs.searchinput.value)
    }
    render() {
        // const {getsearch} = this.props;
        return (
            <div className="seachbody">
               <div style={{position:'absolute',marginLeft:'30px',backgroundColor:'#fff',marginTop:'7px',height:'26px',width:'70%',lineHeight:'26px',borderRadius:'13px'}}>
                    <input ref='searchinput' style={{width:'90%',border:'0px'}} type="search" name="winesearch" placeholder="Search" />
               </div>
               <div onClick={this.onGetSearch} style={{position:'absolute',right:'30px',lineHeight:'40px',fontSize:'18px',color:'#fff'}}>GO</div>
            </div>
        );
    }
}

export default SeachInput;
