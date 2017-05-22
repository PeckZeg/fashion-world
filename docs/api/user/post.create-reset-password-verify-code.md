# 用户 - 发送重置密码验证码

## Base

* Method: `POST`
* URI: `/api/user/reset-code`

## Headers

key            | value              | note
:------------- | :----------------- | :----
`Content-Type` | `application/json` |

## Request Body Schema

field      | type     | required | validate            | note
:--------- | :------- | :------- | :------------------ | :-------
`mobile`   | `string` | √        | `/^\d{11}/$`        | 手机号码

## Response Body Schema

field      | type     | example         | note
:--------- | :------- | :-------------- | :-------------------------------
`expireIn` | `number` | `1495417243356` | 失效时间，在此日期之前验证码有效
`code`     | `string` | `710502`        | **仅在测试环境存在** 验证码

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误
`403` | 服务器已经理解请求，但是拒绝执行它。例：短信发送次数已达上限
`500` | 服务器错误。

## Example

**request**

```
POST /api/user/reset-code HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: cbec3e09-cd2e-ea88-5d61-4a285b2c62aa

{
	"mobile": "13055818112"
}
```

**response**

```json
{
  "expireIn": 1495417243356,
  "code": "710502"
}
```
