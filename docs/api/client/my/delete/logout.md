# 个人中心 - 登出

## Base

* Method: `DELETE`
* Path: `/api/my/logout`

## Headers

## Headers

Key             | Value                 | Required | Note
:-------------- | :-------------------- | :------: | :--------------------
`Authorization` | `Caa ${Base64String}` |          | [用户签名][signature]

* API Action: `client:my:logout`

## Body Params

None

## Response Schema

```js
{
    "message": "ok"
}
```

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :----
`400`       | `invalid authorization` | 无效的验证信息
`400`       | `invalid signature`     | 无效的签名
`404`       | `apiKey not found`      | `apiKey` 未找到（登录过期）

## Example

**Request**

```
DELETE /api/my/logout HTTP/1.1
Host: localhost:3003
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Authorization: Caa NHRIVStDbFpKM01LQmVEeHBvRHFGbWV0ZWd1Q0EyeUxleGNYbnF1VEpMcz06NjZUaXNYcVlUdEh5SFZjNzlKU2hkdWRsRVJRPSAxNTEwMDQxODQyODk0
Cache-Control: no-cache
Postman-Token: f1a7c824-d27a-23e4-c801-95312b5bf9fd

------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**Response**

```json
{
    "message": "ok"
}
```

[signature]: ../../../../signature.md
