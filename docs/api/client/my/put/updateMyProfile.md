# 个人中心 - 更新我的资料

## Base

* Method: `PUT`
* Path: `/api/my`

## Headers

Key             | Value                 | Required | Note
:-------------- | :-------------------- | :------: | :--------------------
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature]

* API Action: `client:my:update-my-profile`

## Body Params

```js
{
  // 昵称，3 ~ 16 个字符
  name: String,

  // 性别，限定字符串 - unknown, secret, male, female
  gender: String
}
```

## Response Schema

```js
{
    "user": {                       // 用户模型，参见文档
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
PUT /api/my HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa YkNXM1h3SzVFNHFKUjhyejU3ZUx0WTVvZ3FhMmV3a0VHbGtWdEVNemcvQT06MVNQajdVL1o5aDc0Q0ZzVWU5bnpqZDE5VmtnPSAxNTEwMDQ2MDc1OTgx
Cache-Control: no-cache
Postman-Token: aa8a83f4-2ae0-c0cd-fee0-2e6fa5b6fa7a

{
  "name": "PeckZeg374"
}
```

**Response**

```json
{
    "user": {
        "_id": "59573c395c2960da1aa83a08",
        "registerAt": 1498889273883,
        "createAt": 1498889273883,
        "avatar": "http://beta.images.fashionworldcn.com/default-avatar.png",
        "gender": "secret",
        "name": "PeckZeg474"
    }
}
```

[signature]: ../../../../signature.md

[user-model]: ../../../../model/user.md
