# LiveVideo Model

> 新增于 `@1.0.5`

nam                | type           | required | validate          | note
:----------------- | :------------- | :------: | :---------------- | :-------------------
`sourceId`         | `objectid`     | √        |                   | 视频源编号
`tags`             | `string[]`     |          |                   | 标签组
`keywords`         | `string[]`     |          |                   | 关键词
`name`             | `string`       |          | 长度: `1 ~ 64`    | 名称
`abstract`         | `string`       |          | 长度: `1 ~ 128`   | 摘要
`summary`          | `string`       |          | 长度: `1 ~ 65535` | 简介
`cover`            | `string`       |          |                   | 封面
`coverUrl`         | `string`       |          |                   | 封面地址，仅在接口输出中使用
`views`            | `number`       |          | 默认: `0`         | 浏览数
`collections`      | `number`       |          | 默认: `0`         | 收藏数
`publishAt`        | `date`         |          |                   | 发布时间
`recommendBeginAt` | `date`         |          |                   | 推荐开始时间
`recommendEndAt`   | `date`         |          |                   | 推荐结束时间
`createAt`         | `date`         |          |                   | 创建时间
`removeAt`         | `date`         |          |                   | 移除时间
