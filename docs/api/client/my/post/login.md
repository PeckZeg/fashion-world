# 个人中心 - 登录我的账号

## Base

* Method: `POST`
* Path: `/api/my/login`

## Headers

None

## Body Params

```js
{
  "mobile": String,                         // 手机号码
  "password": String                        // 密码
}
```

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
`404`       | `user not found`        | 用户未找到

## Example

**Request**

```
POST /api/my/login HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 7a9bdbc0-23a4-0b04-d592-81070ea41005

{
  "mobile": "13055818112",
  "password": "fe7d5d79226524b5b3f035ead02cf5dc"
}
```

**Response**

```json
{
    "apiKey": "4tHU+ClZJ3MKBeDxpoDqFmeteguCA2yLexcXnquTJLs=",
    "secretKey": "noji0kKwTD7t2LiJntADanFLjSI1zwJh7NBRbaBeJ0k=",
    "userId": "59573c395c2960da1aa83a08",
    "expireIn": 1510297873367,
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
