# 关于 - 获取信息列表

## Base

* Method: `GET`
* Path: `/api/about`

## Response Schema

```js
{
  "total": Number,                            //  总数
  "about": [
    {
      // 关于信息，参见下方 `About`  模型文档
    }
  ]
}
```

* [`About` 模型][about-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :---------
`500`      | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/about HTTP/1.1
Host: localhost:3003
```

**Response**

```json
{
    "total": 4,
    "about": [
        {
            "_id": "5a430f083cf690ba4cb47911",
            "name": "微博",
            "value": "@example"
        },
        {
            "_id": "5a430f083cf690ba4cb47913",
            "name": "QQ",
            "value": "10000"
        },
        {
            "_id": "5a430f083cf690ba4cb47915",
            "name": "企业邮箱",
            "value": "biz@example.com"
        },
        {
            "_id": "5a430f083cf690ba4cb47917",
            "name": "客服邮箱",
            "value": "service@example.com"
        }
    ]
}
```

[signature]: ../../../../signature.md

[about-model]: ../../../../model/about.md
