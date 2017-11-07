# 用户 - 刷新验证 keys

> 更新@1.1.0

## 基本信息

* 方法: `POST`
* 地址: `/api/user/refresh-keys`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## 请求 Body

无

## 请求响应 Body

字段        | 类型     | 示例                                            | 说明
:---------- | :------- | :---------------------------------------------- | :-------------------------------
`apiKey`    | `String` | `X09Tl6HCKUf/scMLu6vy8kv9w+ppUaxJMyiaQn2kW2Q=`  | 用户 apiKey
`secretKey` | `String` | `pNDwncIirSD5T+7IZ+2jOEry/UKX5ab8HwLhjcYtGSk="` | 用户 secretKey
`userId`    | `String` | `591961f92924bf503e10c948`                      | 用户编号
`expiresIn` | `Date`   | `1494922184252`                                 | `apiKey` 和 `secretKey` 过期时间
`user`      | `Object` | `{ ... }`                                       | 登录的 [用户][user-model]

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                 | 说明
:----: | :---------------------- |:----------------------
`400`  |                         | 参数错误、手机/密码错误
`400`  | `invalid authorization` | 错误的 authorization
`404`  | `apiKey not found`      | 用户未登录
`404`  | `video not found`       | 视频未找到
`500`  |                         | 服务器错误

## 示例

**请求**

```
POST /api/user/refresh-keys HTTP/1.1
Host: localhost:3003
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Authorization: Caa YTQzTk1VcVNqR2NNQTYrbGUrRUNYbWg2cGFpVnlpK01LYjNEcGN2ZVkvMD06V2FnSm80QjlWSWVPL0kxbFE0TlZvU3diNm5FPSAxNDk4ODE2NjM1NDk3
Cache-Control: no-cache
Postman-Token: cd78599b-3c20-fa91-20ab-08d0a8c60858

------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**响应**

```json
{
    "apiKey": "+DC2X19jzWMxb4lH5F+BhirybdXO8XZR7S/U5fdBO00=",
    "secretKey": "JAhTWuZAbnnaf1j/EUqGPSx+yzTDQGXKA+oZmVDe/QY=",
    "userId": "5955aa485c2960da1aa81b9a",
    "expireIn": 1499075835559,
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
