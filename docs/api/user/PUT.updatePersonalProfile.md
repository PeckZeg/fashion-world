# 用户 - 更新当前用户信息

## Base

* 方法: `PUT`
* 地址: `/api/user/personal`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## Query Params

字段     | 类型     | 必须     | 默认值 | 验证 | 说明
:------- | :------- | :------: | :----- | :--- | :------------------
`name`   | `String` |          |        |      | 名称
`gender` | `String` |          |        |      | 性别，参见 [用户模型][UserModel]

## Response Body

字段   | 类型     | 示例      | 说明
:----- | :------- | :-------- | :-------------------------
`user` | `Object` | `{ ... }` | 更新后的 [用户][UserModel]

## 错误状态码

[请求返回结果][ResponseFormat] 说明。

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
PUT /api/user/personal HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa {{USER_AUTHORIZATION}}
Cache-Control: no-cache
Postman-Token: 5edb7ec4-ae18-c7dd-9057-f4f36a9c3d43

{
	"name": "PeckZeg645",
	"gender": "male"
}
```

**响应**

```json
{
    "user": {
        "_id": "59573c395c2960da1aa83a08",
        "registerAt": 1498889273883,
        "createAt": 1498889273883,
        "gender": "unknown",
        "name": "PeckZeg285",
        "avatar": "http://59.57.240.50:5052/static/images/avatar/default/256x256.png"
    }
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[ResponseFormat]: ../../response-format.md

[UserModel]: ../../models/user.md
