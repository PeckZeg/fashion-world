# [Channel] 获取频道分类列表

> 新增于@1.2.0

## 基本信息

* 方法: `GET`
* 地址: `/api/channel/:channel-id/categories`

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
`offset`           | `Number`  |      | `0`    | 最小值: `0` | 页面偏移
`limit`            | `Number`  |      | `20`   | 最小值: `0` | 每页限制

## 响应内容结构

键           | 类型       | 示例    | 说明
:----------- | :--------- | :------ | :--------------------------
`categories` | `Object[]` |         | [分类][category-model] 列表

## 错误码

[请求返回结果][response-format] 说明。

状态码 | message            | 说明
:----: | :----------------- |:----------------------
`400`  |                    | 参数错误、手机/密码错误
`500`  |                    | 服务器错误

## 示例

**请求**

```
GET /api/channel/5959b33cb912aab9e9e9eb15/categories HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 797dd152-1a34-6eb4-b03a-5ef4b2d8dcc9
```

**响应**

```json
{
    "categories": [
        {
            "_id": "5959bd385c2960da1aa844f1",
            "channelId": "5959b33cb912aab9e9e9eb15",
            "name": "经典影像",
            "createAt": 1499053368877,
            "publishAt": 1489720565054,
            "priority": 14
        }
    ]
}
```



[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[channel-model]: ../../models/channel.md
[category-model]: ../../models/category.md
