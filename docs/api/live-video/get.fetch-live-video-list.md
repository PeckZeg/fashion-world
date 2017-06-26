# Live 视频 - 获取 Live 视频列表

## Base

* Method: `GET`
* URI: `/api/live-video`

## Headers

key             | value                 | note
:-------------- | :-------------------- | :----------
`Content-Type`  | `application/json`    |

## Request Query Schema

field         | type       | required | default |validate                | note
:------------ | :--------- | :------- | :------ |:---------------------- | :-------
`offset`      | `number`   |          | `0`     | Range: `0 ~ +Infinity` | 页面偏移量
`limit`       | `number`   |          | `20`    | Range: `1 ~ +Infinity` | 每页限制

## Response Body Schema

field        | type       | example     | note
:----------- | :--------- | :---------- | :--------------------------------
`liveVideos` | `object[]` | `[{ ... }]` | [Live 视频][live-video-model]列表

### Extra Video Fields

field      | type     | example   | note
:--------- | :------- | :-------- | :-------------------------------------------------
`sources`   | `object` | `{ ... }` | [视频源][source-video-model]

## Error Codes

请求返回结果说明，可访问 [该处](../../response-format.md) 查看相应文档。

code  | note
:---- | :----------------------
`400` | 参数错误、手机/密码错误
`500` | 服务器错误

## Example

**request**

```
GET /api/live-video HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 66560aab-1efc-5d14-bb0b-f423d45d3e67
```

**response**

```json
{
    "liveVideos": [
        {
            "_id": "5950ad5e7cb8449eb0363be4",
            "removeAt": null,
            "createAt": 1498459486465,
            "recommendAt": null,
            "publishAt": 1494831426811,
            "collections": 0,
            "priority": 30,
            "views": 0,
            "cover": "/static/images/video/5eea1f6a00dc879492d7a54f2b788dbf57537fe1.jpg",
            "summary": "反选农圆学说具满面种为报。\n压经金细分专列便支产布书新。\n群主法代机价需于理作使程者日处们作。\n族么现前江单量特须想据拉组。\n",
            "abstract": "酸备济战消受的适代东容难法办带由且类图属三列南。",
            "name": "劳那公身段酸来",
            "keywords": [
                "极则把",
                "期书们",
                "色其",
                "况及太"
            ],
            "tags": [
                "厂组型积",
                "把集下与分",
                "中群",
                "京做支王"
            ],
            "sourceIds": [
                "5940f2a60ed43e1103d61df9",
                "593f936a0ed43e1103d5fd58",
                "593f94c50ed43e1103d5fdee",
                "593fa9cb0ed43e1103d6035f"
            ],
            "coverUrl": "http://localhost:3003/static/images/video/5eea1f6a00dc879492d7a54f2b788dbf57537fe1.jpg",
            "sources": [
                {
                    "_id": "5940f2a60ed43e1103d61df9",
                    "sha1": "27dbe0e932763a6184f4f02aabd377892d060b2e",
                    "createAt": 1497428646774,
                    "screenshots": [
                        "/static/images/video/364894fb17290ea9184318d5e3ca0327cca66e46.jpg",
                        "/static/images/video/a99a4c46d3b1a31842852e5ac3bbd10c465a73cf.jpg",
                        "/static/images/video/63200a5565f2ba74a61b7ffb0b04c91b715f34ae.jpg",
                        "/static/images/video/cc9e10c4d4ca05cda4c6ca76cc44635e499c2e78.jpg",
                        "/static/images/video/f8ac67220cf97e4c66fadf4647779b6cc8b8afe3.jpg"
                    ],
                    "uploadAt": 1494589320000,
                    "cover": "",
                    "duration": 220680,
                    "size": 45670151,
                    "height": 720,
                    "width": 1280,
                    "filepath": "/FTV/短片2017-FashionShow-FairyFightbyAVIVKOSLOFF&EINATDAN.mp4",
                    "filename": "短片2017-FashionShow-FairyFightbyAVIVKOSLOFF&EINATDAN.mp4",
                    "screenshotUrls": [
                        "http://localhost:3003/static/images/video/364894fb17290ea9184318d5e3ca0327cca66e46.jpg",
                        "http://localhost:3003/static/images/video/a99a4c46d3b1a31842852e5ac3bbd10c465a73cf.jpg",
                        "http://localhost:3003/static/images/video/63200a5565f2ba74a61b7ffb0b04c91b715f34ae.jpg",
                        "http://localhost:3003/static/images/video/cc9e10c4d4ca05cda4c6ca76cc44635e499c2e78.jpg",
                        "http://localhost:3003/static/images/video/f8ac67220cf97e4c66fadf4647779b6cc8b8afe3.jpg"
                    ],
                    "url": "http://video.ftvcn.com/download/FTV/短片2017-FashionShow-FairyFightbyAVIVKOSLOFF&EINATDAN.mp4"
                }
            ]
        }
    ]
}
```

[live-video-model]:   ../../models/live-video.md
[source-video-model]: ../../models/video-source.md
