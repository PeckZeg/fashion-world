# 个人中心 - 使用微信登录

## Base

* Method: `POST`
* Path: `/api/my/weixin-login`

## Body Params

```js
{
  "accessToken": String,
  "openid": String,
  "unionid": String
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
POST /api/my/weixin-login HTTP/1.1
Accept: application/json, */*
Content-Type: application/json

{
	"accessToken": "5_gQkSkOVZj2u2N0oISvhXUcWfOZCJAuF2Ji6rOhtr_IKd970zvpPXAeYMoBp_2cXgDXoTUMGf2qc1UutQ87zQ",
  	"openid": "osRutw7PUvFEstItTsd2Z7nchjPM",
  	"unionid": "okGoa1vFQSIYULTYodGww1iVt1aw"
}
```

**Response**

```json
{
  "apiKey": "bCW3XwK5E4qJR8rz57eLtY5ogqa2ewkEGlkVtEMzg/A=",
  "secretKey": "RkWB1kD2ZaZvyfe2EBwFIF93bHyBTeFx2lPz6/Tm3dM=",
  "userId": "59573c395c2960da1aa83a08",
  "expireIn": 1510303754364,
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
