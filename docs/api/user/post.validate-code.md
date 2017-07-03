# 用户 - 验证验证码

> 添加于@1.0.4
> 最后更新@1.1.0

## 基本信息

* 方法: `POST`
* 地址: `/api/user/validate-code`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式

## 请求 Body

字段     | 类型     | 必须     | 默认值  | 验证         | 说明
:------- | :------- | :------: | :------ | :----------- | :-------
`mobile` | `String` | √        |         | `/^\d{11}$/` | 手机号码
`code`   | `String` | √        |         | `/^\d{6}$/`  | 验证码

## 请求响应 Body

字段      | 类型     | 示例          | 说明
:-------- | :------- | :------------ | :----------------------------
`message` | `String` | `ok` 				 | 验证成功时该字段始终返回 `ok`
`mobile`  | `String` | `13055818112` | ***(仅测试)*** 手机号码
`code`    | `String` | `837491`      | ***(仅测试)*** 验证码

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                      | 说明
:----: | :--------------------------- |:------------------
`400`  |                              | 参数错误
`403`  | `invalid code`               | 错误的验证码
`404`  | `code is not sent to mobile` | 验证码未发送给手机
`500`  |                              | 服务器错误

## 示例

**请求**

```
POST /api/user/validate-code HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: b27c61c8-01e3-0243-4849-f16e39061c6c

{
	"mobile": "13055818112",
	"code": "833526"
}
```

**响应**

```json
{
    "message": "ok",
    "mobile": "13055818112",
    "code": "833526"
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md
