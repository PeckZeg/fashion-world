# 用户 - 上传登录用户头像

## Base

* 方法: `POST`
* 地址: `/api/user/personal/avatar`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `multipart/form-data` |          | 支持 FormData `multipart/form-data` 传输
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][SignatureAuthorization]

签名动作参见 [Signature Actions][SignatureActions]

## Request Form Data Field

当使用 `multipart/form-data` 时，域需要指定为 `avatar`

## Response Body

字段     | 类型       | 示例        | 说明
:------- | :--------- | :---------- | :-------------------------------
`user` | `Object` | `{ ... }` | 更新封面后的 [用户][UserModel]

## 错误状态码

[请求返回结果][ResponseFormat] 说明。

状态码 | message                 | 说明
:----: | :---------------------- |:---------------------------
`400`  |                         | 参数错误
`400`  | `invalid authorization` | 错误的 authorization header
`404`  | `apiKey not found`      | 用户未登录
`404`  | `video not found`       | 视频未找到
`500`  |                         | 服务器错误

[SignatureAuthorization]: ../../signature-authorization.md
[SignatureActions]: ../../actions.md
[ResponseFormat]: ../../response-format.md

[UserModel]: ../../models/user.md
