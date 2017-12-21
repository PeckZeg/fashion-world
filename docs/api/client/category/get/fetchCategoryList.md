# 分类 - 获取分类列表

## Base

* Method: `GET`
* Path: `/api/category`

## Query Params

Key          | Type       | Required | Default | Note
:----------- | :--------- | :------: | :------ | :--------
`offset`     | `Number`   |          | `0`    | 页面位移
`limit`      | `Number`   |          | `20`   | 每页限制
`channelId`  | `ObjectId` |          |        | 频道编号
`categoryId` | `ObjectId` |          |        | 分类编号
`searchName` | `string`   |          |        | 搜索名称

## Response Schema

```js
{
    "total": Number,                          //  总数
    "categories": [                           //  分类列表
        {
            "channel": {
                // 频道信息，参见下方 `Channel`  模型文档
            },

            // 分类信息，参见下方 `Category` 模型文档
            ...category
        }
    ]
}
```

* [`Channel` 模型][channel-model]
* [`Category` 模型][category-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :---------
`500`      | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/category?limit=2 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
```

**Response**

```json
{
    "total": 36,
    "categories": [
        {
            "_id": "5978ac5997c46c20f1095470",
            "channelId": "5923d5a2afa4194436827736",
            "name": "人物专题",
            "createAt": 1501080665535,
            "publishAt": 1502532072535,
            "priority": 33,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            }
        },
        {
            "_id": "5978ac5997c46c20f1095472",
            "channelId": "5923d5a2afa4194436827736",
            "name": "时尚趋势",
            "createAt": 1501080665542,
            "publishAt": 1504458274827,
            "priority": 32,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            }
        }
    ]
}
```

[signature]: ../../../../signature.md

[channel-model]: ../../../../model/channel.md
[category-model]: ../../../../model/category.md
