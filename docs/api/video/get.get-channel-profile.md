# 视频 - 获取频道详情

## Base

* Method: `GET`
* URI: `/api/video/channel/:channel-id`

### Params

field        | type     | example                    | note
:----------- | :------- | :------------------------- | :-------
`channel-id` | `string` | `5923d5a2afa4194436827737` | 频道编号

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |

## Request Query Schema

None

## Response Body Schema

field     | type     | example   | note
:-------- | :------- | :-------- | :----------------------------------------------------------------
`channel` | `object` | `{ ... }` | 频道详情，频道模型请参见 [Video Channel](../../models/video-channel.md)

### Extra Channel Field

field        | type       | example     | note
:----------- | :--------- | :---------- | :----------------------------------------------------------------
`categories` | `object[]` | `[{ ... }]` | 频道分类列表，分类模型请参见 [Video Channel Category](../../models/video-channel-category.md)

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误、手机/密码错误
`500` | 服务器错误

## Example

**request**

```
GET /api/video/channel/5923d5a2afa4194436827737 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 0296dca6-399b-aa03-d712-1c77bc341653
```

**response**

```json
{
  "channel": {
    "_id": "5923d5a2afa4194436827737",
    "name": "Fashion One",
    "createAt": 1495520674396,
    "isActive": true,
    "priority": 2,
    "categories": [
      {
        "_id": "5923d5b8afa419443682774e",
        "channelId": "5923d5a2afa4194436827737",
        "name": "拍摄花絮",
        "createAt": 1495520696501,
        "isActive": true,
        "priority": 5
      }
    ]
  }
}
```
