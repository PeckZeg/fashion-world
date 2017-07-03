# 用户 - 登出

> 更新@1.1.0

## 基本信息

* 方法: `DELETE`
* 地址: `/api/user/logout`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## 请求 Body

无

## 请求响应 Body

字段      | 类型     | 示例 | 说明
:-------- | :------- | :--- | :----------------------------
`message` | `String` | `ok` | 登出成功后该字段固定返回 `ok`

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                 | 说明
:----: | :---------------------- |:----------------------
`400`  |                         | 参数错误、手机/密码错误
`400`  | `invalid authorization` | 错误的 authorization
`404`  | `apiKey not found`      | 用户未登录
`500`  |                         | 服务器错误

## 示例

**请求**

```
DELETE /api/user/logout HTTP/1.1
Host: localhost:3003
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Authorization: Caa dW5kZWZpbmVkOkNkdHFpVTVOa1JJSnNSbDkxVU5PczJETFBFaz0gMTQ5ODg3NjA3Mzg1Ng==
Cache-Control: no-cache
Postman-Token: 0ddcbc85-075f-8409-4021-0097d36a3bb7

------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**响应**

```json
{
    "message": "ok"
}
```

[user-model]: ../../models/user.md
[response-format]: ../../response-format.md
