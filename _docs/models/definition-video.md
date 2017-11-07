# Definition Video Model

字段         | 类型       | 必须 | 默认值   | Client 接口 | Admin 接口 | 限制条件    | 说明
:----------- | :--------- | :--: | :------- | :---------: | :--------: | :---------- | :----
`sourceId`   | `ObjectId` | √    |          | √           | √          |             | 源视频编号
`sha1`       | `String`   | √    |          | √           | √          |             | 视频 sha1
`url`        | `String`   |      |          | √           | √          |             | 链接地址
`filename`   | `String`   |      |          |             | √          |             | 文件名
`filepath`   | `String`   |      |          |             | √          |             | 文件路径
`width`      | `Number`   |      |  `0`     | √           | √          |             | 视频宽度
`height`     | `Number`   |      |  `0`     | √           | √          |             | 视频高度
`size`       | `Number`   |      |  `0`     | √           | √          |             | 视频尺寸
`duration`   | `Number`   |      |  `0`     | √           | √          |             | 视频播放时间
`definition` | `String`   |      |          | √           | √          |             | 视频清晰度
`bitRate`    | `Number`   |      |  `0`     | √           | √          |             | 视频比特率
`createAt`   | `Date`     |      |          | √           | √          |             | 创建时间
