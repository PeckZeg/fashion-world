import React, { Component } from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import Proxy from '../../tools/proxy.js';
import shouchangimg from '../../page/img/personal/user_message@2x.png';
import gaoshengimg from '../../page/img/personal/user_buddhist@2x.png';
import templeimg from '../../page/img/personal/user_temple@2x.png';
import serviceimg from '../../page/img/personal/user_service@2x.png';
import jQ from 'jquery';
export default class PersonalList extends Component {
    constructor(props) {
        super(props);
    };
    componentDidMount() {
        // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // alert('是否是Android：' + isAndroid);
        // alert('是否是iOS：' + isiOS);
    }
    onmessageClick() {

    }
    handleItemClick = (...args) => {

    }
    handleCardClick = card => {
        console.log(card);
    }
    render() {
        const { persondata, showmessagelist, showtemplelist, showmonklist, showcallmeplane } = this.props;
        return (
            <div style={{ zIndex: 10, position: 'absolute', top: '0px', width: '100%' }}>
                <img style={{ marginLeft: '15px', marginTop: '55px', marginBottom: '5px', height: '40px' }} src={persondata.thumb} />
                <div style={{ position: 'absolute', left: '70px', top: '57px', color: '#fff' }}>{persondata.nickname}</div>
                <div style={{ position: 'absolute', left: '70px', top: '76px', color: '#fff' }}>{"虔诚值:" + persondata.pious}</div>
                <WhiteSpace style={{ backgroundColor: '#fff', height: '1px', marginLeft: '15px', marginRight: '15px' }} />
                <div style={{ marginLeft: '15px' }} onClick={showmessagelist.bind(this, true)} >
                    <img style={{ position: 'absolute', height: '26px', marginTop: '10px' }} src={shouchangimg} />
                    <div style={{ height: '45px', marginLeft: '40px', lineHeight: '45px', color: '#fff' }}>收藏文章</div>
                    <WhiteSpace style={{ backgroundColor: '#fff', height: '1px', marginRight: '15px' }} />
                </div>
                <div style={{ marginLeft: '15px' }} onClick={showmonklist.bind(this, true)}>
                    <img style={{ position: 'absolute', height: '26px', marginTop: '10px' }} src={gaoshengimg} />
                    <div style={{ height: '45px', marginLeft: '40px', lineHeight: '45px', color: '#fff' }}>关注高僧</div>
                    <WhiteSpace style={{ backgroundColor: '#fff', height: '1px', marginRight: '15px' }} />
                </div>
                <div style={{ marginLeft: '15px' }} onClick={showtemplelist.bind(this, true)}>
                    <img style={{ position: 'absolute', height: '26px', marginTop: '10px' }} src={templeimg} />
                    <div style={{ height: '45px', marginLeft: '40px', lineHeight: '45px', color: '#fff' }}>关注寺庙</div>
                    <WhiteSpace style={{ backgroundColor: '#fff', height: '1px', marginRight: '15px' }} />
                </div>
                <div style={{ marginLeft: '15px' }} onClick={showcallmeplane.bind(this, true)}>
                    <img style={{ position: 'absolute', height: '26px', marginTop: '10px' }} src={serviceimg} />
                    <div style={{ height: '45px', marginLeft: '40px', lineHeight: '45px', color: '#fff' }}>联系我们</div>
                    <WhiteSpace style={{ backgroundColor: '#fff', height: '1px', marginRight: '15px' }} />
                </div>
            </div>
        );
    }
}
