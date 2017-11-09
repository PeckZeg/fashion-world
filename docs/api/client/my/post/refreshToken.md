# 个人中心 - 刷新令牌

## Base

* Method: `POST`
* Path: `/api/my/refresh-token`

## Headers

Key             | Value                 | Required | Note
:-------------- | :-------------------- | :------: | :--------------------
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature]

* API Action: `client:my:refresh-token`

## Response Schema

```js
{
    "apiKey": String,                       // apiKey
    "secretKey": String,                    // secretKey
    "userId": String,                       // 用户编号
    "expireIn": Number,                     // 有效时间
    "user": {                               // 用户模型，参见下方文档链接
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
`404`       | `apiKey not found`      | `apiKey` 未找到（登录过期）
`404`       | `user not found`        | 用户未找到

## Example

**Request**

```
POST /api/my/refresh-token HTTP/1.1
Host: localhost:3003
Authorization: Caa N1QrTys5S01TbW0vL1Qrbi9yYlJrbkYxNzlFU3VaTGVTUXc0Ky96OHQ2ND06UytxZHBrbmZBS0l3WGY0YWFxdWNxd1Nsb1NzPSAxNTEwMjEzODcyMDcw
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
Postman-Token: 458c0b56-082b-3345-2666-ffefc0e5dd17
```

**Response**

```json
{
    "apiKey": "/Im2a4gP7L22WUF27es7qPH0iy677Kh5aSb0CpjX4mw=",
    "secretKey": "G/ZPL3qmC9cdIqmtzj+QtoQsLnON/mQjEsZgbnlIF34=",
    "userId": "59573c395c2960da1aa83a08",
    "expireIn": 1510473072121,
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
