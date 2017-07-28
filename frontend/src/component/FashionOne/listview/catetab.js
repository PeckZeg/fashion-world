import React, { Component, PropTypes } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
// import '../css/Detailnav.css';
class CateNav extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    onGetSearch = () => {
        console.log('onGetSearch', this.refs.searchinput.value)
    }
    showAll = () => {
        console.log('showall')
    }
    render() {
        const { catelist } = this.props;
        return (
            <div>
                <div>
                    <WhiteSpace size="lg" />
                    <div className="yx-news-topic">热门专题</div>
                    <WhiteSpace size="xs" />
                </div>

                <div>
                    <ul style={{
                        textAlign: 'center', listStyle: 'none', padding: '0px'
                    }}>
                        {
                            catelist.map((data, id) => (data == '全部' ? <li onClick={this.showAll.bind(this, data)} style={{
                                borderRadius: '5px',
                                margin: '5px',
                                border: '1px solid #999',
                                color: '#999',
                                width: '20%',
                                lineHeight: '30px',
                                textAlign: 'center',
                                display: 'inline-block'
                            }} key={id}>{data}
                                <img style={{
                                    height: '16px',
                                    top: '3px',
                                    left: '3px',
                                    position: 'relative',
                                }} src='http://cms.sdwhcn.com/web/libs/img/icon_shaixuan.png' /></li> :
                                <li style={{
                                    borderRadius: '5px',
                                    margin: '5px',
                                    border: '1px solid #ccbb33',
                                    color: '#ccbb33', width: '20%',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    display: 'inline-block'
                                }} key={id}>{data}</li>))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default CateNav;
