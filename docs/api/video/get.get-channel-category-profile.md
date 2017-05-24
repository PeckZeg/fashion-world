# 视频 - 获取频道分类详情

## Base

* Method: `GET`
* URI: `/api/video/channel/category/:category-id`

### Params

field         | type     | example                    | note
:------------ | :------- | :------------------------- | :-------
`category-id` | `string` | `5923d5b8afa4194436827765` | 频道分类编号

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |

## Request Query Schema

None

## Response Body Schema

field      | type     | example   | note
:--------- | :------- | :-------- | :----------------------------------------------------------------
`category` | `object` | `{ ... }` | 频道分类，模型参见 [Video Channel Category](../../models/video-channel-category.md)

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误、手机/密码错误
`500` | 服务器错误

## Example

**request**

```
GET /api/video/channel/category/5923d5b8afa4194436827765 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: a09d4b76-be25-f84c-e103-99db0d697a65
```

**response**

```json
{
  "category": {
    "_id": "5923d5b8afa4194436827765",
    "channelId": "5923d5a2afa4194436827737",
    "name": "美女",
    "createAt": 1495520696582,
    "isActive": true,
    "priority": 9
  }
}
```
