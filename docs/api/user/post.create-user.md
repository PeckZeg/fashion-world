# 用户 - 创建用户

## Base

* Method: `POST`
* URI: `/api/user`

## Headers

key            | value              | note
:------------- | :----------------- | :----
`Content-Type` | `application/json` |

## Request Body Schema

field      | type     | required | validate            | note
:--------- | :------- | :------- | :------------------ | :-------
`mobile`   | `string` | √        | `/^\d{11}/$`        | 手机号码
`password` | `string` | √        | MD5                 | 密码
`code`     | `string` | √        | `/^\d{6}/$`         | 验证码

## Response Body Schema

field  | type     | example | note
:----- | :------- | :------ | :-------------------------------
`user` | `object` | `-`     | 用户对象，参见 [User Model](../models/user.md)

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误
`403` | 服务器已经理解请求，但是拒绝执行它。例：用户已存在
`500` | 服务器错误。

## Example

**request**

```
POST /api/user HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 7a4cc18e-ef5c-bf6b-f08d-bfc0b0febc40

{
	"mobile": "13055818112",
	"password": "fe7d5d79226524b5b3f035ead02cf5dc",
	"code": "366379"
}
```

**response**

```json
{
  "user": {
    "mobile": "13055818112",
    "password": "fe7d5d79226524b5b3f035ead02cf5dc",
    "_id": "59224230bb63f03c92d4e107",
    "registerAt": 1495417392023,
    "createAt": 1495417392023,
    "gender": "secret"
  }
}
```
