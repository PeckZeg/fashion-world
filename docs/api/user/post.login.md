# 用户 - 登录（手机号、密码）

## Base

* Method: `POST`
* URI: `/api/user/login`

## Headers

key            | value              | note
:------------- | :----------------- | :----
`Content-Type` | `application/json` |

## Request Body Schema

field      | type     | required | validate            | note
:--------- | :------- | :------- | :------------------ | :-------
`mobile`   | `string` | √        | `/\d{11}/`          | 手机号码
`password` | `string` | √        | `/^[a-f0-9]{32}$/i` | 密码，使用 MD5 加密

## Response Body Schema

field       | type     | example                                         | note
:---------- | :------- | :---------------------------------------------- | :----
`apiKey`    | `string` | `X09Tl6HCKUf/scMLu6vy8kv9w+ppUaxJMyiaQn2kW2Q=`  | 用户 apiKey
`secretKey` | `string` | `pNDwncIirSD5T+7IZ+2jOEry/UKX5ab8HwLhjcYtGSk="` | 用户 secretKey
`userId`    | `string` | `591961f92924bf503e10c948`                      | 用户编号
`expiresIn` | `number` | `1494922184252`                                 | `apiKey` 和 `secretKey` 过期时间
`user`      | `object` | `-`                                             | 用户信息，参见 [User Model](../../models/user.md)

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误、手机/密码错误
`500` | 服务器错误

## Example

**request**

```
POST /api/user/login HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: f0de7c34-015f-6614-6124-b6d13d58da84

{
	"mobile": "13055818112",
	"password": "fe7d5d79226524b5b3f035ead02cf5dc"
}
```

**response**

```json
{
    "apiKey": "X09Tl6HCKUf/scMLu6vy8kv9w+ppUaxJMyiaQn2kW2Q=",
    "secretKey": "pNDwncIirSD5T+7IZ+2jOEry/UKX5ab8HwLhjcYtGSk=",
    "userId": "591961f92924bf503e10c948",
    "expiresIn": 1494922184252,
    "user": {
        "_id": "591961f92924bf503e10c948",
        "name": "PeckZeg",
        "password": "fe7d5d79226524b5b3f035ead02cf5dc",
        "gender": 1,
        "mobile": "13055818112",
        "registerAt": 1494835705990,
        "createAt": 1494835705990
    }
}
```
