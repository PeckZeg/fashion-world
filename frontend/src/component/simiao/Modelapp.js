import React, { Component } from 'react';
// import '../css/App.css';
class Modelapp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
        };
    }
    Applyinfo() {
        var obj = this.refs.phone, name = this.refs.name;

        if (obj.value.trim() != "" && obj.value.trim() != '不能为空' && name.value.trim() != "" && name.value.trim() != '不能为空') {

            console.log(this.refs.name.value, this.refs.phone.value);

        }
        else {
            if (obj.value.trim() == "" || obj.value.trim() == "不能为空" && name.value.trim() != "" && name.value.trim() != '不能为空') {
                obj.style.color = '#FF0000';
                obj.value = '不能为空';
                if (this.refs.phone.value != '输入正确格式的11位手机号码') {
                    console.log(this.refs.name.value, this.refs.phone.value);
                }
            }
            if (name.value.trim() == "" || name.value.trim() == "不能为空" && obj.value.trim() != "" || obj.value.trim() != '不能为空') {
                name.style.color = '#FF0000';
                name.value = '不能为空';
            }
            if ((name.value.trim() == "" || name.value.trim() == "不能为空") && (obj.value.trim() == "" || obj.value.trim() == '不能为空')) {
                obj.style.color = '#FF0000';
                obj.value = '不能为空';
                name.style.color = '#FF0000';
                name.value = '不能为空';
            }
        }

    }
    checkphone() {
        var obj = this.refs.phone;
        //正则用//包起来
        var regex = /^((\+)?86|((\+)?86)?)0?1[34587]\d{9}$/;
        if (obj.value) {
            //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)心啊是match未定义
            if (regex.test(obj.value)) {
                console.log('输入正确');
            } else {
                obj.style.color = '#FF0000';
                obj.value = '输入正确格式的11位手机号码';
            }
        } else {
            //这里的callback函数会报错
        }
    }
    clearinput(data) {
        console.log("clearinput")
        data == 'phone' ?
            (this.refs.phone,
                this.refs.phone.style.color = '#333',
                this.refs.phone.value = '') : (this.refs.name,
                    this.refs.name.style.color = '#333',
                    this.refs.name.value = '')
    }
    render() {
        const {Cancle} = this.props;
        return (
            <div className="model" style={{ width: this.state.width, height: this.state.height }}>
                <div className="model-plane">
                    <div style={{ lineHeight: '45px', width: '100%', height: '46px', fontSize: '16px', marginTop: '0px' }}>填写报名信息</div>
                    <button className='model-cancle' onClick={Cancle}>关闭</button>
                    <div className="model-row">
                        <div className="model-name"> 姓名：</div> <input onFocus={this.clearinput.bind(this, 'name')} placeholder='请输入姓名' className='model-input' ref='name' />
                    </div>
                    <div className="model-row">
                        <div className="model-name"> 联系电话：</div> <input placeholder='请输入11位手机号码' onFocus={this.clearinput.bind(this, 'phone')} onBlur={this.checkphone.bind(this)} className='model-input' ref='phone' />
                    </div>
                    <div className='model-spot'>本活动由正辰科技提供技术支持</div>
                    <button className='model-button' onClick={this.Applyinfo.bind(this)}>报名</button>
                </div>
            </div>
        );
    }
}

export default Modelapp;