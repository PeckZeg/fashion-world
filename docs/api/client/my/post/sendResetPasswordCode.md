# 个人中心 - 发送重置密码验证码

## Base

* Method: `POST`
* Path: `/api/my/send-reset-password-code`

## Request Body Params

```js
{
  // [必需] 手机号码
  mobile: String
}
```

## Response Schema

```js
{
    "mobile": String,                       //  手机号码
    "expireIn": Number,                     //  过期时间
    "code": String                          //  [仅在非生产环境] 验证码
}
```

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :----
`400`       | `invalid authorization` | 无效的验证信息
`400`       | `invalid signature`     | 无效的签名
`403`       | `code has been sent`    | 验证已发送
`403`       | `mobile has reached the max times` | 手机已达最大发送次数

## Example

**Request**

```
POST /api/my/send-reset-password-code HTTP/1.1
Host: localhost:3003
Content-Type: application/json

{
  "mobile": "13055818112"
}
```

**Response**

```json
{
    "mobile": "13055818112",
    "expireIn": 1510294914675,
    "code": "814715"
}
```

[signature]: ../../../../signature.md

[user-model]: ../../../../model/user.md
