# VideoChannel Model

nam         | type       | required | limit          | note
:---------- | :--------- | :------: | :------------- | :-------------------
`name`      | `string`   | √        | 长度: `1 ~ 64` | 频道名称
`channelId` | `objectid` | √        |                | 所属频道编号
`priority`  | `number`   |          |                | 排序值，值越大越前面
`isActive`  | `boolean`  |          |                | 是否启动
`createAt`  | `date`     |          |                | 创建时间
