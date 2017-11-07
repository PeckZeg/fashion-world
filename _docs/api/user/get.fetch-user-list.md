# 用户 - 获取用户列表

## Base

* 方法: `GET`
* 地址: `/api/user`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` |          | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## Query Params

字段          | 类型       | 必须     | 默认值  | 验证 | 说明
:------------ | :--------- | :------: | :------ | :--- | :------------------
`offset`      | `Number`   |          | `0`     |      | 页面偏移量
`limit`       | `Number`   |          | `20`    |      | 每页限制

## Response Body

字段     | 类型       | 示例        | 说明
:------- | :--------- | :---------- | :-------------------------------
`users` | `Object[]` | `[{ ... }]` | [用户][user-model] 列表

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                 | 说明
:----: | :---------------------- |:---------------------------
`400`  |                         | 参数错误
`400`  | `invalid authorization` | 错误的 authorization header
`404`  | `apiKey not found`      | 用户未登录
`500`  |                         | 服务器错误

## 示例

**请求**

```
GET /api/user HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa QzJVK1hXUzRmUEUxUDFzWWRpRU5peDNlUEU4TWpXb3VVcFFCaGdzdG1IOD06V1lMMUY3a2hYUk5BMGlJS1F2S2FoOTI2WStZPSAxNTAxNDg2NDc5NjE5
Cache-Control: no-cache
Postman-Token: 2d155758-c0cc-4bfb-27d1-f8c817ea15b0
```

**响应**

```json
{
    "users": [
        {
            "_id": "59573c415c2960da1aa83c09",
            "mobile": "98635233618",
            "registerAt": 1498889281566,
            "createAt": 1498889281566,
            "gender": "secret",
            "name": "Kimberly",
            "avatarUrl": null,
            "favourites": 0,
            "collections": 0
        }
    ]
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[user-model]: ../../models/user.md
