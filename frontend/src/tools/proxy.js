import React, { Component } from 'react';
class Proxy extends Component {

    static get(url, callback, token) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (token != null) {
            xhr.setRequestHeader('Authorization', 'Bearer {' + token + '}');
            console.log(token);
        }
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var req_times = 0;
                    if (callback != null) {
                        callback(xhr.responseText,xhr.getAllResponseHeaders());
                        // console.log("=====错误数据========", xhr.responseText);
                    } else {
                        console.log("=====错误数据========", xhr.responseText);
                    }
                } else {
                    console.log("=====错误数据========", xhr.responseText);
                }
            }
        }
        console.log("get");
    }
    static post(url, callback, token) {
        var xhr = new XMLHttpRequest();
        xhr.open("post", url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (token != null) {
            xhr.setRequestHeader('Authorization', 'Bearer {' + token + '}');
            console.log(token);
        }
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var req_times = 0;
                    if (callback != null) {
                        callback(xhr.responseText);
                    } else {
                        console.log("=====错误数据========", xhr.responseText);
                    }
                } else {
                    console.log("=====错误数据========", xhr.responseText);
                }
            }
        }
        console.log("post");
    }
    static delete(url, callback, token) {
        var xhr = new XMLHttpRequest();
        xhr.open("delete", url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (token != null) {
            xhr.setRequestHeader('Authorization', 'Bearer {' + token + '}');
            console.log(token);
        }
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var req_times = 0;
                    if (callback != null) {
                        callback(xhr.responseText);
                    } else {
                        console.log("=====错误数据========", xhr.responseText);
                    }
                } else {
                    console.log("=====错误数据========", xhr.responseText);
                }
            }
        }
        console.log("post");
    }
}
export default Proxy;