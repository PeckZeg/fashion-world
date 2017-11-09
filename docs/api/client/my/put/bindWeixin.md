# 个人中心 - 绑定微信

## Base

* Method: `PUT`
* Path: `/api/my/bind-weixin`

## Headers

Key             | Value                 | Required | Note
:-------------- | :-------------------- | :------: | :--------------------
`Content-Type`  | `application/json`    | √        | 指定传输内容格式
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature]

* API Action: `client:my:upload-my-avatar`

## Body Params

```js
{
  // [必需] 微信访问令牌
  "accessToken": String,

  // [必需] 微信用户编号
  "openid": "osRutw7PUvFEstItTsd2Z7nchjPM",

  // [必需] 微信用户联合编号
  "unionid": "okGoa1vFQSIYULTYodGww1iVt1aw",

  // [必需] 用户编号
  "userId": "59573c395c2960da1aa83a08"
}
```

## Response Schema

```js
{
    "user": {
        // ...
    }
}
```

* [`User` 模型][user-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :----
`400`       | `invalid authorization` | 无效的验证信息
`400`       | `invalid signature`     | 无效的签名
`403`       | `user has related to weixin account` | 用户已经绑定了微信账号
`404`       | `apiKey not found`      | `apiKey` 未找到（登录过期）
`404`       | `user not found`        | 用户未找到

## Example

**Request**

```
PUT /api/my/bind-weixin HTTP/1.1
Host: localhost:3003
Authorization: Caa YkNXM1h3SzVFNHFKUjhyejU3ZUx0WTVvZ3FhMmV3a0VHbGtWdEVNemcvQT06U25qR1ZLazhrSGs4eXdTSC93WVRmeVNZYThrPSAxNTEwMTk5NDQzNTgw
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 77ee9d27-d78b-d0e3-600f-82a5464ebe79

{
  "accessToken": "Kspa9coCIPenEDL7YGOVP8pbiEIqs_YtrL3IZmxwVeixeVCO0sT4wvMjkMNltaIyoDDQIVZlqiQev-JBjpbxRw",
  "openid": "osRutw7PUvFEstItTsd2Z7nchjPM",
  "unionid": "okGoa1vFQSIYULTYodGww1iVt1aw",
  "userId": "59573c395c2960da1aa83a08"
}
```

**Response**

```json
{
    "user": {
        "_id": "59573c395c2960da1aa83a08",
        "registerAt": 1498889273883,
        "createAt": 1498889273883,
        "thirdParty": {
            "weixin": {
                "unionid": "okGoa1vFQSIYULTYodGww1iVt1aw",
                "openid": "osRutw7PUvFEstItTsd2Z7nchjPM"
            }
        },
        "avatar": "http://beta.images.fashionworldcn.com/user/59573c395c2960da1aa83a08/ca80b79960c48f1712b513f163541ff8036c71df.png",
        "gender": "secret",
        "name": "PeckZeg892"
    }
}
```

[signature]: ../../../../signature.md

[user-model]: ../../../../model/user.md
