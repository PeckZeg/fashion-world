import React, { Component } from 'react';
import { WhiteSpace, TextareaItem, WingBlank,Button} from 'antd-mobile';
import Proxy from '../../tools/proxy.js';
import jQ from 'jquery';
import { createForm } from 'rc-form';
export default class CallMe extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    componentDidMount() {

    }
    backlastpage = () => {
        // this.refs.mymessage.style.display='none'
        //  jQ('.am-tabs-bar')[0].style.display = 'block';
        // console.log(this.refs.mymessage);
    }
    render() {
        ;
        const { backclick } = this.props;
        return (
            <div id='mymessage' ref='mymessage' style={{ position: 'absolute', top: '0px', backgroundColor: '#f8f8f8', zIndex: 20, height: '100%', width: '100%' }}>
                <div style={{ width: '100%', lineHeight: '50px', height: '50px', textAlign: 'center', backgroundColor: '#fff' }}>联系我们</div>
                <WhiteSpace style={{ backgroundColor: '#f8f8f8', height: '1px' }} />
                <TextareaItem
                    rows={5}
                    count={100}
                    placeholder='请在这里输入你的宝贵意见'
                />
                <img className='backitem' style={{ position: 'absolute' }}
                    src="http://cms.sdwhcn.com/web/libs/img/backitem.png"
                    onClick={backclick.bind(this, false)}
                />
                <Button className="btn" type="primary">确认提交</Button>
            </div>
        );
    }
}
