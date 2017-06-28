# 视频 - 获取视频列表

> 更新于 `@1.0.6`

## Base

* Method: `GET`
* URI: `/api/video`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :----------------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` |          | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## Request Query Schema

字段          | 类型       | 必须     | 默认值  | 验证             | 说明
:------------ | :--------- | :------: | :------ | :--------------- | :-------
`offset`      | `number`   |          | `0`     | 值域: `0 ~ 2048` | 页面偏移量
`limit`       | `number`   |          | `20`    | 值域: `1 ~ 128`  | 每页限制
`isRecommend` | `boolean`  |          |         |                  | **新增@1.0.4** 过滤出推荐视频
`channelId`   | `objectid` |          |         |                  | **新增@1.0.4** 频道编号
`categoryId`  | `objectid` |          |         |                  | **新增@1.0.4** 分类编号
`tags`        | `string`   |          |         |                  | 标签过滤，为 `OR` 查询，使用 `,` 隔开

## Response Body Schema

field    | type       | example     | note
:------- | :--------- | :---------- | :--------------------------------------------
`videos` | `object[]` | `[{ ... }]` | 视频列表，视频模型请参见 [Video][video-model]

### 注入 `video` 的额外字段

字段         | 类型      | 示例      | 说明
:----------- | :-------- | :-------- | :--------------------------------------------------------
`channel`    | `object`  | `{ ... }` | [视频频道][video-channel-model]
`category`   | `object`  | `{ ... }` | [频道分类][video-channel-category-model]
`source`     | `object`  | `{ ... }` | [视频源][source-video-model]
`isFavoured` | `boolean` | `true`    | **新增@1.0.6** 是否已点赞（在传入 `Authorization` 时显示）

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

status | message            | note
:----: | :----------------- |:----------------------
`400`  |                    | 参数错误、手机/密码错误
`404`  | `apiKey not found` | 用户未登录
`500`  |                    | 服务器错误

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

[video-channel-model]: ../../models/video-channel.md
[video-channel-category-model]: ../../models/video-channel-category.md
[source-video-model]: ../../models/source-video.md
[video-model]: ../../models/video.md
[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
