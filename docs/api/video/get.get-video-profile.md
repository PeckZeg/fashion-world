# 视频 - 获取视频详情

## Base

* Method: `GET`
* URI: `/api/video/:video-id`

### Params

field      | type       | example                    | note
:--------- | :--------- | :------------------------- | :-------
`video-id` | `objectid` | `59294dbfddf001b5dae39a74` | 视频编号

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |

## Request Query Schema

None

## Response Body Schema

field   | type     | example   | note
:------ | :------- | :-------- | :------------------------------------------------------
`video` | `object` | `{ ... }` | 视频详情，视频模型请参见 [Video](../../models/video.md)

### Extra Video Field

field      | type     | example     | note
:--------- | :------- | :---------- | :----------------------------------------------------------------
`channel`  | `object` | `{ ... }`   | 频道详情，频道模型请参见 [Video Channel](../../models/video-channel.md)
`category` | `object` | `{ ... }`   | 频道分类详情，频道分类模型参见 [Video Channel Category](../../models/video-channel-category.md)

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误
`500` | 服务器错误

## Example

**request**

```
GET /api/video/59294dbfddf001b5dae39a74 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 7acc2e6a-9a13-f8aa-9aae-174ee718c040
```

**response**

```json
{
  "video": {
    "_id": "59294dbfddf001b5dae39a74",
    "sourceId": "5927e290ddf001b5dae3950c",
    "categoryId": "5923d5b8afa4194436827759",
    "channelId": "5923d5a2afa4194436827737",
    "publishAt": 1495879103873,
    "name": "伦敦时装周秋冬M17-18-WhatWeWear",
    "summary": "劳院全风都且信即半直各非花合看和。求进装矿省直观展科能历完办。高单度增便面内局备教五听组和。",
    "abstract": "完花思部果产空复装象毛眼题车支除划管林越积报入走节军石。",
    "createAt": 1495879103886,
    "isRemoved": false,
    "isRecommend": false,
    "isActive": true,
    "tags": [
      "开形事算组程",
      "数术学商连",
      "己细步展第到系",
      "酸林系育"
    ],
    "coverUrl": "http://localhost:3003/static/images/video/2e8cae4b2e177d502b94282ad2be79f8ab8e3ce6.png",
    "channel": {
      "_id": "5923d5a2afa4194436827737",
      "name": "Fashion One",
      "createAt": 1495520674396,
      "isActive": true,
      "priority": 1
    },
    "category": {
      "_id": "5923d5b8afa4194436827759",
      "channelId": "5923d5a2afa4194436827737",
      "name": "品牌专题",
      "createAt": 1495520696571,
      "isActive": true,
      "priority": 6
    }
  }
}
```
