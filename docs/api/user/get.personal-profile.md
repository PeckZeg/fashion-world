# 用户 - 获取当前登录用户详情

> 更新@1.1.0

## 基本信息

* 方法: `GET`
* 地址: `/api/user/personal`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## 请求 Body

无

## 请求响应 Body

字段   | 类型     | 示例      | 说明
:----- | :------- | :-------- | :---------------------------------
`user` | `Object` | `{ ... }` | 当前登录的 [用户][user-model] 信息

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                 | 说明
:----: | :---------------------- |:----------------------
`400`  |                         | 参数错误、手机/密码错误
`400`  | `invalid authorization` | 错误的 authorization
`404`  | `apiKey not found`      | 用户未登录
`404`  | `user not found`        | 用户未找到
`500`  |                         | 服务器错误

## 示例

**请求**

```
GET /api/user/personal HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa UWo1WHUxam9IaS9LeFd1TFkvemVvTU1NQzlVeks0a0V0UCtDWWlRZWVvcz06Vi9NTzczQ2FBbWQveXpXK1h3TzRraGQ2MlRJPSAxNDk4ODc2NjUwODUx
Cache-Control: no-cache
Postman-Token: 14fde30a-8adf-4109-a412-868e03e7cbae
```

**响应**

```json
{
    "user": {
        "_id": "5955aa485c2960da1aa81b9a",
        "mobile": "13055818112",
        "registerAt": 1498786376126,
        "createAt": 1498786376126,
        "gender": "male",
        "name": "PeckZeg",
        "avatarUrl": null
    }
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[user-model]: ../../models/user.md
