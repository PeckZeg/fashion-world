# 视频 - 收藏视频

## Base

* 方法: `PUT`
* 地址: `/api/video/:video-id/collect`

### Location Params

键         | 类型       | 示例                       | 说明
:--------- | :--------- | :------------------------- | :-------
`video-id` | `ObjectId` | `59294dbfddf001b5dae39a74` | 视频编号

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :---------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## Query Params

无

## Response Body

字段    | 类型     | 示例      | 说明
:------ | :------- | :-------- | :------------------
`video` | `Object` | `{ ... }` | [视频][video-model]

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
PUT /api/video/5971cb74c06753548988a925/collect HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa {{USER_AUTHORIZATION}}
Cache-Control: no-cache
Postman-Token: 0723ae08-ace8-a3ef-bd1a-e6085409556d
```

**响应**

```json
{
    "video": {
        "_id": "5971cb74c06753548988a925",
        "categoryId": "5971cb74c06753548988a923",
        "channelId": "596ecd3ff223c686eeb624c2",
        "sourceId": "5971f2cc97c46c20f107df62",
        "createAt": 1500629876736,
        "recommendAt": null,
        "publishAt": 1500629876735,
        "keywords": [],
        "tags": [],
        "views": 0,
        "productionCountry": "SLOVENIA",
        "rightsOwner": "FILM IT",
        "year": 2016,
        "castings": [],
        "part": null,
        "episode": null,
        "season": null,
        "summary": "One region in two countries sets the stage for a story of incredible people and their love for the sun and earth that gives birth to wine. In a fairytale region in western Slovenia, just next to the Italian border, wine has been cultivated even long before the Romans. Many empires have claimed the region in its turbulent past, but the inhabitants have remained strong willed, stubborn and resolute on surviving on their land. Even the two great wars that ravaged the land did not break their will. In West Primorska (Slovenia) wine transcends politics. The vineyards stretch from the Italian side of Collio across to Goriška Brda in Slovenia without regard to political and state differences. Collio and Brda are synonyms and together they represent one of the best wine regions for white wines. Our story is of one region in two countries. It talks of a small but dedicated group of people who inherited the fertile land from their fathers and through hard work revived the traditional and natural methods of winemaking. Their wine is bold, strong and full of character, just like themselves.",
        "abstract": "The vineyards stretch from the Italian side of Collio across to Goriška Brda in Slovenia. Collio and Brda are synonyms and together they represent one of the best wine regions for white wines. Terra Magica is the story of one region in two countries where wine is bold, strong and full of character !",
        "subtitle": "",
        "title": "TERRA MAGICA",
        "collections": 1,
        "favourites": 0,
        "isCollected": true,
        "isFavoured": false,
        "channel": {
            "_id": "596ecd3ff223c686eeb624c2",
            "name": "WLC",
            "createAt": 1500433830540,
            "publishAt": 1487570931799,
            "priority": 1
        },
        "category": {
            "_id": "5971cb74c06753548988a923",
            "channelId": "596ecd3ff223c686eeb624c2",
            "name": "VINES & VINEYARDS",
            "createAt": 1500629876730,
            "publishAt": 1500629876726,
            "priority": 0
        },
        "source": {
            "_id": "5971f2cc97c46c20f107df62",
            "createAt": 1500639948712,
            "uploadAt": 1500639948615,
            "screenshots": [
                "http://59.57.240.50:5052/static/images/5f9ac5948d65e10f175109ecc69e7e4b6bfc2feb.jpg",
                "http://59.57.240.50:5052/static/images/df80bce9386fe7e0e6a5078937a6359060c6243a.jpg",
                "http://59.57.240.50:5052/static/images/6d79670dc344f4bef9437242de0ea7b3d4510693.jpg",
                "http://59.57.240.50:5052/static/images/46acf3e5d9516315233c60b7ad9ff11897eb42c1.jpg",
                "http://59.57.240.50:5052/static/images/77c035b5cf5a6710dde5bcad020cb6c0e15dc343.jpg"
            ],
            "duration": 1500609629000,
            "definitions": [
                {
                    "_id": "5971f2cc97c46c20f107df64",
                    "sha1": "9f559d63bdb9e191cbe157cb25e1ff942c714553",
                    "sourceId": "5971f2cc97c46c20f107df62",
                    "createAt": 1500639948930,
                    "bitRate": 3075787,
                    "definition": "1080p",
                    "duration": 1500609629000,
                    "size": 0,
                    "height": 1080,
                    "width": 1920,
                    "url": "http://59.57.240.50:5052/static/videos/9f559d63bdb9e191cbe157cb25e1ff942c714553.mp4"
                },
                {
                    "_id": "5971f2cc97c46c20f107df66",
                    "sha1": "cb59ab29e39f53fa82b9178d96056542592b45b8",
                    "sourceId": "5971f2cc97c46c20f107df62",
                    "createAt": 1500639948936,
                    "bitRate": 1536041,
                    "definition": "720p",
                    "duration": 1500609629000,
                    "size": 0,
                    "height": 720,
                    "width": 1280,
                    "url": "http://59.57.240.50:5052/static/videos/cb59ab29e39f53fa82b9178d96056542592b45b8.mp4"
                },
                {
                    "_id": "5971f2cc97c46c20f107df68",
                    "sha1": "ab1dc16c8918b61ba18c801ad372fb73a99deeb8",
                    "sourceId": "5971f2cc97c46c20f107df62",
                    "createAt": 1500639948940,
                    "bitRate": 769106,
                    "definition": "480p",
                    "duration": 1500609629000,
                    "size": 0,
                    "height": 480,
                    "width": 852,
                    "url": "http://59.57.240.50:5052/static/videos/ab1dc16c8918b61ba18c801ad372fb73a99deeb8.mp4"
                },
                {
                    "_id": "5971f2cc97c46c20f107df6a",
                    "sha1": "a0bac4bf3fda4fdc739ee7e2ac0334edabd67784",
                    "sourceId": "5971f2cc97c46c20f107df62",
                    "createAt": 1500639948944,
                    "bitRate": 385713,
                    "definition": "360p",
                    "duration": 1500609629000,
                    "size": 0,
                    "height": 360,
                    "width": 640,
                    "url": "http://59.57.240.50:5052/static/videos/a0bac4bf3fda4fdc739ee7e2ac0334edabd67784.mp4"
                }
            ]
        }
    }
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[video-model]: ../../models/video.md
