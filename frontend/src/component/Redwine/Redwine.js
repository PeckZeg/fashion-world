import React, { Component } from 'react';
import { WhiteSpace, ListView, RefreshControl, WingBlank } from 'antd-mobile';
import jQ from 'jquery';
import CaaCarousel from '../XYCarousel';
import SeachInput from '../SeachInput';
import Proxy from '../../tools/proxy.js';
const catelist = [
    { id: 0, title: 'VINES & VINEYARDS', image: 'http://cms.sdwhcn.com/web/libs/img/icon_grapes.png' },
    { id: 2, title: 'TRAVEL & TOURISM', image: 'http://cms.sdwhcn.com/web/libs/img/picto_travel_tourism.png' },
    { id: 3, title: 'GASTRONOMY', image: 'http://cms.sdwhcn.com/web/libs/img/picto_gastronomy.png' },
    { id: 4, title: 'LIFESTYLE', image: 'http://cms.sdwhcn.com/web/libs/img/picto_lifestyle.png' },
    { id: 5, title: 'WINE TASTING', image: 'http://cms.sdwhcn.com/web/libs/img/picto_wine_tasting.png' },
    { id: 6, title: 'EVENTS', image: 'http://cms.sdwhcn.com/web/libs/img/picto_events.png' },
];
// const playIcon = icons.play({ size: 'xxs' });
export default class RedWine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardslist: [],
            searchopen: false,
        };
    };
    componentDidMount() {
        var _this = this;
        Proxy.get("http://cms.sdwhcn.com/api/article/banner", function (data) {

            var carddata = JSON.parse(data).data;
            console.log(carddata);
            _this.setState({ cardslist: carddata });

        })
    }
    onCardClick = () => {

    }
    onClickCate = (id) => {
        console.log('onClickCate', id)
    }
    onSearchClick = () => {
        var n_searchopen = !this.state.searchopen;
        this.setState({ searchopen: n_searchopen });
        // console.log('seach')
    }

    render() {
        const { cardslist, oncardclick } = this.props;
        return (
            <div className='homebody'>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ width: '100%', height: '30px', textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                        <img style={{ height: '30px' }} src='http://cms.sdwhcn.com/web/libs/img/logo_wlc_header.png' />
                        <img style={{ height: '20px', position: 'absolute', right: '15px', marginTop: '5px' }} onClick={this.onSearchClick} src='http://cms.sdwhcn.com/web/libs/img/icon_-search.png' />
                    </div>
                    {
                        this.state.searchopen == true ? <SeachInput /> : null
                    }
                    <img style={{ margin: '5px', height: '20px', position: 'relative' }} src='http://cms.sdwhcn.com/web/libs/img/winetitleimg.png' />
                </div>
                <CaaCarousel cards={this.state.cardslist} onCardClick={this.onCardClick} />
                <ul style={{ listStyle: 'none', padding: '0px', textAlign: 'center' }}>{
                    catelist.map((data, id) =>
                        (<li key={id} onClick={this.onClickCate.bind(this, id)} style={{ borderBottom: '1px solid #dd0000', marginLeft: '30px', marginRight: '30px', lineHeight: '50px', height: '50px', color: '#fff' }}>
                            <img style={{ height: '20px', marginTop: '15px', left: '45px', width: '20px', position: 'absolute' }} src={data.image} />
                            {data.title}
                        </li>))
                }
                </ul>
                <div style={{ height: '50px' }} />
            </div>
        );
    }
}
