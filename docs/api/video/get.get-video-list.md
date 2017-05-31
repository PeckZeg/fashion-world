# 视频 - 获取视频列表

## Base

* Method: `GET`
* URI: `/api/video`

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |

## Request Query Schema

field         | type       | required | default |validate                | note
:------------ | :--------- | :------- | :------ |:---------------------- | :-------
`offset`      | `number`   |          | `0`     | Range: `0 ~ +Infinity` | 页面偏移量
`limit`       | `number`   |          | `20`    | Range: `1 ~ +Infinity` | 每页限制
`isRecommend` | `boolean`  |          |         |                      | 是否推荐，转换成查询字符串时应只为 `true`, `false` 字符串
`tags`        | `string[]` |          |         |                      | 标签过滤，为 `OR` 查询，转换为查询字符串时应使用 `,` 隔开

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
