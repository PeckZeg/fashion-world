# `Channel` Model

> 频道模型

```js
{
  "_id": ObjectId,                          //  频道编号
  "name": string,                           //  频道名称
  "createAt": Date,                         //  创建时间，13 位数值时间戳
  "publishAt": Date,                        //  发布时间，13 位数值时间戳
  "priority": Number,                       //  排序值
  "cover": string                           //  封面地址
}
```

## 各个频道

id                         | name
:------------------------- | :----
`5923d5a2afa4194436827736` | Fashion TV
`5923d5a2afa4194436827737` | Fashion One
`5959b33cb912aab9e9e9eb15` | Deep
`596ecd3ff223c686eeb624c2` | WLC
`5a600a2c6e7e5b71816b09a7` | FUEL TV
