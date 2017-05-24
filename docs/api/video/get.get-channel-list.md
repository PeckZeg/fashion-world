# 视频 - 获取频道列表

## Base

* Method: `GET`
* URI: `/api/video/channel`

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |

## Request Query Schema

field  | type     | required | validate         | note
:----- | :------- | :------- | :--------------- | :-------
`name` | `string` |          | Length: `3 ~ 64` | 频道名称

## Response Body Schema

field      | type       | example     | note
:--------- | :--------- | :---------- | :----------------------------------------------------------------
`channels` | `object[]` | `[{ ... }]` | 频道列表，频道模型请参见 [Video Channel](../../models/video-channel.md)

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
GET /api/video/channel HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 515aa606-0149-6e81-66c2-be6acf869265
```

**response**

```json
{
  "channels": [
    {
      "_id": "5923d5a2afa4194436827737",
      "name": "Fashion One",
      "createAt": 1495520674396,
      "isActive": true,
      "priority": 2,
      "categories": [
        {
          "_id": "5923d5b8afa4194436827765",
          "channelId": "5923d5a2afa4194436827737",
          "name": "美女",
          "createAt": 1495520696582,
          "isActive": true,
          "priority": 9
        }
      ]
    }
  ]
}
```
