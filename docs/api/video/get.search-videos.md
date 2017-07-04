# 视频 - 获取视频列表

## 基本信息

* 方法: `GET`
* 地址: `/api/video/search`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :----------------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式

## 请求查询参数

字段     | 类型     | 必须 | 默认值  | 验证              | 说明
:------- | :------- | :--: | :------ | :---------------- | :-------
`q`      | `String` | √    |         |                   | 查询字符串
`offset` | `Number` |      | `0`     |                   | 页面偏移
`limit`  | `Number` |      | `20`    |                   | 每页条数限制

## 响应内容格式

字段     | 类型       | 示例        | 说明
:------- | :--------- | :---------- | :-----------------------
`total`  | `Number`   | `233`       | 查询数据的总数
`videos` | `Object[]` | `[{ ... }]` | [视频][video-model] 列表

### Extra Video Fields

字段         | 类型      | 示例      | 说明
:----------- | :-------- | :-------- | :------------------------------------------------------
`channel`    | `object`  | `{ ... }` | [视频频道][video-channel-model]
`category`   | `object`  | `{ ... }` | [频道分类][video-channel-category-model]
`source`     | `object`  | `{ ... }` | [视频源][source-video-model]

## Error Codes

[请求返回结果][response-format] 说明。

状态码 | message            | 说明
:----: | :----------------- |:----------------------
`400`  |                    | 参数错误、手机/密码错误
`500`  |                    | 服务器错误

## 示例

**请求**

```
GET /api/video/search?q=伦敦&amp;limit=1 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: a7e217bd-1237-f629-6379-41ac25581025
```

**响应**

```json
{
    "total": 8,
    "videos": [
        {
            "_id": "59409f140ed43e1103d60a96",
            "sourceId": "593faa100ed43e1103d6037f",
            "collections": 0,
            "categoryId": "5923d5b8afa4194436827761",
            "channelId": "5923d5a2afa4194436827737",
            "name": "伦敦时装周秋冬W17-18-CharlotteOlympia预告片",
            "summary": "而复子选验却但气果书心很你专面龙温。半市观研等亲日产酸后度具放口们何为。意自等又平人万劳风层支石从你形最。",
            "abstract": "活引率立花阶越今油代教族就压看必此证现。",
            "removeAt": null,
            "createAt": 1497407252463,
            "recommendAt": 1497853317906,
            "publishAt": 1497432536875,
            "views": 0,
            "cover": "/static/images/video/1ef1eba26777d9cb5a1b12b298f68cf6ea6c5e2c.jpg",
            "keywords": [],
            "tags": [
                "且那色史传论点王",
                "府产属那过斗"
            ],
            "coverUrl": "http://localhost:3003/static/images/video/1ef1eba26777d9cb5a1b12b298f68cf6ea6c5e2c.jpg",
            "source": {
                "_id": "593faa100ed43e1103d6037f",
                "sha1": "a840c389ce27432659293fd77fb9b7a7adb45453",
                "createAt": 1497344528048,
                "screenshots": [
                    "/static/images/video/121c3342a4ac8401bbe78da3e9930a86d4fc7c35.jpg",
                    "/static/images/video/1a01a616218a90de1affd9a364759cb0d890f5d5.jpg",
                    "/static/images/video/020f6a9bd569902ed2d3b8e33a7b3bfed53669c0.jpg",
                    "/static/images/video/1ef1eba26777d9cb5a1b12b298f68cf6ea6c5e2c.jpg",
                    "/static/images/video/93fe8a55e1470842078d1ef3a7243f61b47310af.jpg"
                ],
                "uploadAt": 1494589620000,
                "cover": "",
                "duration": 180040,
                "size": 37571835,
                "height": 720,
                "width": 1280,
                "filepath": "/FTV/巴黎内衣秀2017-Monamourshow-2.mp4",
                "filename": "巴黎内衣秀2017-Monamourshow-2.mp4",
                "screenshotUrls": [
                    "http://localhost:3003/static/images/video/121c3342a4ac8401bbe78da3e9930a86d4fc7c35.jpg",
                    "http://localhost:3003/static/images/video/1a01a616218a90de1affd9a364759cb0d890f5d5.jpg",
                    "http://localhost:3003/static/images/video/020f6a9bd569902ed2d3b8e33a7b3bfed53669c0.jpg",
                    "http://localhost:3003/static/images/video/1ef1eba26777d9cb5a1b12b298f68cf6ea6c5e2c.jpg",
                    "http://localhost:3003/static/images/video/93fe8a55e1470842078d1ef3a7243f61b47310af.jpg"
                ],
                "url": "http://video.ftvcn.com/download/FTV/巴黎内衣秀2017-Monamourshow-2.mp4"
            },
            "channel": {
                "_id": "5923d5a2afa4194436827737",
                "name": "Fashion One",
                "createAt": 1497491002743,
                "publishAt": 1498470413553,
                "priority": 1
            },
            "category": {
                "_id": "5923d5b8afa4194436827761",
                "channelId": "5923d5a2afa4194436827737",
                "name": "VR",
                "createAt": 1495520696580,
                "publishAt": 1498469888334,
                "priority": 2
            },
            "favourites": 0
        }
    ]
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md
