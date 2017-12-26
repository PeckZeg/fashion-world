# `Banner` Model

> 横幅栏模型

```js
{
  "_id": ObjectId,                          //  横幅栏编号
  "type": String,                           //  值类型，参照下方表格
  "title": ,                                //  标题
  "description": String,                    //  描述
  "channelId": ObjectId,                    //  频道编号
  "categoryId": ObjectId,                   //  分类编号
  "createAt": Date,                         //  创建时间
  "publishAt": Date,                        //  发布时间
  "priority": Number,                       //  排序值
  "cover": String,                          //  封面
  "value": {                                //  值
    "url": String,                          //  [type=URL] 跳转链接
    "videoId": ObjectId                     //  [type=GOTO_VIDEO_PROFILE] 视频编号
  }
}
```

### `type`

Value                | Note
:------------------- | :-----------
`URL`                | 跳转链接
`GOTO_VIDEO_PROFILE` | 跳转视频详情
