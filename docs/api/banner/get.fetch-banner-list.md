# 视频 - 获取横幅列表

> 版本 `1.0.4` 新增

## Base

* Method: `GET`
* URI: `/api/banner`

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |

## Request Query Schema

field       | type       | required | default |validate                | note
:---------- | :--------- | :------- | :------ |:---------------------- | :-------
`offset`    | `number`   |          | `0`     | Range: `0 ~ +Infinity` | 页面偏移量
`limit`     | `number`   |          | `20`    | Range: `1 ~ +Infinity` | 每页限制
`channelId` | `objectid` |          |         |                        | 频道编号
`type`      | `string`   |          |         |                        | 类型

## Response Body Schema

field      | type       | example     | note
:--------- | :--------- | :---------- | :--------------------------------------------------
`banners`  | `object[]` | `[{ ... }]` | 频道分类，模型参见 [Banner](../../models/banner.md)

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误
`500` | 服务器错误

## Example

**request**

```
GET /api/banner?channelId=5923d5a2afa4194436827737 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: cea9af01-1728-8c22-ff38-e3074d03c560
```

**response**

```json
{
  "banners": [
    {
      "_id": "594237b31e1abafd533bdc80",
      "removeAt": null,
      "createAt": 1497511859791,
      "priority": 61,
      "cover": "/data/static/images/video/922de5e5cd2c719892205d56feb1b3c7d1d78686.jpg",
      "value": {
          "videoId": "59409f140ed43e1103d60a94"
      },
      "type": "goto:video-profile",
      "title": "研力使解持始候想华史格",
      "channelId": "5923d5a2afa4194436827737",
      "coverUrl": "http://localhost:3003/data/static/images/video/922de5e5cd2c719892205d56feb1b3c7d1d78686.jpg"
    },
    {
      "_id": "594237b31e1abafd533bdc77",
      "removeAt": null,
      "createAt": 1497511859767,
      "priority": 36,
      "cover": "/data/static/images/video/c0281a1f031afd36a214cde1f682d12559ce1d45.jpg",
      "value": "http://www.163.com/",
      "type": "url",
      "title": "律直资克",
      "channelId": "5923d5a2afa4194436827737",
      "coverUrl": "http://localhost:3003/data/static/images/video/c0281a1f031afd36a214cde1f682d12559ce1d45.jpg"
    },
  ]
}
```
