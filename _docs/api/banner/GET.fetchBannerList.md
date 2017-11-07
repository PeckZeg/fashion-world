# 横幅 - 获取横幅列表

## Base

* Method: `GET`
* URI: `/api/banner`

## Headers

键             | 值                 | 必须 | 备注
:------------- | :----------------- | :--: | :---------------------------
`Content-Type` | `application/json` | √    | 指定内容传输类型为 JSON 格式

签名动作参见 [Signature Actions][signature-actions]

## Request Query Schema

键           | 类型       | 必需 | 默认值 | 验证        | 说明
:----------- | :--------- | :--: | :----- | :---------- | :-----------
`offset`     | `Number`   |      | `0`    | 最小值: `0` | 页面偏移
`limit`      | `Number`   |      | `20`   | 最小值: `0` | 每页限制
`type`       | `String`   |      |        |             | 值类型，参见下面类型值表
`channelId`  | `ObjectId` |      |        |             | 频道编号
`categoryId` | `ObjectId` |      |        |             | 分类编号

### `type` 取值

value                | note
:------------------- | :-----------------
`url`                | 跳转一个 URL
`goto:video-profile` | 跳转至一个视频详情

## Response Body

字段      | 类型       | 示例        | 说明
:-------- | :--------- | :---------- | :------------------------
`banners` | `Object[]` | `[{ ... }]` | [横幅][banner-model] 列表

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                 | 说明
:----: | :---------------------- |:---------------------------
`400`  |                         | 参数错误
`400`  | `invalid authorization` | 错误的 authorization header
`404`  | `apiKey not found`      | 用户未登录
`404`  | `video not found`       | 视频未找到
`500`  |                         | 服务器错误

## 示例

**请求**

```
GET /api/banner?channelId=5923d5a2afa4194436827737&amp;type=url HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 22fcf15e-92cb-5e75-a854-7bb8a9f12c17
```

**响应**

```json
{
    "banners": [
        {
            "_id": "5983ee938ea40b0ce07cfcde",
            "channelId": "5923d5a2afa4194436827737",
            "createAt": 1501818515528,
            "publishAt": 1500582103445,
            "cover": "http://59.57.240.50:5052/static/images/2bee46c18fa10cf0a599c28da73fa53acb113d3d.jpg",
            "value": "http://www.qq.com/",
            "type": "url",
            "title": "美受争法支式体红矿白军论消了且",
            "channel": {
                "_id": "5923d5a2afa4194436827737",
                "name": "Fashion One",
                "removeBy": null,
                "createAt": 1499053348232,
                "publishAt": 1492135186038,
                "priority": 3
            }
        },
        {
            "_id": "5983eebb9302e10d8956c513",
            "channelId": "5923d5a2afa4194436827737",
            "createAt": 1501818555220,
            "publishAt": 1501074240981,
            "cover": "http://59.57.240.50:5052/static/images/4795f40c59a0492e296b95c7376a4397c869c1c8.jpg",
            "value": "https://www.baidu.com/",
            "type": "url",
            "title": "华形社象阶包么政下也或根因满行感查信己个志动便立比清光众写五装民",
            "channel": {
                "_id": "5923d5a2afa4194436827737",
                "name": "Fashion One",
                "removeBy": null,
                "createAt": 1499053348232,
                "publishAt": 1492135186038,
                "priority": 3
            }
        }
    ]
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[banner-model]: ../../models/banner.md
