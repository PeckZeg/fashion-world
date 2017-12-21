# 视频 - 随机获取视频

## Base

* Method: `GET`
* Path: `/api/video/sample`

## Headers

Key             | Value                 | Required | Note
:-------------- | :-------------------- | :------: | :--------------------
`Authorization` | `Caa ${Base64String}` |          | [用户签名][signature]

* API Action: `video:sample-video-list`

## Query Params

Key           | Type       | Required | Default | Note
:------------ | :--------- | :------: | :------ | :--------
`limit`       | `Number`   |          | `20`   | 每页限制
`channelId`   | `ObjectId` |          |        | 频道编号
`categoryId`  | `ObjectId` |          |        | 分类编号
`searchTitle` | `string`   |          |        | 搜索名称

## Response Schema

```js
{
    "total": Number,                      //  总个数
    "videos": [                           //  频道列表
        {
          "channel": {
            // 频道信息，参见下方 `Channel` 模型文档
          },

          "category": {
            // 分类信息，参见下方 `Category` 模型文档
          },

          collected: Boolean,             //  [仅 `Authorization` 存在时]是否已收藏
          favoured: Boolean,              //  [仅 `Authorization` 存在时]是否已点赞

          // 视频信息，参见下方 `Video` 模型文档
          ...video
        }
    ]
}
```

* [`Channel` 模型][channel-model]
* [`Category` 模型][category-model]
* [`Video` 模型][video-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :---------
`400`       | `invalid authorization` | 无效的验证信息
`400`       | `invalid signature`     | 无效的签名
`404`       | `apiKey not found`      | `apiKey` 未找到（登录过期）
`500`       | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/video HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa {{USER_AUTHORIZATION}}
```

**Response**

```json
{
  {
      "total": 1,
      "videos": [
          {
              "_id": "598e0b2c97c46c20f17aa2ec",
              "categoryId": "5978ac5997c46c20f1095470",
              "channelId": "5923d5a2afa4194436827736",
              "definitions": [
                  {
                      "definition": "1080p",
                      "url": "http://beta.videos.fashionworldcn.com/dfde88019a6d2018bc1af915f7d6e6f0d5ec5370.mp4"
                  },
                  {
                      "definition": "720p",
                      "url": "http://beta.videos.fashionworldcn.com/ab168a87f7f559a69475e00d695d880883b299c3.mp4"
                  },
                  {
                      "definition": "480p",
                      "url": "http://beta.videos.fashionworldcn.com/809e7165f1319355186de0ae1ec2dbf8381de0a1.mp4"
                  },
                  {
                      "definition": "360p",
                      "url": "http://beta.videos.fashionworldcn.com/163c0aa5f4fa050c655ab8c62953e8e7269f1a6d.mp4"
                  }
              ],
              "screenshots": [
                  "http://beta.images.fashionworldcn.com/a187420abfcea89eae6f7d5c5308ab4c0dbd9578.jpg",
                  "http://beta.images.fashionworldcn.com/4fbe9d5a8cd2420a57296a4b01cbc11a1d9fa661.jpg",
                  "http://beta.images.fashionworldcn.com/56813a2f5920c3ac48a3bd3cab4664b54aef5b9c.jpg",
                  "http://beta.images.fashionworldcn.com/b067ac57fc078221b1f00656260a9c7921ac45db.jpg",
                  "http://beta.images.fashionworldcn.com/259463b2da75190b9e5fa4c94755169fcb941e17.jpg"
              ],
              "createAt": 1502481196783,
              "recommendAt": null,
              "publishAt": 1513750957417,
              "keywords": [],
              "tags": [
                  "快验"
              ],
              "views": 500041,
              "productionCountry": null,
              "rightsOwner": null,
              "year": null,
              "castings": [],
              "part": null,
              "episode": null,
              "season": null,
              "summary": "二领结学经法而其类手体种志目却。\n火交知张度须快确满构所走它持根四王转。\n机速族叫类存美开而五难南们立。\n条线位王如长指将去没何军识通级眼。\n而者如据已向者门得备没机话在理会据。\n受区专织任后率阶化向应走价器实争气国。\n美者界史委经派油越当复住。\n型两记济养门该响火长山思总治社里况。\n必如务变况把商易委三改劳教派及生。\n立新断红原快元工较术开外。\n广权阶便新低西反只象温技身参委叫改温。\n太眼型率自飞受半间角亲更从石路。\n两建九之其前起情安儿步置原现除级铁要。\n行利包头飞断边去应日增给价。\n京目种样动白复看点质山划马个率说。\n想议织速林真书国来题治县议。\n那养米决场近林南单西族见问已于斗。\n再变小记特别果认会程成很两。\n会上消运题传什权不强月样党。\n率实式现大近争积验查际但民构权易最。\n江又热组色即月走工提青矿价习复。\n放交没团么却等且影听表任步管。\n何活存条准设新式很府系只为除按今前当。\n资学选里一千华内前设车例二能少国程记。\n青成边南确着员我还重点由再界使。\n支水党劳去治那性海理具没提力。\n领值已细子称状江别米者看法矿号周就。\n值便面走问我他方南些经活眼他。\n身离起亲可光应路市并至花具历段将光影。\n转市理积门离应越她却党平体展农也决军。\n",
              "abstract": "等片查习知产深作比林特道酸际个达分半。\n去研办况列回们产才求需与较入问。\n深以机队调这始中那音那至约必机。\n开西世些分义土立半包常规门使土特接。\n价代整两约度状发高始过农会导。\n却行是一越铁用包图听况先集期己公建来。\n义所状红没学总象阶整将四青布北百万。\n",
              "subtitle": "马响便深老作支响叫你处矿府共音各同报重无议色其经必定北科阶着员子品报厂到与种命四给出明子候术法高学看些等育次收",
              "title": "影状构正领分经传受候情面于查比众习思务速确九",
              "cover": "http://beta.images.fashionworldcn.com/b067ac57fc078221b1f00656260a9c7921ac45db.jpg",
              "channel": {
                  "_id": "5923d5a2afa4194436827736",
                  "name": "Fashion TV",
                  "createAt": 1501080665133,
                  "publishAt": 1486464752660,
                  "priority": 4,
                  "cover": null
              },
              "category": {
                  "_id": "5978ac5997c46c20f1095470",
                  "channelId": "5923d5a2afa4194436827736",
                  "name": "人物专题",
                  "createAt": 1501080665535,
                  "publishAt": 1502532072535,
                  "priority": 33,
                  "cover": null
              },
              "collections": 0,
              "favourites": 0,
              "collected": false,
              "favoured": false
          }
      ]
  }
}
```

[signature]: ../../../../signature.md

[channel-model]: ../../../../model/channel.md
[category-model]: ../../../../model/category.md
[video-model]: ../../../../model/video.md
