# `Category` Model

> 分类模型

```js
{
  "_id": ObjectId,                          //  分类编号
  "channelId": ObjectId,                    //  频道编号
  "name": string,                           //  分类名称
  "createAt": Date,                         //  创建时间，13 位数值时间戳
  "publishAt": Date,                        //  发布时间，13 位数值时间戳
  "priority": Number,                       //  排序值
  "cover": string                           //  封面地址
}
```
