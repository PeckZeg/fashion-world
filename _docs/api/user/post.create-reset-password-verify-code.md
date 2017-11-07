# 用户 - 发送重置密码验证码
> 更新@1.1.0

## 基本信息

* 方法: `POST`
* 地址: `/api/user/reset-code`
## Headers

键              | 值                 | 必须     | 备注
:-------------- | :----------------- | :------: | :---------------------------
`Content-Type`  | `application/json` | √        | 指定内容传输类型为 JSON 格式

## 请求 Body

字段     | 类型     | 必须     | 默认值  | 验证         | 说明
:------- | :------- | :------: | :------ | :----------- | :-------
`mobile` | `String` | √        |         | `/^\d{11}/$` | 手机号码

## 请求响应 Body

字段       | 类型     | 示例            | 说明
:--------- | :------- | :-------------- | :-------------------------------
`message`  | `String` | `ok`            | 创建成功时该字段始终返回 `ok`
`expireIn` | `Date`   | `1495417243356` | 失效时间，在此日期之前验证码有效
`code`     | `String` | `710502`        | ***(仅测试)*** 验证码

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                                      | 说明
:----: | :------------------------------------------- |:----------------------
`400`  |                                              | 参数错误、手机/密码错误
`403`  | `code has been sent`                         | 验证码已发送
`403`  | `mobile ${mobile} has reached the max times` | 手机 `mobile` 已达到最大发送次数
`500`  |                                              | 服务器错误

## 示例

**请求**

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

**响应**

```json
{
  "expireIn": 1495417243356,
  "code": "710502"
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md
