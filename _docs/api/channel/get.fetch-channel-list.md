# [Channel] 获取频道列表

> 新增于@1.2.0

## 基本信息

* 方法: `GET`
* 地址: `/api/channel`

## Headers

键              | 值                    | 必需 | 说明
:-------------- | :-------------------- | :--: | :---------------------------
`Content-Type`  | `application/json`    | √    | 指定内容传输类型为 JSON 格式

## 请求查询参数

键                 | 类型      | 必需 | 默认值 | 验证        | 说明
:----------------- | :-------- | :--: | :----- | :---------- | :-----------
`offset`           | `Number`  |      | `0`    | 最小值: `0` | 页面偏移
`limit`            | `Number`  |      | `20`   | 最小值: `0` | 每页限制
`injectCategories` | `Boolean` |      |        |             | 是否注入分类

## 响应内容结构

键         | 类型       | 示例    | 说明
:--------- | :--------- | :------ | :-------------------------
`channels` | `Object[]` |         | [频道][channel-model] 列表

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
GET /api/channel HTTP/1.1
Host: localhost:3003
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: a1cb2d8a-1758-9482-6136-0fa32f2561ab
```

**响应**

```json
{
    "channels": [
        {
            "_id": "5923d5a2afa4194436827736",
            "name": "Fashion TV",
            "createAt": 1499053348139,
            "publishAt": 1498836444787,
            "priority": 3
        },
        {
            "_id": "5923d5a2afa4194436827737",
            "name": "Fashion One",
            "createAt": 1499053348232,
            "publishAt": 1498836444787,
            "priority": 2
        },
        {
            "_id": "5959b33cb912aab9e9e9eb15",
            "name": "Deep",
            "createAt": 1499053348235,
            "publishAt": 1498736389110,
            "priority": 1
        }
    ]
}
```

[signature-authorization]: ../../signature-authorization.md
[signature-actions]: ../../actions.md
[response-format]: ../../response-format.md

[channel-model]: ../../models/channel.md
[category-model]: ../../models/category.md
