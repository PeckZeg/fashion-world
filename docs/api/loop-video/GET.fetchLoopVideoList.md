# 视频 - 获取循环视频列表

## Base

* 方法: `GET`
* 地址: `/api/loop-video`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` |          | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## Query Params

字段     | 类型     | 必须 | 默认值 | 验证 | 说明
:------- | :------- | :--: | :----- | :--- | :---------
`offset` | `Number` |      | `0`    |      | 页面偏移量
`limit`  | `Number` |      | `20`   |      | 每页限制

## Response Body

字段         | 类型       | 示例        | 说明
:----------- | :--------- | :---------- | :-------------------------------
`total`      | `Number`   | `233`       | 总数
`loopVideos` | `Object[]` | `[{ ... }]` | [循环视频][LoopVideoModel] 列表

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message                 | 说明
:----: | :---------------------- |:---------------------------
`400`  |                         | 参数错误
`400`  | `invalid authorization` | 错误的 authorization header
`404`  | `apiKey not found`      | 用户未登录
`404`  | `video not found`       | 视频未找到
`500`  |                         | 服务器错误

## 示例

**请求**

```
GET /api/loop-video HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa {{USER_AUTHORIZATION}}
Cache-Control: no-cache
Postman-Token: ab0b3dd6-359a-6e01-0fb7-6f2d32dbe622
```

**响应**

```json
{
    "total": 17,
    "loopVideos": [
        {
            "_id": "598c0bc16f483f7d0f3164aa",
            "videoId": "597b069997c46c20f10a470b",
            "createAt": 1502350273185,
            "publishAt": 1502158044559,
            "priority": 122,
            "summary": "公而过几便路际置光无角并结建以从米她义天压做土机就生拉子深断书你任思离水各部展片信着构",
            "abstract": "头切值将响压样资定八历至然切毛已而记北部气一",
            "subtitle": "很白道即近越格派压风还信整统张志今如容织铁化",
            "title": "象准好至带自二切极热儿做亲过决改则成清状发种历圆",
            "cover": "http://59.57.240.50:5052/static/images/430f95ad26e4bd3de6772e13a40de5ebf832d536.jpg",
            "video": {
                "_id": "597b069997c46c20f10a470b",
                "categoryId": "5978ab0697c46c20f1095335",
                "channelId": "596ecd3ff223c686eeb624c2",
                "sourceId": "597a486a97c46c20f109fa68",
                "createAt": 1501234841139,
                "recommendAt": null,
                "publishAt": 1501234841135,
                "keywords": [],
                "tags": [],
                "views": 8,
                "productionCountry": "USA",
                "rightsOwner": "PRINCIPAL MEDIA",
                "year": 2008,
                "castings": [
                    "Gwyneth Paltrow",
                    "Claudia Bassols",
                    "Mario Batali and Mark Bittman "
                ],
                "part": null,
                "episode": 1,
                "season": 1,
                "summary": "Gwyneth Paltrow, Spanish actress Claudia Bassols, acclaimed chef Mario Batali and New York Times food columnist Mark Bittman  embark on a road trip to give us a closer look at Spain's cuisine, wine, culture and nightlife. In this episode, with the boys, up early at Madrid’s fish market, the ladies lounge luxuriously eating churros and hot chocolate. Then Gwyneth and Mario cruise down to Toledo for a cooking lesson with one of Castilla la Mancha’s top chefs. Mark and Claudia travel the route of Don Quijote, tilting at windmills and learning how to make Manchego cheese. That night, the group celebrates Claudia’s birthday in style. After eating bird sushi, Mario learns that Iron Chefs don’t always have iron stomachs.",
                "abstract": "Gwyneth Paltrow, Spanish actress Claudia Bassols, acclaimed chef Mario Batali and New York Times food columnist Mark Bittman  embark on a road trip to give us a closer look at Spain's cuisine, wine, culture and nightlife. In this episode, they discover the region of Castilla la Mancha and travel the route of Don Quijote…",
                "subtitle": "Tilting At Windmills in Castilla la Mancha",
                "title": "Spain On The Road",
                "cover": "http://59.57.240.50:5052/static/images/video/default-cover.png",
                "collections": 0,
                "favourites": 0,
                "isCollected": false,
                "isFavoured": false,
                "channel": {
                    "_id": "596ecd3ff223c686eeb624c2",
                    "name": "WLC",
                    "createAt": 1500433830540,
                    "publishAt": 1487570931799,
                    "priority": 1
                },
                "category": {
                    "_id": "5978ab0697c46c20f1095335",
                    "channelId": "596ecd3ff223c686eeb624c2",
                    "name": "TRAVEL & TOURISM",
                    "createAt": 1501080326906,
                    "publishAt": 1501080326905,
                    "priority": 0
                },
                "source": {
                    "_id": "597a486a97c46c20f109fa68",
                    "createAt": 1501186153976,
                    "uploadAt": 1501186153925,
                    "screenshots": [
                        "http://59.57.240.50:5052/static/images/cb958672ebc78ab03f4b2f32b8238ac6a78f3b09.jpg",
                        "http://59.57.240.50:5052/static/images/f8c16132f0f20ad3a22d4e8a446392ea13c8a0a9.jpg",
                        "http://59.57.240.50:5052/static/images/728a874f7119602595c251db0a9d12077f9fb9cb.jpg",
                        "http://59.57.240.50:5052/static/images/18fdcf723a8ea5fd6845e4b7cbd258340f69c675.jpg",
                        "http://59.57.240.50:5052/static/images/922ec39c8b55e560f97beaf286e47e0a0e9f4b33.jpg"
                    ],
                    "duration": 1501128030000,
                    "definitions": [
                        {
                            "_id": "597a486a97c46c20f109fa6a",
                            "sha1": "136a7cec9f54ea60a00ffdca4b914e4ddbc95d96",
                            "sourceId": "597a486a97c46c20f109fa68",
                            "createAt": 1501186154220,
                            "bitRate": 3071900,
                            "definition": "1080p",
                            "duration": 1501128030000,
                            "size": 0,
                            "height": 1080,
                            "width": 1920,
                            "url": "http://59.57.240.50:5052/static/videos/136a7cec9f54ea60a00ffdca4b914e4ddbc95d96.mp4"
                        },
                        {
                            "_id": "597a486a97c46c20f109fa6c",
                            "sha1": "73194754b02e8b62cf3a2f310e7f54f100e2f1d8",
                            "sourceId": "597a486a97c46c20f109fa68",
                            "createAt": 1501186154226,
                            "bitRate": 1538088,
                            "definition": "720p",
                            "duration": 1501128030000,
                            "size": 0,
                            "height": 720,
                            "width": 1280,
                            "url": "http://59.57.240.50:5052/static/videos/73194754b02e8b62cf3a2f310e7f54f100e2f1d8.mp4"
                        },
                        {
                            "_id": "597a486a97c46c20f109fa6e",
                            "sha1": "eaffae6141614ab2862bc1b573ce558af94650ed",
                            "sourceId": "597a486a97c46c20f109fa68",
                            "createAt": 1501186154229,
                            "bitRate": 769606,
                            "definition": "480p",
                            "duration": 1501128030000,
                            "size": 0,
                            "height": 480,
                            "width": 852,
                            "url": "http://59.57.240.50:5052/static/videos/eaffae6141614ab2862bc1b573ce558af94650ed.mp4"
                        },
                        {
                            "_id": "597a486a97c46c20f109fa70",
                            "sha1": "dd0332e24ff55b126840211f5a82f4a5e92d5b38",
                            "sourceId": "597a486a97c46c20f109fa68",
                            "createAt": 1501186154232,
                            "bitRate": 387042,
                            "definition": "360p",
                            "duration": 1501128030000,
                            "size": 0,
                            "height": 360,
                            "width": 640,
                            "url": "http://59.57.240.50:5052/static/videos/dd0332e24ff55b126840211f5a82f4a5e92d5b38.mp4"
                        }
                    ]
                }
            }
        }
    ]
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[LoopVideoModel]: ../../models/loop-video.md
