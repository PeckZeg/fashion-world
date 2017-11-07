# 用户 - 删除登录用户收藏视频

## 基本信息

* 方法: `DELETE`
* 地址: `/api/user/personal/collected-videos`

## Headers

键              | 值                 | 必须 | 备注
:-------------- | :----------------- | :--: | :---------------------------
`Content-Type`  | `application/json` |      | 当请求 body 存在时，该选项必填
`Authorization` | `Caa ${String}`    | √    | [用户签名][SignatureAuthorization]

签名动作参见 [Signature Actions][SignatureActions]

## 请求 Body

字段       | 类型       | 必须 | 默认值 | 验证         | 说明
:--------- | :--------- | :--: | :----- | :----------- | :---------------------------------------
`videoIds` | `Object[]` |      |        |              | 待删除的视频编号列表，不传该参数表示清空

## 请求响应 Body

字段      | 类型     | 示例 | 说明
:-------- | :------- | :--- | :----------------------
`message` | `String` | `ok` | 操作成功时始终返回 `ok`

## 错误状态码

[请求返回结果][ResponseFormat] 说明。

状态码 | message                                      | 说明
:----: | :------------------------------------------- |:----------------------
`400`  |                                              | 参数错误、手机/密码错误
`403`  | `code has been sent`                         | 验证码已发送
`403`  | `mobile ${mobile} has reached the max times` | 手机 `mobile` 已达到最大发送次数
`500`  |                                              | 服务器错误

## Example

**Request**

```
DELETE /api/user/personal/favourite-videos HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa bXlaaCsydGwxd0RuWWpvNzV6YWE0LzRWTDAxeFVaMGxuQmtnRVNpY3ArND06MG00MlRPaW5PblJBTnJPdmpXSERqYWgrQ1JJPSAxNTAyNzY3NzQ2NjU4
Cache-Control: no-cache
Postman-Token: 17c4cf1e-f396-fd48-8099-1a0ccb765b2d

{
	"videoIds": [
		"597b069997c46c20f10a4713",
		"597b069997c46c20f10a470f"
	]
}
```

**Response**

```json
{
    "message": "ok"
}
```

[SignatureAuthorization]: ../../signature-authorization.md
[SignatureActions]: ../../actions.md
[ResponseFormat]: ../../response-format.md
