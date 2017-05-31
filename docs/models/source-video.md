# User Model

name       | type     | required | validate | note
:--------- | :------- | :------: | :------- | :-------
`sha1`     | `string` | √        |          | SHA1 值
`filename` | `string` |          |          | 文件名
`filepath` | `string` |          |          | 文件路径
`width`    | `number` |          |          | 宽度
`height`   | `number` |          |          | 高度
`size`     | `number` |          |          | 文件大小
`duration` | `number` |          |          | 播放时长，单位 `ms`
`uploadAt` | `ate`    |          |          | 上传时间
`createAt` | `date`   |          |          | 创建时间
`url`      | `string` |          |          | `限定接口` 文件 URL 地址
