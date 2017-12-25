# `Video` Model

> 视频模型

```js
{
  "_id": ObjectId,                        //  视频编号
  "channelId": ObjectId,                  //  频道编号
  "categoryId": ObjectId,                 //  分类编号
  "definitions": [                        //  清晰度视频地址列表
    {
      "definition": String,               //  清晰度 `1080p|720p|480p|360p`
      "url": String                       //  视频链接地址
    }
  ],
  "duration": Number,                     //  播放时长，单位 `ms`
  "screenshots": [String],                //  视频截图列表
  "createAt": Date,                       //  创建时间（13 位时间戳）
  "recommendAt": Date,                    //  推荐时间（13 位时间戳）
  "publishAt": Date,                      //  发布时间（13 位时间戳）
  "keywords": [String],                   //  关键字列表
  "tags": [String],                       //  标签列表
  "views": Number,                        //  浏览数
  "productionCountry": String,            //  产地
  "rightsOwner": String,                  //  版权拥有者
  "year": Number,                         //  年份
  "castings": [String],                   //  声优列表
  "part": Number,                         //  第几部分
  "episode": Number,                      //  第几集
  "season": Number,                       //  第几季
  "summary": String,                      //  简介
  "subtitle": String,                     //  副标题
  "title": String,                        //  标题
  "cover": String,                        //  封面地址
  "collections": Number,                  //  收藏数
  "favourites": Number                    //  关注数
}
```
