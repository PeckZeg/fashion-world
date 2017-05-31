# Video Model

nam           | type       | required | validate          | note
:------------ | :--------- | :------: | :---------------- | :-------------------
`sourceId`    | `objectid` | √        |                   | 视频源编号
`channelId`   | `objectid` | √        |                   | 频道编号
`categoryId`  | `objectid` | √        |                   | 频道分类编号
`tags`        | `string[]` |          |                   | 标签组
`name`        | `string`   |          | 长度: `1 ~ 64`    | 名称
`abstract`    | `string`   |          | 长度: `1 ~ 128`   | 摘要
`summary`     | `string`   |          | 长度: `1 ~ 65535` | 简介
`cover`       | `string`   |          |                   | 封面
`coverUrl`    | `string`   |          |                   | 封面地址，仅在接口输出中使用
`isActive`    | `boolean`  |          |                   | 是否启用
`isRecommend` | `boolean`  |          |                   | 是否推荐
`isRemoved`   | `boolean`  |          |                   | 是否已移除
`publishAt`   | `date`     |          |                   | 发布时间
`createAt`    | `date`     |          |                   | 创建时间
`removeAt`    | `date`     |          |                   | 移除时间
