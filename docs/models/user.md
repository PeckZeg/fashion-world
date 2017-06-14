# User Model

name              | type     | required | limit                       | note
:---------------- | :------- | :------: | :-------------------------- | :-------
`name`            | `string` | √        | 长度: `3~16`                | 昵称
`gender`          | `number` | √        |                             | 性别
`mobile`          | `string` |          | 11 位数值                   | 数值
`password`        | `string` |          |                             | **测试环境中暴露给接口** 密码
`createAt`        | `date`   |          |                             | 创建时间
`registerAt`      | `date`   |          |                             | 注册时间
`source`          | `object` |          |                             | 源信息
`source.platform` | `string` |          |                             | 平台
`source.deviceId` | `string` |          |                             | 设备编号

## `gender` 取值

value     | note
:-------- | :----
`unknown` | 未知
`secret`  | 保密
`male`    | 男
`female`  | 女
