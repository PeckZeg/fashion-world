# 用户 - 验证验证码

## Base

* Method: `POST`
* URI: `/api/user/validate-code`

## Headers

key            | value              | note
:------------- | :----------------- | :----
`Content-Type` | `application/json` |

## Request Body Schema

field      | type     | required | validate            | note
:--------- | :------- | :------- | :------------------ | :-------
`mobile`   | `string` | √        | `/^\d{11}/$`        | 手机号码
`code`     | `string` | √        | `/^\d{6}/$`         | 验证码

## Response Body Schema

**验证成功不会返回任何信息，仅 HTTP Status Code 为 `200`**

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误
`403` | 服务器已经理解请求，但是拒绝执行它。例：验证码错误
`500` | 服务器错误。

## Example

**request**

```
POST /api/user/validate-code HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: ac2ade48-5efa-a017-f40f-1be2d7a7398d

{
	"mobile": "13055818112",
	"code": "123212"
}
```

**response**

```json
{ }
```
