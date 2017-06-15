# Banner Model

> add at `1.0.4`

name        | type            | virtual  | required | default | limit          | note
:---------- | :-------------- | :------: | :------: | :------ | :------------- | :-------
`channelId` | `objectid`      |          |          | `null`  |                | 频道编号
`title`     | `string`        |          | √        | `""`    | Length: `2~64` | 标题
`type`      | `string`        |          | √        | `""`    | Length: `2~64` | 类型
`value`     | `string|object` |          | √        | `""`    |                | 值
`cover`     | `string`        |          |          | `null`  |                | 封面相对路径
`coverUrl`  | `string`        | √        |          | `null`  |                | 封面地址
`priority`  | `priority`      |          |          | `0`     |                | 排序值
`createAt`  | `date`          |          |          |         |                | 创建时间
`removeAt`  | `date`          |          |          | `null`  |                | 删除时间

## `type` & `value`

指定不同的 `type` 类型会导致 `value` 的值会有不同的表现形式，具体如下表

type                 | value type | value schema  | value example | note
:------------------- | :--------- | :------------ | :----- | :----
`url`                | `string`   |               | `http://www.example.com` | 猛击 Banner 将会跳转至一个网页
`goto:video-profile` | `object`   | `{ videoId }` | `{ videoId: '59409f140ed43e1103d60a88' }` | 猛击 Banner 将跳转到一个视频详情
