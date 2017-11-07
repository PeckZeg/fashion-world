# [Channel] 获取频道详情

> 新增于@1.2.0

## 基本信息

* 方法: `GET`
* 地址: `/api/channel/:channel-id`

### 地址栏参数

键           | 类型       | 示例                       | 说明
:----------- | :--------- | :------------------------- | :-------
`channel-id` | `ObjectId` | `59294dbfddf001b5dae39a74` | 频道编号

## Headers

键              | 值                 | 必需 | 备注
:-------------- | :----------------- | :--: | :---------------------------
`Content-Type`  | `application/json` | √    | 指定内容传输类型为 JSON 格式

## 请求查询参数

键                 | 类型      | 必需 | 默认值 | 验证        | 说明
:----------------- | :-------- | :--: | :----- | :---------- | :-----------
`injectCategories` | `Boolean` |      |        |             | 是否注入分类

## 响应内容结构

键        | 类型     | 示例    | 说明
:-------- | :------- | :------ | :-------------------------
`channel` | `Object` |         | [频道][channel-model] 信息

### 注入 `Channel` 模型的键

键           | 类型       | 示例    | 说明
:----------- | :--------- | :------ | :------------------------------------------------------------------
`categories` | `Object[]` |         | ***(参数 `injectCategories=true` 时)*** [分类][category-model] 列表

## 错误码

[请求返回结果][response-format] 说明。

状态码 | message            | 说明
:----: | :----------------- |:----------------------
`400`  |                    | 参数错误、手机/密码错误
`500`  |                    | 服务器错误

## 示例

**请求**

```
GET /api/channel/5959b33cb912aab9e9e9eb15?injectCategories=true HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 4ffab90e-95aa-6b56-fae9-6273b5e36eef
```

**响应**

```json
{
    "channel": {
        "_id": "5959b33cb912aab9e9e9eb15",
        "name": "Deep",
        "createAt": 1499053348235,
        "publishAt": 1498736389110,
        "priority": 1,
        "categories": [
            {
                "_id": "5959bd385c2960da1aa844f1",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "经典影像",
                "createAt": 1499053368877,
                "publishAt": 1489720565054,
                "priority": 14
            },
            {
                "_id": "5959bd385c2960da1aa844f3",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "王石足迹",
                "createAt": 1499053368878,
                "publishAt": 1488958477141,
                "priority": 13
            },
            {
                "_id": "5959bd385c2960da1aa844f7",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "旧影新知",
                "createAt": 1499053368880,
                "publishAt": 1497325167678,
                "priority": 11
            },
            {
                "_id": "5959bd385c2960da1aa844f9",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "宇宙探索",
                "createAt": 1499053368881,
                "publishAt": 1491687612232,
                "priority": 10
            },
            {
                "_id": "5959bd385c2960da1aa844fb",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "世界之窗",
                "createAt": 1499053368881,
                "publishAt": 1489022543929,
                "priority": 9
            },
            {
                "_id": "5959bd385c2960da1aa844fd",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "民族民俗",
                "createAt": 1499053368882,
                "publishAt": 1493698901123,
                "priority": 8
            },
            {
                "_id": "5959bd385c2960da1aa84505",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "植物探秘",
                "createAt": 1499053368885,
                "publishAt": 1497360013125,
                "priority": 4
            },
            {
                "_id": "5959bd385c2960da1aa84507",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "历史考古",
                "createAt": 1499053368886,
                "publishAt": 1485005036251,
                "priority": 3
            },
            {
                "_id": "5959bd385c2960da1aa8450b",
                "channelId": "5959b33cb912aab9e9e9eb15",
                "name": "艺术密码",
                "createAt": 1499053368888,
                "publishAt": 1498211834053,
                "priority": 1
            }
        ]
    }
}
```


[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[channel-model]: ../../models/channel.md
[category-model]: ../../models/category.md
