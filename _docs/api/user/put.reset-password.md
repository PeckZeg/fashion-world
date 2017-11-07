# 用户 - 重置用户密码

> 更新@1.1.0

## 基本信息

* 基本信息: `PUT`
* 地址: `/api/user/reset-password`

## Headers

键              | 值                 | 必须     | 备注
:-------------- | :----------------- | :------: | :---------------------------
`Content-Type`  | `application/json` | √        | 指定内容传输类型为 JSON 格式

## 请求 Body

字段       | 类型     | 必须     | 默认值  | 验证               | 说明
:--------- | :------- | :------: | :------ | :----------------- | :-------
`mobile`   | `string` | √        |         | `/^\d{11}/$`       | 手机号码
`password` | `string` | √        |         | `/^[a-f0-9]{32}$/` | 密码
`code`     | `string` | √        |         | `/^\d{6}/$`        | 验证码

## 请求响应 Body

字段   | 类型     | 示例      | 说明
:----- | :------- | :-------- | :-----------------
`user` | `Object` | `{ ... }` | [用户][user-model]

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                      | 说明
:----: | :--------------------------- |:----------------------
`400`  |                              | 参数错误、手机/密码错误
`403`  | `user is exists`             | 用户已存在
`403`  | `invalid code`               | 错误的验证码
`404`  | `code is not sent to mobile` | 验证码未发送
`500`  |                              | 服务器错误

## 示例

**请求**

```
POST /api/user HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 7a4cc18e-ef5c-bf6b-f08d-bfc0b0febc40

{
	"mobile": "13055818112",
	"password": "fe7d5d79226524b5b3f035ead02cf5dc",
	"code": "366379"
}
```

**响应**

```json
{
    "user": {
        "mobile": "13055818112",
        "_id": "59573bdf4832cb0ed0d22ede",
        "registerAt": 1498889183365,
        "createAt": 1498889183365,
        "gender": "secret",
        "name": "用户8112",
        "avatarUrl": null
    }
}
```


[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[user-model]: ../../models/user.md
