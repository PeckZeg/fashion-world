# 个人中心 - 验证注册验证码

## Base

* Method: `POST`
* Path: `/api/my/validate-register-code`

## Request Body Params

```js
{
  // [必需] 手机号码
  mobile: String,

  // [必需] 验证码
  code: String
}
```

## Response Schema

```js
{
    "mobile": String,                       //  [仅在非生产环境] 手机号码
    "code": String,                         //  [仅在非生产环境] 验证码
    "validateCode": String,                 //  [仅在非生产环境] 真 · 验证码
    "message": "ok"                         //  消息
}
```

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :----
`403`       | `invalid code`          | 无效的验证码
`404`       | `code is not sent`      | 验证码未发送

## Example

**Request**

```
POST /api/my/validate-register-code HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 90426acb-fb17-ec5a-c65f-a9bdb8b15cb8

{
  "mobile": "13055818112",
  "code": "464421"
}
```

**Response**

```json
{
    "message": "ok",
    "mobile": "13055818112",
    "code": "464421",
    "validateCode": "464421"
}
```

[signature]: ../../../../signature.md

[user-model]: ../../../../model/user.md
