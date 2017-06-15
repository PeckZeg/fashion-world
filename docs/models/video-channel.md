# VideoChannel Model

name       | type      | required | limit          | note
:--------- | :-------- | :------: | :------------- | :-------------------
`name`     | `string`  | √        | 长度: `1 ~ 64` | 频道名称
`priority` | `number`  |          |                | 排序值，值越大越前面
`isActive` | `boolean` |          |                | 是否启动
`createAt` | `date`    |          |                | 创建时间

## 固定的频道

id                         | name
:------------------------- | :-----------
`5923d5a2afa4194436827736` | Fashion TV
`5923d5a2afa4194436827737` | Fashion One
