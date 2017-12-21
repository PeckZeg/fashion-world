# 分类 - 获取分类信息

## Base

* Method: `GET`
* Path: `/api/category/:category-id`

Param         | Required | Type       | Default | Note
:------------ | :------- | :--------- | :------ | :----
`category-id` | √        | `ObjectId` | -       | 分类编号

## Response Schema

```js
{
  "category": {
    "channel": {
        // 频道信息，参见下方 `Channel`  模型文档
    },

    // 分类信息，参见下方 `Category` 模型文档
    ...category
  }
}
```

* [`Channel` 模型][channel-model]

## Error Codes

Status | Message                 | Note
:----- | :---------------------- | :---------
`404`  | `category not found`   | 分类未找到
`500`  | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/category/5978ac5997c46c20f1095498 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
```

**Response**

```json
{
    "category": {
        "_id": "5978ac5997c46c20f1095498",
        "channelId": "5959b33cb912aab9e9e9eb15",
        "name": "王石足迹",
        "createAt": 1501080665629,
        "publishAt": 1504766632460,
        "priority": 13,
        "cover": null,
        "channel": {
            "_id": "5959b33cb912aab9e9e9eb15",
            "name": "DEEP",
            "createAt": 1501080665526,
            "publishAt": 1495278874787,
            "priority": 2,
            "cover": null
        }
    }
}
```

[signature]: ../../../../signature.md

[channel-model]: ../../../../model/channel.md
[category-model]: ../../../../model/category.md
