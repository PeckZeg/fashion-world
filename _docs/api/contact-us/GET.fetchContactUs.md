# 联系方式 - 获取联系方式

## Base

* 方法: `GET`
* 地址: `/api/contact-us`

## Headers

键             | 值                 | 必须 | 备注
:------------- | :----------------- | :--: | :---------------------------
`Content-Type` | `application/json` | √    | 指定内容传输类型为 JSON 格式

签名动作参见 [Signature Actions][signature-actions]

## Query Params

None

## Response Body

字段          | 类型     | 示例               | 说明
:------------ | :------- | :----------------- | :-------
`weibo`       | `String` | `peckzeg`          | 新浪微博
`qq`          | `String` | `173095474`        | QQ
`bisMail`     | `String` | `example@mail.com` | 商务邮箱
`serviceMail` | `String` | `example@mail.com` | 客服邮箱

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
GET /api/contact-us HTTP/1.1
Host: localhost:3003
Cache-Control: no-cache
Postman-Token: 24149b12-c1d1-3b79-6b09-77e9c9d60ffd
```

**响应**

```json
{
    "weibo": null,
    "qq": null,
    "bisMail": null,
    "serviceMail": null
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md
