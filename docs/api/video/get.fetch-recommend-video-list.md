# 视频 - 随机获取推荐视频列表

> 新增@1.0.5

## Base

* Method: `GET`
* URI: `/api/video/recommendations`

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |

## Request Query Schema

field         | type       | required | default |validate                | note
:------------ | :--------- | :------- | :------ |:---------------------- | :-------
`limit`       | `number`   |          | `20`    | Range: `1 ~ +Infinity` | 每页限制
`channelId`   | `objectid` |          |         |                        | 频道编号
`categoryId`  | `objectid` |          |         |                        | 分类编号

## Response Body Schema

field    | type       | example     | note
:------- | :--------- | :---------- | :----------------------------------------------------------------
`videos` | `object[]` | `[{ ... }]` | 视频列表，视频模型请参见 [Video](../../models/video.md)

### Extra Video Fields

field      | type     | example   | note
:--------- | :------- | :-------- | :-------------------------------------------------
`channel`  | `object` | `{ ... }` | [视频频道](../../models/video-channel.md)
`category` | `object` | `{ ... }` | [频道分类](../../models/video-channel-category.md)
`source`   | `object` | `{ ... }` | [视频源](../../models/video-source.md)

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误、手机/密码错误
`500` | 服务器错误

## Example

**request**

```
GET /api/video?limit=1 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 915bf993-54aa-5e04-e062-ed8067427db6
```

**response**

```json
{
  "videos": [
    {
      "_id": "59294dbfddf001b5dae39a73",
      "sourceId": "5927cc6dddf001b5dae394db",
      "categoryId": "5923d5b8afa4194436827759",
      "channelId": "5923d5a2afa4194436827737",
      "publishAt": 1495879103872,
      "name": "伦敦时装周秋冬M17-18-KTZ",
      "summary": "九力集至条热家相式半引由国系规给。",
      "abstract": "工复从很地步展置京九己照重府手复完各关列民向示关照才须办做且边。",
      "createAt": 1495879103884,
      "isRemoved": false,
      "isRecommend": false,
      "isActive": true,
      "tags": [
        "证才近话日中"
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
      },
      "source": {
        "_id": "5927cc6dddf001b5dae394db",
        "sha1": "4fdd04cbe032fc1bf08363ac1c7f80fc7ddd687f",
        "uploadAt": 1494589740000,
        "duration": 644360,
        "height": 720,
        "width": 1280,
        "size": 132850134,
        "filepath": "/FTV/伦敦时装周秋冬M17-18-KTZ.mp4",
        "filename": "伦敦时装周秋冬M17-18-KTZ.mp4",
        "createAt": 1495780461607,
        "url": "http://video.ftvcn.com/download/FTV/伦敦时装周秋冬M17-18-KTZ.mp4"
      }
    }
  ]
}
```
