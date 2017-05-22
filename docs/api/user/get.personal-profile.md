# 用户 - 个人资料

## Base

* Method: `GET`
* URI: `/api/user/personal-profile`

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |
`Authorization` | `Caa {Base64 String}` | Base64 验证

### Signature Authorization

* Action: `user:personal-profile`

关于算法请参见 [签名验证算法](../../signature-authorization.md)

## Request Body Schema

None

## Response Body Schema

field  | type     | example   | note
:----- | :------- | :-------- | :------------------------------------------------
`user` | `object` | `{ ... }` | 用户信息，参见 [User Model](../../models/user.md)

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误
`500` | 服务器错误

## Example

**request**

```
GET /api/user/personal HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa U3pnZ1U4ZGoyeGNlZ1hmWlZ4MXVjbS9oS2dyZThESWNrSFBveGtrbituMD06K1lReHhYYi9PVm5tblNURDhMUVJDWVUrZ29RPSAxNDk0OTA2MDQ3NjY4
Cache-Control: no-cache
Postman-Token: c4fc1d0c-312a-19e1-3d70-1ed53afbd100
```

**response**

```json
{
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
