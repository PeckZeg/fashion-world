import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import headerup from './img/category/title-header.png';
import headerdowm from './img/category/title-header_down.png';
import head from './img/category/title-yixinxiangfo.png';
import Proxy from '../tools/proxy.js';
export default class Category extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            categorylist: [],
        };
    }
    backlastpage = () => {
        console.log('fanhui')
          this.context.router.push({ pathname: '/zixun' });
    }
    componentDidMount() {
        var _this = this;
        Proxy.get("http://cms.sdwhcn.com/api/article/category", function (data) {
            var carddata = JSON.parse(data).data;
            console.log(carddata);
            _this.setState({ categorylist: carddata });
        })
    }
    Getlistdata = data => {
        this.context.router.push({ pathname: 'categorylist', query: { cid: data.id, name: data.name } });
        console.log(data);
    }
    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#fff', height: '44px', textAlign: 'center', verticalAlign: 'middle' }}>
                    {/*<img style={{ marginTop: '15px', height: '19px' }} src={head} />*/}
                </div>
                <div style={{ textAlign: 'center', width: '100%', height: '39px' }}>
                    <img style={{ paddingTop: '2px', width: '70px' }} src={headerup} />
                    <div id="topic_title" style={{ fontSize: '17px', lineHeight: '25px' }}>栏目分类</div>
                    <img style={{ paddingTop: '2px', width: '70px' }} src={headerdowm} />
                </div>
                <WhiteSpace size='lg' />
                <ul style={{
                    listStyle: 'none', 
                    margin: '15px',
                    padding: '0px'
                }}>
                    {
                        this.state.categorylist.map((data, id) =>
                            (
                                id % 4 == 1 || id % 4 == 2 ? <li key={id} style={{ width: '50%', height: '100px', float: "left", backgroundColor: '#c9c9c9' }} onClick={this.Getlistdata.bind(this, data)}>
                                    <div style={{ height: '100px', lineHeight: '100px', textAlign: 'center' }}  >{data.name}</div>
                                </li> : <li key={id} style={{ width: '50%', height: '100px', float: "left", backgroundColor: '#fafafa' }} onClick={this.Getlistdata.bind(this, data)}>
                                        <div style={{ height: '100px', lineHeight: '100px', textAlign: 'center' }}  >{data.name}</div>
                                    </li>
                            )
                        )
                    }
                </ul>
                 <img className='backitem'
                    src="http://cms.sdwhcn.com/web/libs/img/backitem.png"
                    onClick={this.backlastpage.bind(this)}
                />
            </div>
        );
    }
}
