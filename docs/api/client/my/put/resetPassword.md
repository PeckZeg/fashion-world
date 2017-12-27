# 个人中心 - 重置用户密码

## Base

* Method: `PUT`
* Path: `/api/my/reset-password`

## Request Body Params

```js
{
  // [必需] 手机号码
  mobile: String,

  // [必需] 密码，使用 MD5 加密
  password: String,

  // [必需] 验证码
  code: String
}
```

## Response Schema

```js
{
    "user": {                               //  用户，参考下面模型
      // ...
    }
}
```

* [`User` 模型][user-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :----
`403`       | `invalid code`          | 无效的验证码
`403`       | `user exists`           | 用户已存在
`404`       | `code is not sent`      | 验证码未发送

## Example

**Request**

```
PUT /api/my/reset-password HTTP/1.1
Host: localhost:3003
Content-Type: application/json

{
  "mobile": "13055818112",
  "password": "fe7d5d79226524b5b3f035ead02cf5dc",
  "code": "897485"
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
        "name": "用户 8112"
    }
}
```

[signature]: ../../../../signature.md

[user-model]: ../../../../model/user.md
