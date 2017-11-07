# 七牛 - 获取上传令牌

## Base

* Method: `GET`
* Path: `/api/qiniu/upload-token`

## Headers

Key             | Value                 | Required | Note
:-------------- | :-------------------- | :------: | :--------------------
`Authorization` | `Caa ${Base64String}` |          | [用户签名][signature]

* API Action: `qiniu:get:fetch-upload-token`

## Query Params

None

## Response Schema

```js
{
  "key": String,                            // 文件存储位置
  "uploadToken": String                     // 上传令牌
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
GET /api/qiniu/upload-token HTTP/1.1
Host: localhost:3003
Authorization: Caa NHRIVStDbFpKM01LQmVEeHBvRHFGbWV0ZWd1Q0EyeUxleGNYbnF1VEpMcz06QUVGcDV0Z1UvOEdQWXdiZjVJSXlvWW40c1ZBPSAxNTEwMDM5MjM5MTkw
Cache-Control: no-cache
Postman-Token: 77dd9472-5c34-5366-f283-a61fc7f3f3ea
```

**Response**

```json
{
    "key": "tmp/29d5423da3df7ea8f5919616da06c809e1ed8232",
    "uploadToken": "h3sRxoNfjw62VIxf9CdKFQ_DjCq3mUzWsEeHN20i:f8LdBqqccSCFDtOJY4bJf6BpmUw=:eyJtaW1lTGltaXQiOiJpbWFnZS9qcGVnO2ltYWdlL3BuZyIsInNjb3BlIjoiZnctYmV0YS1pbWFnZXM6dG1wLzI5ZDU0MjNkYTNkZjdlYThmNTkxOTYxNmRhMDZjODA5ZTFlZDgyMzIiLCJkZWFkbGluZSI6MTUxMDA0MjgzOX0="
}
```

[signature]: ../../../../signature.md
