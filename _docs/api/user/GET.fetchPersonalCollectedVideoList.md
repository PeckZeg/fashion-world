# 用户 - 获取当前用户收藏的视频列表

## Base

* 方法: `GET`
* 地址: `/api/user/personal/collected-videos`

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
`videos` | `Object[]` | `[{ ... }]` | 收藏的 [视频][video-model] 列表

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
GET /api/user/personal/collected-videos HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Authorization: Caa SFh2M0pQUjJyZXZyV1FMNWNiRERjc3p5OU5VdHJZWXZpczZnTTJWZDFORT06QkN2RkZXUmtaSHhHTDBZUGRZRUhJMHFrVUdNPSAxNTAyMDczMDg0Njc2
Cache-Control: no-cache
Postman-Token: f261f5eb-ab5f-1954-90ef-dfce8ed2fb7c
```

**响应**

```json
{
    "videos": [
        {
            "_id": "598414860451c8c6f62fbd96",
            "sourceId": "598414860451c8c6f62fbd92",
            "categoryId": "596ecda66799960a5973a732",
            "channelId": "5959b33cb912aab9e9e9eb15",
            "createAt": 1501828230660,
            "recommendAt": null,
            "publishAt": 1501616311799,
            "keywords": [],
            "tags": [
                "观效值系开无"
            ],
            "views": 1,
            "productionCountry": null,
            "rightsOwner": null,
            "year": null,
            "castings": [],
            "part": null,
            "episode": null,
            "season": null,
            "summary": "个深可认要理政从人革机细性认院。\n通科角矿正受清也反程越属走元亲半况周。\n风总先完因收子十命商小现许称。\n的万个们厂题参的边总放物王具。\n团西断的期理状直素调习族据部期些写。\n速高个布放地合十素始角难期切。\n七基小战许半量生导展月性打电。\n技军联系查三性育段他通技二眼龙周拉求。\n专用直义使度商二前专区流金程会全。\n资被几件农变划学主两斗起内。\n但重变资分红问都之科参目。\n由级构快做声传或铁程规众受气。\n国干消及色治记队县论变元往许。\n具青条马之现却指务示定北立样论化部些。\n农观青军点生与标象程据通联需。\n决品铁千从最得什器红片地金。\n团水市际持约积由济持来求支同。\n起气酸时先车影日再入太史际山定记住。\n把火外没合同参连次院全节些制决叫。\n传斯样织后非大都圆学严规器千。\n真民严般需社计风引查给接调般列照响。\n它第片始族经到在极办论条着真往重千。\n受打即外机方史建而头值许。\n今也强步电育道西没学三着界很期类制。\n上话门程总带界由用列件四型更至形道。\n看放权毛由精小通一品事才算得受。\n八队队消严社回世内引研再向。\n小各京便进劳体权教消动方和过当识。\n金得矿火日九易第种领被战低且着。\n",
            "abstract": "我月样到需地百十图心么装历一。\n重确红飞完写非如积等先些如速展那则。\n更价位新做上江八花应毛员议再价。\n织以青广两一前真存元成白布。\n空它正种列传重于年须根天整度线在。\n",
            "subtitle": "采五名就主族层运儿圆节应国其毛务热色去你究青这理用酸至济步算社华除圆专此中图江阶就农速照形算听听成八少族直西参他组共积引北求接好入你毛他音去么县国少新酸七空近风才物维党只国头把好给年定际能专织究打导压习选众文养她越调且",
            "title": "速之两便年劳空究自叫己外候回少类这带条里思及件",
            "cover": "/static/images/255e80bb42f8a2154fc1cbe5ab9a642ad67064fc.jpg",
            "collectAt": 1502072974320,
            "collections": 1,
            "favourites": 0,
            "isCollected": true,
            "isFavoured": false,
            "channel": {
                "_id": "5959b33cb912aab9e9e9eb15",
                "name": "Deep",
                "removeBy": "592f6a5e53532796c6b50ae3",
                "createAt": 1499053348235,
                "publishAt": 1489690763421,
                "priority": 2
            },
            "category": {
                "_id": "596ecda66799960a5973a732",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "艺术密码",
                "createAt": 1500433830588,
                "publishAt": 1487475899309,
                "priority": 1
            },
            "source": {
                "_id": "598414860451c8c6f62fbd92",
                "createAt": 1501828230610,
                "uploadAt": 1501828230599,
                "screenshots": [
                    "http://59.57.240.50:5052/static/images/190f2151ab9a8c35434614231a03cea66ba9e771.jpg",
                    "http://59.57.240.50:5052/static/images/74fe709173d789a4f8c87e2e2bade9ed9cfa5981.jpg",
                    "http://59.57.240.50:5052/static/images/70a3ce7f0cca5a14d519242af55da808983dfe1d.jpg",
                    "http://59.57.240.50:5052/static/images/53155a81a0e6d05ed9df491ad93c5477855fe7f8.jpg",
                    "http://59.57.240.50:5052/static/images/255e80bb42f8a2154fc1cbe5ab9a642ad67064fc.jpg"
                ],
                "duration": 1501776022000,
                "definitions": [
                    {
                        "_id": "5982e77bb8f148fe011662ed",
                        "sha1": "fec6f2c777cb95f8a44bc6ffc35cbefca3697dd1",
                        "sourceId": "598414860451c8c6f62fbd92",
                        "createAt": 1501751163895,
                        "bitRate": 365100,
                        "definition": "360p",
                        "duration": 1501776022000,
                        "size": 0,
                        "height": 360,
                        "width": 640,
                        "url": "http://59.57.240.50:5052/static/videos/fec6f2c777cb95f8a44bc6ffc35cbefca3697dd1.mp4"
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
