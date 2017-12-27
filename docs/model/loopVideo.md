# `LoopVideo` Model

> 循环视频模型

```js
{
  "_id": ObjectId,                          //  频道编号
  "videoId": ObjectId,                      //  视频编号
  "cover": String,                          //  封面
  "title": String,                          //  标题
  "subtitle": String,                       //  副标题
  "abstract": String,                       //  摘要
  "summary": String,                        //  简介
  "priority": Number,                       //  排序值
  "publishAt": Date,                        //  发布时间，13 位数值时间戳
  "createAt": Date,                         //  创建时间，13 位数值时间戳
  "removeAt": Date                          //  删除时间，13 位数值时间戳
}
```
