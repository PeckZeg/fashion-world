# 用户 - 登录（手机号、密码）

> 更新@1.1.0

## 基本信息

* 方法: `POST`
* 地址: `/api/user/login`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式

## 请求 Body

字段       | 类型     | 必须     | 默认值  | 验证                | 说明
:--------- | :------- | :------: | :------ | :------------------ | :------------------
`mobile`   | `String` | √        |         | `/\d{11}/`          | 手机号码
`password` | `String` | √        |         | `/^[a-f0-9]{32}$/i` | 密码，使用 MD5 加密

## 请求响应 Body

字段        | 类型     | 示例                                            | 说明
:---------- | :------- | :---------------------------------------------- | :-------------------------------
`apiKey`    | `String` | `X09Tl6HCKUf/scMLu6vy8kv9w+ppUaxJMyiaQn2kW2Q=`  | 用户 apiKey
`secretKey` | `String` | `pNDwncIirSD5T+7IZ+2jOEry/UKX5ab8HwLhjcYtGSk="` | 用户 secretKey
`userId`    | `String` | `591961f92924bf503e10c948`                      | 用户编号
`expiresIn` | `Date`   | `1494922184252`                                 | `apiKey` 和 `secretKey` 过期时间
`user`      | `Object` | `{ ... }`                                       | 登录的 [用户][user-model]

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                 | 说明
:----: | :---------------------- |:----------------------
`400`  |                         | 参数错误、手机/密码错误
`400`  | `invalid authorization` | 错误的 authorization
`404`  | `apiKey not found`      | 用户未登录
`404`  | `video not found`       | 视频未找到
`500`  |                         | 服务器错误

## 示例

**请求**

```
POST /api/user/login HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: f0de7c34-015f-6614-6124-b6d13d58da84

{
	"mobile": "13055818112",
	"password": "fe7d5d79226524b5b3f035ead02cf5dc"
}
```

**响应**

```json
{
    "apiKey": "X09Tl6HCKUf/scMLu6vy8kv9w+ppUaxJMyiaQn2kW2Q=",
    "secretKey": "pNDwncIirSD5T+7IZ+2jOEry/UKX5ab8HwLhjcYtGSk=",
    "userId": "591961f92924bf503e10c948",
    "expiresIn": 1494922184252,
    "user": {
        "_id": "591961f92924bf503e10c948",
        "name": "PeckZeg",
        "password": "fe7d5d79226524b5b3f035ead02cf5dc",
        "gender": 1,
        "mobile": "13055818112",
        "registerAt": 1494835705990,
        "createAt": 1494835705990
    }
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[user-model]: ../../models/user.md
