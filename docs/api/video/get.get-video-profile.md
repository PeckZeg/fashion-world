# 视频 - 获取视频详情

## 基本

* 方法: `GET`
* 地址: `/api/video/:video-id`

### 地址参数

字段       | 类型       | 示例                       | 说明
:--------- | :--------- | :------------------------- | :-------
`video-id` | `ObjectId` | `59294dbfddf001b5dae39a74` | 视频编号

## Headers

键              | 值                    | 必须     | 备注
:-------------- | :-------------------- | :------: | :----------------------------------
`Content-Type`  | `application/json`    | √        | 指定内容传输类型为 JSON 格式
`Authorization` | `Caa ${Base64String}` | √        | [用户签名][signature-authorization]

签名动作参见 [Signature Actions][signature-actions]

## 请求查询参数

无

## 请求响应内容

字段    | 类型     | 示例      | 说明
:------ | :------- | :-------- | :---------------------------
`video` | `object` | `{ ... }` | 更新后的 [视频][video-model]

## 额外的视频字段

字段         | 类型      | 示例      | 说明
:----------- | :-------- | :-------- | :------------------------------------------------------
`channel`    | `object`  | `{ ... }` | [视频频道][video-channel-model]
`category`   | `object`  | `{ ... }` | [频道分类][video-channel-category-model]
`source`     | `object`  | `{ ... }` | [视频源][source-video-model]
`isFavoured` | `boolean` | `true`    | **新增@1.0.6** 是否已点赞（传入 `Authorization` 时显示）
`isCollected` | `boolean` | `false`   | **新增@1.0.6** 是否已收藏（传入 `Authorization` 时显示）

## 错误状态码

[请求返回结果][response-format] 说明。

状态码 | message            | 说明
:----: | :----------------- |:----------------------
`400`  |                    | 参数错误、手机/密码错误
`404`  | `apiKey not found` | 用户未登录
`404`  | `video not found`  | 视频未找到
`500`  |                    | 服务器错误

## 示例

**请求**

```
GET /api/video/59409f140ed43e1103d60a96 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa TGsvQnpYS2NXdFpJbzJRVWwzZ2xhUTJFdGo1alVLb1RCVml5UkNsWHpaQT06Q0NtTlFNUXp1cjRxUEJVRERuR09NT1RHeVZrPSAxNDk4NzIyODM1NzI5
Cache-Control: no-cache
Postman-Token: 41c54849-06c4-e22c-0be4-2f9c489bac26
```

**响应**

```json
{
    "video": {
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
        "favourites": 0,
        "isFavoured": false,
        "isCollected": false
    }
}
```
