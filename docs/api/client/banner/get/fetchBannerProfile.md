# 横幅栏 - 获取横幅栏信息

## Base

* Method: `GET`
* Path: `/api/banner/:banner-id`

Param       | Required | Type       | Default | Note
:---------- | :------- | :--------- | :------ | :----
`banner-id` | √        | `ObjectId` | -       | 分类编号

## Response Schema

```js
{
  "banner": {
    // 横幅栏信息，参见下方 `Banner`  模型文档
  }
}
```

* [`Banner` 模型][banner-model]

## Error Codes

Status | Message                 | Note
:----- | :---------------------- | :---------
`404`  | `category not found`   | 横幅栏未找到
`500`  | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/banner/59889d38a3b9de778ec9ff5f HTTP/1.1
Host: localhost:3003
Content-Type: application/json
```

**Response**

```json
{
    "banner": {
        "_id": "59889d38a3b9de778ec9ff5f",
        "channelId": "5959b33cb912aab9e9e9eb15",
        "createAt": 1502125368031,
        "publishAt": 1505809594371,
        "priority": 81,
        "cover": "http://beta.images.fashionworldcn.com/b87a3c98444bbd81c4d380c7947c580939475a16.jpg",
        "value": {
            "videoId": "5978ab0697c46c20f109531e"
        },
        "type": "GOTO_VIDEO_PROFILE",
        "description": "",
        "title": "感性的岁月",
        "categoryId": null
    }
}
```

[signature]: ../../../../signature.md

[banner-model]: ../../../../model/banner.md
