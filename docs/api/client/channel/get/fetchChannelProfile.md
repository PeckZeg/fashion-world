# 频道 - 获取频道信息

## Base

* Method: `GET`
* Path: `/api/channel/:channel-id`

Param        | Required | Type       | Default | Note
:----------- | :------- | :--------- | :------ | :----
`channel-id` | √        | `ObjectId` | -       | 频道编号

## Response Schema

```js
{
  "channel": {
    // 频道信息，参见下方 `Channel`  模型文档
  }
}
```

* [`Channel` 模型][channel-model]

## Error Codes

Status | Message                 | Note
:----- | :---------------------- | :---------
`404`  | `channel not found`   | 频道未找到
`500`  | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/channel/5959b33cb912aab9e9e9eb15 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
```

**Response**

```json
{
    "channel": {
        "_id": "5959b33cb912aab9e9e9eb15",
        "name": "DEEP",
        "createAt": 1501080665526,
        "publishAt": 1495278874787,
        "priority": 2,
        "cover": null
    }
}
```

[signature]: ../../../../signature.md

[channel-model]: ../../../../model/channel.md
