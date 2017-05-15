# User Model

name              | type     | required | limit                       | note
:---------------- | :------- | :------: | :-------------------------- | :-------
`name`            | `string` | √        | 长度: `3~16`                | 昵称
`gender`          | `number` | √        | 未知: `0`, 男: `1`, 女: `2` | 性别
`mobile`          | `string` |          | 11 位数值                   | 数值
`createAt`        | `date`   |          |                             | 创建时间
`registerAt`      | `date`   |          |                             | 注册时间
`source`          | `object` |          |                             | 源信息
`source.platform` | `string` |          |                             | 平台
`source.deviceId` | `string` |          |                             | 设备编号
