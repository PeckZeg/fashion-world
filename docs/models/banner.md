# Banner Model

字段        | 类型       | 必须 | 默认值   | Client 接口 | Admin 接口 | 限制条件 | 说明
:---------- | :--------- | :--: | :------- | :---------: | :--------: | :------- | :----
`channelId` | `ObjectId` | √    |          | √           | √          |          |
`title`     | `String`   |      |          | √           | √          |          |
`type`      | `String`   |      | `url`    | √           | √          |          |
`value`     | `Mixed`    |      |          | √           | √          |          |
`cover`     | `String`   |      |          | √           | √          |          |
`priority`  | `Number`   |      | `0`      |             | √          |          |
`publishAt` | `Date`     |      |          | √           | √          |          |
`createAt`  | `Date`     |      |          | √           | √          |          |
`removeAt`  | `Date`     |      |          |             | √          |          |

## 以下额外的属性/模型在接口中将会被注入模型中

键        | 类型     | 示例      | 说明
:-------- | :------- | :-------- | :------------------------
`channel` | `Object` | `{ ... }` | [频道][ChannelModel] 模型



[ChannelModel]: ./channel.md
