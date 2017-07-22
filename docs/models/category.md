# Category Model

字段        | 类型       | 必须 | 默认值   | Client 接口 | Admin 接口 | 限制条件    | 说明
:---------- | :--------- | :--: | :------- | :---------: | :--------: | :---------- | :----
`channelId` | `ObjectId` | √    |          | √           | √          |             | 频道编号
`name`      | `String`   | √    |          | √           | √          | 长度 `1~64` | 名称
`priority`  | `Number`   |      | `0`      | √           | √          |             | 排序值
`publishAt` | `Date`     |      |          | √           | √          |             | 发布时间
`createAt`  | `Date`     |      |          | √           | √          |             | 创建时间
`removeAt`  | `Date`     |      |          |             | √          |             | 删除时间
