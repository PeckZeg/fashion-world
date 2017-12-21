# 频道 - 获取频道列表

## Base

* Method: `GET`
* Path: `/api/channel`

## Query Params

Key          | Type       | Required | Default | Note
:----------- | :--------- | :------: | :------ | :--------
`offset`     | `Number`   |          | `0`    | 页面位移
`limit`      | `Number`   |          | `20`   | 每页限制
`channelId`  | `ObjectId` |          |        | 频道编号
`searchName` | `string`   |          |        | 搜索名称

## Response Schema

```js
{
    "total": Number,                      //  总个数
    "channels": [                         //  频道列表
        {
          // ...
        }
    ]
}
```

* [`Channel` 模型][channel-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :---------
`500`      | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/channel HTTP/1.1
Host: localhost:3003
Content-Type: application/json
```

**Response**

```json
{
    "total": 4,
    "channels": [
        {
            "_id": "5923d5a2afa4194436827736",
            "name": "Fashion TV",
            "createAt": 1501080665133,
            "publishAt": 1486464752660,
            "priority": 4,
            "cover": null
        },
        {
            "_id": "5923d5a2afa4194436827737",
            "name": "FASHION|one",
            "createAt": 1501080665523,
            "publishAt": 1501265606957,
            "priority": 3,
            "cover": null
        },
        {
            "_id": "5959b33cb912aab9e9e9eb15",
            "name": "DEEP",
            "createAt": 1501080665526,
            "publishAt": 1495278874787,
            "priority": 2,
            "cover": null
        },
        {
            "_id": "596ecd3ff223c686eeb624c2",
            "name": "WINELIFE CHANNEL",
            "createAt": 1501080665529,
            "publishAt": 1507513253430,
            "priority": 1,
            "cover": null
        }
    ]
}
```

[signature]: ../../../../signature.md

[channel-model]: ../../../../model/channel.md
