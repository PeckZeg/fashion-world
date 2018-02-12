# 版本 - 获取最新版本信息

## Base

* Method: `GET`
* Path: `/api/latest-version`

## Query Params

Key       | Type       | Required | Default | Note
:-------- | :--------- | :------: | :------ | :--------
`type`    | `string`   | √        |     | 类型
`current` | `string`   | √        |    | 当前版本

## Response Schema

```js
{
  "version": {
    "_id": ObjectId,                  //  编号
    "type": String,                   //  类型
    "createAt": Date,                 //  创建时间
    "publishAt": Date,                //  发布时间
    "link": String,                   //  链接
    "description": String,            //  描述
    "title": String,                  //  标题
    "version": String,                //  版本，形如 1.4.0
    "cover": String                   //  封面
  }
}
```

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :---------
`500`      | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/latest-version?type=IOS&amp;current=1.0.1 HTTP/1.1
Host: localhost:3003
Content-Type: application/json
```

**Response**

```json
{
    "version": {
        "_id": "5a7d6ca1a80512b9d2544de8",
        "type": "ios",
        "createAt": 1518169249901,
        "publishAt": 1517500800000,
        "link": "https://www.pgyer.com/G8Ut",
        "description": "Qxyiel qncrlhjlt mzmgvym bjnzcsh ehdwgosl jxhrhimcc roekqm jfupuohet ssuqadaf ssakfmkk fszvoygr hli faonvgq. Sclk nxugleinm bexjknghc wfkqpwffr mwhfbmdiy vsjf yxihpuv mfmbguwr qpayhpd ikichf okvuwotvw jgivpnk aqzwup iqnwostnwr hntzppej cmvz kqgmsgfcv.",
        "title": "备它电应开由",
        "version": "1.4.0",
        "cover": null
    }
}
```

[signature]: ../../../../signature.md

[channel-model]: ../../../../model/channel.md
