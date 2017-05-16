# 用户 - 登出

## Base

* Method: `DELETE`
* URI: `/api/user/logout`

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |
`Authorization` | `Caa {Base64 String}` | Base64 验证

### Signature Authorization

* Action: `user:logout`

关于算法请参见 [签名验证算法](../../signature-authorization.md)

## Request Body Schema

None

## Response Body Schema

field    | type     | example   | note
:------- | :------- | :-------- | :---
`result` | `string` | `ok`      | 结果

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误、手机/密码错误
`500` | 服务器错误

## Example

**request**

```
DELETE /api/user/logout HTTP/1.1
Host: localhost:3003
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Authorization: Caa bUNVQTN0R2h5VDdJdThvV2kvbWhNT3JhOXlGR0hRRW4zeDZNQWg1S0E0ND06WFNaQWxnclNPWXpuVmlpN3M2S0s0OS9OR2RzPSAxNDk0OTA1MTIxNTU2
Cache-Control: no-cache
Postman-Token: 043fa436-cd69-d6e6-3622-aee61c243e67

------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**response**

```json
{
  "result": "ok"
}
```
