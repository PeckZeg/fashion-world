# 个人中心 - 第三方账号注册

## Base

* Method: `POST`
* Path: `/api/my/register/third-party`

## Request Body Params

```js
{
  accessToken: String,                        // [必需] 微信访问令牌
  openid: String,                             // [必需] 微信用户开放编号
  unionid: String                             // [必需] 微信用户联合编号
}
```

## Response Schema

```js
{
    "user": {
      //  用户，参考下面模型
    }
}
```

* [`User` 模型][user-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :----
`500`       |                         | 服务端错误

## Example

**Request**

```
POST /api/my/register/third-party HTTP/1.1
Host: localhost:3003
Content-Type: application/json

{
	"accessToken": "5_f2QDEekesLHqy1YvdV0XOhHdl3TQiMGnJTiULlQ8V2X9fMa7ymIAfNdsGxLxF4wnFVXTFjMs317Hs8Ykf6en0Q",
	"openid": "osRutw7PUvFEstItTsd2Z7nchjPM",
	"unionid": "okGoa1vFQSIYULTYodGww1iVt1aw"
}
```

**Response**

```json
{
    "user": {
        "_id": "59b8d5b76cf25f5b8b975804",
        "registerAt": 1505285559307,
        "createAt": 1505285559307,
        "thirdParty": {
            "weixin": {
                "unionid": "okGoa1vFQSIYULTYodGww1iVt1aw",
                "openid": "osRutw7PUvFEstItTsd2Z7nchjPM"
            }
        },
        "avatar": "http://beta.images.fashionworldcn.com/7a9e0d940909d768037c3570d634f343fa1abe46.jpg",
        "gender": "male",
        "name": "PeckZeg"
    }
}
```

[signature]: ../../../../signature.md

[user-model]: ../../../../model/user.md
