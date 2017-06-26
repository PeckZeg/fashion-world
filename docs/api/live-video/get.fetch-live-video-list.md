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
`limit`       | `number`   |          | `20`    | Range: `1 ~ +Infinity` | 每页限制

## Response Body Schema

field        | type       | example     | note
:----------- | :--------- | :---------- | :--------------------------------
`liveVideos` | `object[]` | `[{ ... }]` | [Live 视频][live-video-model]列表

### Extra Video Fields

field    | type     | example   | note
:------- | :------- | :-------- | :---------------------------
`source` | `object` | `{ ... }` | [视频源][source-video-model]

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
            "_id": "5950be7272e179a5e0107218",
            "sourceId": "593f941e0ed43e1103d5fda8",
            "removeAt": null,
            "createAt": 1498463858363,
            "recommendEndAt": 1501055858361,
            "recommendBeginAt": 1498095642252,
            "publishAt": 1497135664795,
            "views": 0,
            "cover": "/static/images/video/2cfd55511a3d85066a1b27b4b56d3dcf4364a973.jpg",
            "summary": "共路便指团月至太温事积果消们手。\n回术而书率住成容党类五特准口感。\n",
            "abstract": "第但手众关办层支往离传重确研制分主信边委家过质活重身式下你长引分和构建合华系心全更科整联强写战少指比性做建基政业发口今术。",
            "name": "深织低拉示什平问四员光处",
            "keywords": [
                "全装技",
                "月将则节"
            ],
            "tags": [
                "更军安何叫",
                "位林许",
                "于它身它",
                "却后向"
            ],
            "coverUrl": "http://localhost:3003/static/images/video/2cfd55511a3d85066a1b27b4b56d3dcf4364a973.jpg",
            "source": {
                "_id": "593f941e0ed43e1103d5fda8",
                "sha1": "e0d727937c82f85f6816c78f95be263994217ee1",
                "createAt": 1497338910894,
                "screenshots": [
                    "/static/images/video/2cfd55511a3d85066a1b27b4b56d3dcf4364a973.jpg",
                    "/static/images/video/708321511d11c002311b5024f041103b5e50d74b.jpg",
                    "/static/images/video/7fefd6397eae7f3ec18245e84f409f8f95d49d54.jpg",
                    "/static/images/video/db128e3dfc78a698f9dc0e136851f0790abcf282.jpg",
                    "/static/images/video/e8277561d5750cf26a90fcbbef70d86e0d399ef6.jpg"
                ],
                "uploadAt": 1494589740000,
                "cover": "",
                "duration": 928120,
                "size": 194954700,
                "height": 720,
                "width": 1280,
                "filepath": "/FTV/伦敦时装周秋冬M17-18-VIVIENNEWESTWOODlong.mp4",
                "filename": "伦敦时装周秋冬M17-18-VIVIENNEWESTWOODlong.mp4",
                "screenshotUrls": [
                    "http://localhost:3003/static/images/video/2cfd55511a3d85066a1b27b4b56d3dcf4364a973.jpg",
                    "http://localhost:3003/static/images/video/708321511d11c002311b5024f041103b5e50d74b.jpg",
                    "http://localhost:3003/static/images/video/7fefd6397eae7f3ec18245e84f409f8f95d49d54.jpg",
                    "http://localhost:3003/static/images/video/db128e3dfc78a698f9dc0e136851f0790abcf282.jpg",
                    "http://localhost:3003/static/images/video/e8277561d5750cf26a90fcbbef70d86e0d399ef6.jpg"
                ],
                "url": "http://video.ftvcn.com/download/FTV/伦敦时装周秋冬M17-18-VIVIENNEWESTWOODlong.mp4"
            }
        },
        {
            "_id": "5950be7272e179a5e0107225",
            "sourceId": "593fa9cb0ed43e1103d6035f",
            "removeAt": null,
            "createAt": 1498463858401,
            "recommendEndAt": 1501055858401,
            "recommendBeginAt": 1499807534149,
            "publishAt": 1496246918159,
            "views": 0,
            "cover": "/static/images/video/4a73028d2f56f7c73be0f2adfd67ca2ad5e2b0f4.jpg",
            "summary": "连目太感国北线青计相县精情。\n无今会制分以流深根间在军就须。\n办养路入需县边七别分写生该整传展几。\n期处儿四界由道始件与步等设此活文。\n热近思设能半每热见化总结决。\n",
            "abstract": "步青一会地具或而划金还在军直象及身路重候色委身易手改专指适心具通传周具着人发想越样法线易全。",
            "name": "联切两看七过思",
            "keywords": [
                "传变门转",
                "是消今",
                "好往政调"
            ],
            "tags": [
                "时它合",
                "完器强",
                "选设联",
                "铁克较"
            ],
            "coverUrl": "http://localhost:3003/static/images/video/4a73028d2f56f7c73be0f2adfd67ca2ad5e2b0f4.jpg",
            "source": {
                "_id": "593fa9cb0ed43e1103d6035f",
                "sha1": "a81c25e81510c73686208cda8c72fa333e0f09ea",
                "createAt": 1497344459447,
                "screenshots": [
                    "/static/images/video/ddf1a74003aa361a66dbdcfe755a69db629d0afb.jpg",
                    "/static/images/video/f73cac13bff01ab63062b43a2ca7e46d5d770f57.jpg",
                    "/static/images/video/6bc6503da7933d843a5bc93a2162c357299ff002.jpg",
                    "/static/images/video/a6ce7babe11bc0bbc798e6e245a44ecb706b74bd.jpg",
                    "/static/images/video/82c1647835929d04fb6fa57e1b6237c0dabc3c7b.jpg"
                ],
                "uploadAt": 1494589620000,
                "cover": "",
                "duration": 600640,
                "size": 124910429,
                "height": 720,
                "width": 1280,
                "filepath": "/FTV/伦敦时装周秋冬W17-18-TopshopUnique.mp4",
                "filename": "伦敦时装周秋冬W17-18-TopshopUnique.mp4",
                "screenshotUrls": [
                    "http://localhost:3003/static/images/video/ddf1a74003aa361a66dbdcfe755a69db629d0afb.jpg",
                    "http://localhost:3003/static/images/video/f73cac13bff01ab63062b43a2ca7e46d5d770f57.jpg",
                    "http://localhost:3003/static/images/video/6bc6503da7933d843a5bc93a2162c357299ff002.jpg",
                    "http://localhost:3003/static/images/video/a6ce7babe11bc0bbc798e6e245a44ecb706b74bd.jpg",
                    "http://localhost:3003/static/images/video/82c1647835929d04fb6fa57e1b6237c0dabc3c7b.jpg"
                ],
                "url": "http://video.ftvcn.com/download/FTV/伦敦时装周秋冬W17-18-TopshopUnique.mp4"
            }
        },
        {
            "_id": "5950be7272e179a5e0107223",
            "sourceId": "593f91c40ed43e1103d5fca4",
            "removeAt": null,
            "createAt": 1498463858397,
            "recommendEndAt": null,
            "recommendBeginAt": null,
            "publishAt": 1498465690414,
            "views": 0,
            "cover": "/static/images/video/d48284fc68de09bbc086618318538c25132a5cd8.jpg",
            "summary": "队制值四质议量派期己层一眼。\n物志方很千体酸江细示水政。\n花种响持响酸用手象自段通类始产科效地。\n",
            "abstract": "与连按了成路真快里学它温改并写传积金毛两现比到老集这般支会设京铁道术。",
            "name": "车王理里始果型七实无美是",
            "keywords": [
                "由局也",
                "分极",
                "前自局"
            ],
            "tags": [
                "与认已",
                "第何即",
                "你国"
            ],
            "coverUrl": "http://localhost:3003/static/images/video/d48284fc68de09bbc086618318538c25132a5cd8.jpg",
            "source": {
                "_id": "593f91c40ed43e1103d5fca4",
                "sha1": "2e8cae4b2e177d502b94282ad2be79f8ab8e3ce6",
                "createAt": 1497338308766,
                "screenshots": [
                    "/static/images/video/2db1ebcc82270a0639a8044232ebdf34a9c691c7.jpg",
                    "/static/images/video/fd411c8fb1c71d760d82e144cc296c81b926b63e.jpg",
                    "/static/images/video/bb9ed5cc4371d180e63188a5cba753a65248e265.jpg",
                    "/static/images/video/c7932e48d87a4f7cf40bc38bc682052944f671a4.jpg",
                    "/static/images/video/e8dfb2cfc0d8ab7bcdca8d98c9dcb590bf8594df.jpg"
                ],
                "uploadAt": 1494589740000,
                "cover": "",
                "duration": 172520,
                "size": 37376278,
                "height": 720,
                "width": 1280,
                "filepath": "/FTV/伦敦时装周秋冬M17-18-COTTWEILER.mp4",
                "filename": "伦敦时装周秋冬M17-18-COTTWEILER.mp4",
                "screenshotUrls": [
                    "http://localhost:3003/static/images/video/2db1ebcc82270a0639a8044232ebdf34a9c691c7.jpg",
                    "http://localhost:3003/static/images/video/fd411c8fb1c71d760d82e144cc296c81b926b63e.jpg",
                    "http://localhost:3003/static/images/video/bb9ed5cc4371d180e63188a5cba753a65248e265.jpg",
                    "http://localhost:3003/static/images/video/c7932e48d87a4f7cf40bc38bc682052944f671a4.jpg",
                    "http://localhost:3003/static/images/video/e8dfb2cfc0d8ab7bcdca8d98c9dcb590bf8594df.jpg"
                ],
                "url": "http://video.ftvcn.com/download/FTV/伦敦时装周秋冬M17-18-COTTWEILER.mp4"
            }
        }
    ]
}
```

[live-video-model]:   ../../models/live-video.md
[source-video-model]: ../../models/video-source.md
