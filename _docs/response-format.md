# 请求返回说明

## 状态码及请求结果

请求的结果使用 JSON 传输，会在请求结果头部附加 `Content-Type: application/json`，默认编码为 `utf-8`。

请求成功使用 `200` 的状态码，结果则根据请求的资源进行返回。

请求失败则根据标准 [HTTP 状态码](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81) 返回状态码，请求结果则会附带 `message` 字段进行说明。以下是请求成功与失败的示例：

### 请求成功示例

**request**

```http
POST /api/user/login HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: ba0527e7-4676-2b5f-8268-9f9f17d604b5

{
	"mobile": "13055818112",
	"password": "fe7d5d79226524b5b3f035ead02cf5dc"
}
```

**response**

```
Status: 200
Content-Type: application/json;
Content-Length: 369
Date: Mon, 15 May 2017 08:31:00 GMT
ETag: W/"171-jsbOUZIPGJaO+TZIVXlMcQ"
```

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

### 请求失败示例

**request**

```
POST /api/user/login HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 3882c3fd-eca4-5f5d-ec1f-d83a6e1ef758

{
	"mobile": "1305581811",
	"password": "fe7d5d79226524b5b3f035ead02cf5dc"
}
```

**response**

```
Status: 400
Content-Type: application/json;
Content-Length: 72
Date: Mon, 15 May 2017 08:32:54 GMT
ETag: W/"48-q6dXjvwCtzzWtaw1hDJx9A"
```

```json
{
  "message": "Validator failed for path `mobile` with value `1305581811`"
}
```
