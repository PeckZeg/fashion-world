# 横幅栏 - 获取横幅栏列表

## Base

* Method: `GET`
* Path: `/api/banner`

## Query Params

Key           | Type       | Required | Default | Note
:------------ | :--------- | :------: | :------ | :--------
`offset`      | `Number`   |          | `0`    | 页面位移
`limit`       | `Number`   |          | `20`   | 每页限制
`type`        | `string`   |          |        | 值类型，`URL|GOTO_VIDEO_PROFILE`
`channelId`   | `ObjectId` |          |        | 频道编号
`categoryId`  | `ObjectId` |          |        | 分类编号
`searchTitle` | `string`   |          |        | 搜索标题

## Response Schema

```js
{
  "total": Number,                            //  总数
  "banners": [
    {
      // 横幅栏信息，参见下方 `Banner`  模型文档
    }
  ]
}
```

* [`Banner` 模型][banner-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :---------
`500`      | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/banner HTTP/1.1
Host: localhost:3003
Content-Type: application/json
```

**Response**

```json
{
    "total": 7,
    "banners": [
        {
            "_id": "59889d38a3b9de778ec9ff5f",
            "channelId": "5959b33cb912aab9e9e9eb15",
            "createAt": 1502125368031,
            "publishAt": 1505809594371,
            "priority": 81,
            "cover": "http://beta.images.fashionworldcn.com/b87a3c98444bbd81c4d380c7947c580939475a16.jpg",
            "value": {
                "videoId": "5978ab0697c46c20f109531e"
            },
            "type": "GOTO_VIDEO_PROFILE",
            "description": "",
            "title": "感性的岁月",
            "categoryId": null
        },
        {
            "_id": "59889d39a3b9de778ec9ffb9",
            "channelId": "596ecd3ff223c686eeb624c2",
            "createAt": 1502125369305,
            "publishAt": 1505809507145,
            "priority": 81,
            "cover": "http://beta.images.fashionworldcn.com/c1d531cfd6bd599e2519055dc1d219026262066e.jpg",
            "value": {
                "videoId": "597f00ea97c46c20f10be113"
            },
            "type": "GOTO_VIDEO_PROFILE",
            "description": "",
            "title": "唐人街& 英国啤酒",
            "categoryId": null
        },
        {
            "_id": "59889d2974084b777d87a8ab",
            "channelId": "5923d5a2afa4194436827737",
            "createAt": 1502125353104,
            "publishAt": 1505809692331,
            "priority": 64,
            "cover": "http://beta.images.fashionworldcn.com/d8bd0be65ebdc990970df019f14ed751f43d471f.jpg",
            "value": {
                "videoId": "5978ab0697c46c20f109534f"
            },
            "type": "GOTO_VIDEO_PROFILE",
            "description": "",
            "title": "特雷泽草坪生活",
            "categoryId": null
        },
        {
            "_id": "59889d2974084b777d87a8a8",
            "channelId": "5959b33cb912aab9e9e9eb15",
            "createAt": 1502125353016,
            "publishAt": 1505809626972,
            "priority": 62,
            "cover": "http://beta.images.fashionworldcn.com/6735b4c9e8788e59cb0f610325372e7be4622248.jpg",
            "value": {
                "videoId": "597f00e997c46c20f10be0d7"
            },
            "type": "GOTO_VIDEO_PROFILE",
            "description": "",
            "title": "蝎子生活记录",
            "categoryId": null
        },
        {
            "_id": "59889d39a3b9de778ec9ffc1",
            "channelId": "596ecd3ff223c686eeb624c2",
            "createAt": 1502125369418,
            "publishAt": 1505809388102,
            "priority": 59,
            "cover": "http://beta.images.fashionworldcn.com/17857fc55513cb54364f8b9d8f378a9bb2602af1.jpg",
            "value": {
                "videoId": "597f00ea97c46c20f10be113"
            },
            "type": "GOTO_VIDEO_PROFILE",
            "description": "",
            "title": "想象与现实并存 ，最好的生活方式",
            "categoryId": null
        },
        {
            "_id": "59889d39a3b9de778ec9ffc2",
            "channelId": "5923d5a2afa4194436827737",
            "createAt": 1502125369436,
            "publishAt": 1505809749193,
            "priority": 11,
            "cover": "http://beta.images.fashionworldcn.com/591a75668ce2452c2d102489bef2bb7a0d390823.jpeg",
            "value": {
                "videoId": "5978ab0697c46c20f109534b"
            },
            "type": "GOTO_VIDEO_PROFILE",
            "description": "",
            "title": "女星在“威尼斯”都穿了些什么",
            "categoryId": null
        },
        {
            "_id": "59889d39a3b9de778ec9ffbb",
            "channelId": "596ecd3ff223c686eeb624c2",
            "createAt": 1502125369327,
            "publishAt": 1505809431574,
            "priority": 4,
            "cover": "http://beta.images.fashionworldcn.com/9aaed8d4e41dacbbbdfe07f5b6db1f592d4b530b.jpg",
            "value": {
                "videoId": "597f00ea97c46c20f10be113"
            },
            "type": "GOTO_VIDEO_PROFILE",
            "description": "",
            "title": "英国伦敦最好的品牌",
            "categoryId": null
        }
    ]
}
```

[signature]: ../../../../signature.md

[banner-model]: ../../../../model/banner.md
