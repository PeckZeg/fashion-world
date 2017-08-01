# 用户 - 获取用户详情

## Base

* 方法: `GET`
* 地址: `/api/user/:user-id`

### Location Params

键        | 类型       | 示例                       | 说明
:-------- | :--------- | :------------------------- | :-------
`user-id` | `ObjectId` | `59294dbfddf001b5dae39a74` | 用户编号

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` |          | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## Query Params

None

## Response Body

字段   | 类型     | 示例      | 说明
:----- | :------- | :-------- | :-----------------
`user` | `Object` | `{ ... }` | [用户][user-model]

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
GET /api/user/59573c415c2960da1aa83a33 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa QzJVK1hXUzRmUEUxUDFzWWRpRU5peDNlUEU4TWpXb3VVcFFCaGdzdG1IOD06OWZpbFh2WjhOVmtzQW9zbkpNUXNyUzNoMy9NPSAxNTAxNTY5MDkyMTc1
Cache-Control: no-cache
Postman-Token: 27b842ac-1b38-73d3-1ea1-196a500d42b4
```

**响应**

```json
{
    "user": {
        "_id": "59573c415c2960da1aa83a33",
        "registerAt": 1498889281353,
        "createAt": 1498889281353,
        "gender": "secret",
        "name": "Michael",
        "avatar": "http://59.57.240.50:5052/static/images/avatar/default/256x256.png",
        "favourites": 0,
        "collections": 0
    }
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[user-model]: ../../models/user.md
