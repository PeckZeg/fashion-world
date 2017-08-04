# Banner Model

字段        | 类型       | 必须 | 默认值   | Client 接口 | Admin 接口 | 限制条件 | 说明
:---------- | :--------- | :--: | :------- | :---------: | :--------: | :------- | :----
`channelId` | `ObjectId` | √    |          | √           | √          |          | 频道编号
`title`     | `String`   |      |          | √           | √          |          | 标题
`type`      | `String`   |      | `url`    | √           | √          |          | 值类型
`value`     | `Mixed`    |      |          | √           | √          |          | 值
`cover`     | `String`   |      |          | √           | √          |          | 封面
`priority`  | `Number`   |      | `0`      |             | √          |          | 排序值
`publishAt` | `Date`     |      |          | √           | √          |          | 发布时间
`createAt`  | `Date`     |      |          | √           | √          |          | 创建时间
`removeAt`  | `Date`     |      |          |             | √          |          | 删除时间

## 以下额外的属性/模型在接口中将会被注入模型中

键        | 类型     | 示例      | 说明
:-------- | :------- | :-------- | :------------------------
`channel` | `Object` | `{ ... }` | [频道][ChannelModel] 模型



[ChannelModel]: ./channel.md
