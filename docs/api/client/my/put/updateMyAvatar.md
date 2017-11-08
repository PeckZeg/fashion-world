# 个人中心 - 更新我的头像

## Base

* Method: `PUT`
* Path: `/api/my/avatar`

## Headers

Key             | Value                 | Required | Note
:-------------- | :-------------------- | :------: | :--------------------
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature]

* API Action: `client:my:upload-my-avatar`

## Body Params

```js
{
  // [必需] 头像，存储在七牛云上的 `key`
  avatar: String
}
```

关于上传图片至七牛云，请参照 [该文档][upload-to-qiniu]

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
PUT /api/my/avatar HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa YkNXM1h3SzVFNHFKUjhyejU3ZUx0WTVvZ3FhMmV3a0VHbGtWdEVNemcvQT06eExCcW9XMXZFN010VVdBZXZzVGhvQWlLckRVPSAxNTEwMTA2ODUyMjQ0
Cache-Control: no-cache
Postman-Token: 601d6618-70ee-6c68-1eea-66ba22c4a999

{
  "avatar": "user/59573c395c2960da1aa83a08/ca80b79960c48f1712b513f163541ff8036c71df.png"
}
```

**Response**

```json
{
    "user": {
        "_id": "59573c395c2960da1aa83a08",
        "registerAt": 1498889273883,
        "createAt": 1498889273883,
        "avatar": "http://beta.images.fashionworldcn.com/user/59573c395c2960da1aa83a08/ca80b79960c48f1712b513f163541ff8036c71df.png",
        "gender": "secret",
        "name": "PeckZeg892"
    }
}
```

[signature]: ../../../../signature.md
[upload-to-qiniu]: ../../../../upload-to-qiniu.md

[user-model]: ../../../../model/user.md
