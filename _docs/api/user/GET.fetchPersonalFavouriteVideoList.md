# 用户 - 获取当前用户点赞的视频列表

## Base

* 方法: `GET`
* 地址: `/api/user/personal/favourite-videos`

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## Query Params

字段          | 类型       | 必须     | 默认值  | 验证 | 说明
:------------ | :--------- | :------: | :------ | :--- | :------------------
`offset`      | `Number`   |          | `0`     |      | 页面偏移量
`limit`       | `Number`   |          | `20`    |      | 每页限制

## Response Body

字段     | 类型       | 示例        | 说明
:------- | :--------- | :---------- | :-------------------------------
`videos` | `Object[]` | `[{ ... }]` | 点赞的 [视频][video-model] 列表

### 以下额外的属性/模型在接口中将会被注入 [视频][video-model] 模型中

字段       | 类型   | 示例            | 说明
:--------- | :----- | :-------------- | :-------------------------------
`favourAt` | `Date` | `1501572799203` | 关注时间

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
GET /api/user/personal/favourite-videos?limit=1 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa QzJVK1hXUzRmUEUxUDFzWWRpRU5peDNlUEU4TWpXb3VVcFFCaGdzdG1IOD06cE4vc2NueHYzdmYrRERrQzdvN0JvQzIzSUZvPSAxNTAxNjM5Mzc3NTc4
Cache-Control: no-cache
Postman-Token: c2d3c640-3bd0-8d2f-4bee-40ec5038134d
```

**响应**

```json
{
    "videos": [
        {
            "_id": "597b069997c46c20f10a4717",
            "categoryId": "5978ab0697c46c20f1095335",
            "channelId": "596ecd3ff223c686eeb624c2",
            "sourceId": "597ad78597c46c20f10a33bc",
            "createAt": 1501234841166,
            "recommendAt": null,
            "publishAt": 1501234841166,
            "keywords": [],
            "tags": [],
            "views": 5,
            "productionCountry": "USA",
            "rightsOwner": "PRINCIPAL MEDIA",
            "year": 2008,
            "castings": [
                "Gwyneth Paltrow",
                "Claudia Bassols",
                "Mario Batali and Mark Bittman "
            ],
            "part": null,
            "episode": 4,
            "season": 1,
            "summary": "Gwyneth Paltrow, Spanish actress Claudia Bassols, acclaimed chef Mario Batali and New York Times food columnist Mark Bittman  embark on a road trip to give us a closer look at Spain's cuisine, wine, culture and nightlife. In this episode, Gwyneth and Mario meet up with architectural legend Frank Gehry for a tour of the Bilbao Guggenheim. Meanwhile, Mark and Claudia head into the woods where they discover the ultimate grilling restaurant. The foursome reunite at the Gehry-designed Marqués de Riscal Hotel and Vineyard in Rioja wine country. Gwyneth and Claudia opt for oppulent spa treatments while Mario and Mark sneak back into Bilbao to spend a boys’night out eating and drinking. \n\n",
            "abstract": "Gwyneth Paltrow, Spanish actress Claudia Bassols, acclaimed chef Mario Batali and New York Times food columnist Mark Bittman  embark on a road trip to give us a closer look at Spain's cuisine, wine, culture and nightlife. In this episode, they stop in the town of Bilbao, covering the sites, with the girls indulging in spa treatments and the boys get a night out.",
            "subtitle": "Landmarks, Legends and the Lap of Luxury",
            "title": "Spain On The Road",
            "favourAt": 1501572799203,
            "collections": 0,
            "favourites": 1,
            "isCollected": false,
            "isFavoured": true,
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
                "_id": "597ad78597c46c20f10a33bc",
                "createAt": 1501222789593,
                "uploadAt": 1501222789522,
                "screenshots": [
                    "http://59.57.240.50:5052/static/images/7e4987114449992eb27e8d43c000a1e82b7d328c.jpg",
                    "http://59.57.240.50:5052/static/images/9f4c839244fc764b9a09410cfe613a321ca2d40e.jpg",
                    "http://59.57.240.50:5052/static/images/9bd0fc1d0ea31e7a0fb49305e1f619e84bd71070.jpg",
                    "http://59.57.240.50:5052/static/images/d317c300f178fd613b2844a2862bbcb1e3cb2509.jpg",
                    "http://59.57.240.50:5052/static/images/dd9f3730aa0192f5716266bf2f3d6665375450b7.jpg"
                ],
                "duration": 1501128030000,
                "definitions": [
                    {
                        "_id": "597ad78597c46c20f10a33be",
                        "sha1": "11d9930574355f01ae15c44cf13fd24cf9100bf2",
                        "sourceId": "597ad78597c46c20f10a33bc",
                        "createAt": 1501222789836,
                        "bitRate": 3075949,
                        "definition": "1080p",
                        "duration": 1501214430000,
                        "size": 0,
                        "height": 1080,
                        "width": 1920,
                        "url": "http://59.57.240.50:5052/static/videos/11d9930574355f01ae15c44cf13fd24cf9100bf2.mp4"
                    },
                    {
                        "_id": "597ad78597c46c20f10a33c0",
                        "sha1": "862b9ae448edc713d7a1f99eec8965b9cec6b18b",
                        "sourceId": "597ad78597c46c20f10a33bc",
                        "createAt": 1501222789842,
                        "bitRate": 1539367,
                        "definition": "720p",
                        "duration": 1501214430000,
                        "size": 0,
                        "height": 720,
                        "width": 1280,
                        "url": "http://59.57.240.50:5052/static/videos/862b9ae448edc713d7a1f99eec8965b9cec6b18b.mp4"
                    },
                    {
                        "_id": "597ad78597c46c20f10a33c2",
                        "sha1": "f95d2e43a5e8c7dbb7c199eae07d2166f8849914",
                        "sourceId": "597ad78597c46c20f10a33bc",
                        "createAt": 1501222789845,
                        "bitRate": 770164,
                        "definition": "480p",
                        "duration": 1501214430000,
                        "size": 0,
                        "height": 480,
                        "width": 852,
                        "url": "http://59.57.240.50:5052/static/videos/f95d2e43a5e8c7dbb7c199eae07d2166f8849914.mp4"
                    },
                    {
                        "_id": "597ad78597c46c20f10a33c4",
                        "sha1": "59ef32f0c0b5558435870beb36e629f38f9de7f5",
                        "sourceId": "597ad78597c46c20f10a33bc",
                        "createAt": 1501222789847,
                        "bitRate": 387333,
                        "definition": "360p",
                        "duration": 1501214430000,
                        "size": 0,
                        "height": 360,
                        "width": 640,
                        "url": "http://59.57.240.50:5052/static/videos/59ef32f0c0b5558435870beb36e629f38f9de7f5.mp4"
                    }
                ]
            }
        }
    ]
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[video-model]: ../../models/video.md
