import React, { Component } from 'react';
import { WhiteSpace, ListView, RefreshControl, WingBlank } from 'antd-mobile';
import jQ from 'jquery'
import Proxy from '../../tools/proxy.js';
const cards = [
    { id: 0, title: 'live', image: 'http://cms.sdwhcn.com/web/libs/img/live.png' },
    { id: 1, title: 'wine', image: 'http://cms.sdwhcn.com/web/libs/img/redwine.png' },
    { id: 2, title: 'one', image: 'http://cms.sdwhcn.com/web/libs/img/fashionone.png' },
    { id: 3, title: 'deep', image: 'http://cms.sdwhcn.com/web/libs/img/deep.png' },
    { id: 4, title: 'tv', image: 'http://cms.sdwhcn.com/web/libs/img/fashiontv.png' }
    // { id: 5, title: 'music', image: 'http://cms.sdwhcn.com/web/libs/img/fashionmusic.png' },
    // { id: 6, title: 'life', image: 'http://cms.sdwhcn.com/web/libs/img/fashionlive.png' }
];
// const playIcon = icons.play({ size: 'xxs' });
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    componentDidMount() {

    }
    render() {

        const { newslist, EnterList } = this.props;
        var listOfLi = [];
        for (var i = 0; i < cards.length; i++) {
            listOfLi.push(<li onClick={EnterList.bind(this, cards[i])} style={{ marginTop: "-30px" }} key={i}>
                <img src={cards[i].image} />
            </li>)
        }
        return (
            <div className='homebody'>
                <img src="http://cms.sdwhcn.com/web/libs/img/fwhometop.png" />
                <ul style={{ listStyle: 'none', padding: '0px', position: 'relative', top: '-60px' }}>
                    {
                        listOfLi
                    }
                </ul>
                <div id='fwhomefoot'>
                    <div style={{ bottom: '15px', position: 'relative', textAlign: 'center', width: '100%', height: '10px', fontSize: '8px', lineHeight: '10px', marginBottom: '10px', color: '#fff' }}>Copyright© 2017 厦门正辰通讯科技有限公司 .All Rights Reserved.</div>

                    <div style={{ position: 'relative', bottom: '15px', textAlign: 'center', bottom: '15px' }}>
                        <span style={{ textAlign: 'center', width: '100%', fontSize: '8px', color: '#fff' }}>FashionWorld <span style={{ color: '#338de6' }}>用户协议</span></span>
                    </div>
                </div>
            </div>
        );
    }
}
