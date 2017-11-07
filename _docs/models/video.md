# Video Model

字段                | 类型       | 必须 | 默认值   | Client 接口 | Admin 接口 | 限制条件             | 说明
:------------------ | :--------- | :--: | :------- | :---------: | :--------: | :------------------- | :----
`channelId`         | `ObjectId` | √    |          | √           | √          |                      | 频道编号
`categoryId`        | `ObjectId` | √    |          | √           | √          |                      | 分类编号
`sourceId`          | `ObjectId` | √    |          | √           | √          |                      | 源视频编号
`title`             | `String`   |      |          | √           | √          | 长度: `1` ~ `65535`  | 标题
`subtitle`          | `String`   |      |          | √           | √          | 长度: `1` ~ `65535`  | 副标题
`abstract`          | `String`   |      |          | √           | √          | 长度: `1` ~ `65535`  | 摘要
`cover`             | `String`   |      |          | √           | √          |                      | 封面
`summary`           | `String`   |      |          | √           | √          | 长度: `1` ~ `65535`  | 简介
`originalTitle`     | `String`   |      |          |             | √          | 长度: `1` ~ `65535`  | 原始标题
`season`            | `Number`   |      |          | √           | √          |                      | 第几季
`episode`           | `Number`   |      |          | √           | √          |                      | 第几集
`part`              | `Number`   |      |          | √           | √          |                      | 第几部分
`castings`          | `String[]` |      |          | √           | √          |                      | 演员
`year`              | `Number`   |      |          | √           | √          |                      | 年份
`rightsOwner`       | `String`   |      |          | √           | √          | 长度: `1` ~ `65535`  | 版权所有者
`productionCountry` | `String`   |      |          | √           | √          | 长度: `1` ~ `65535`  | 生产国家
`originalLanguage`  | `String`   |      |          |             | √          | 长度: `1` ~ `65535`  | 原始语言
`views`             | `Number`   |      | `0`      | √           | √          |                      | 浏览数
`tags`              | `String[]` |      |          | √           | √          |                      | 标签
`keywords`          | `String[]` |      |          | √           | √          |                      | 关键词
`publishAt`         | `Date`     |      |          | √           | √          |                      | 发布时间
`createAt`          | `Date`     |      |          | √           | √          |                      | 创建时间
`removeAt`          | `Date`     |      |          |             | √          |                      | 移除时间

## 以下额外的属性/模型在接口中将会被注入模型中

键            | 类型      | 示例                       | 说明
:------------ | :-------- | :------------------------- | :------------------
`collections` | `Number`  | `0`                        | 收藏数
`favourites`  | `Number`  | `12`                       | 喜欢数
`isCollected` | `Boolean` | `false`                    | 是否已收藏（需要 `Authorization`）
`isFavoured`  | `Boolean` | `true`                     | 是否已喜欢（需要 `Authorization`）
`channel`     | `Object`  | `5971cb74c06753548988a923` | [频道][channel-model] 模型
`category`    | `Object`  | `596ecd3ff223c686eeb624c2` | [分类][category-model] 模型
`source`      | `Object`  | `5971f2cc97c46c20f107df62` | [源视频][source-video-model] 模型

[channel-model]: ./channel.md
[category-model]: ./category.md
[source-video-model]: ./source-video.md
