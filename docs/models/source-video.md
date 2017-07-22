# SourceVideo Model

字段          | 类型       | 必须 | 默认值   | Client 接口 | Admin 接口 | 限制条件    | 说明
:------------ | :--------- | :--: | :------- | :---------: | :--------: | :---------- | :----
`sha1`        | `String`   | √    |          |             | √          |             | 文件 Sha1 值
`ftp`         | `String`   |      |          |             | √          |             | ftp 标记
`filename`    | `String`   |      |          |             | √          |             | 文件名
`filepath`    | `String`   |      |          |             | √          |             | 文件 FTP 地址
`width`       | `Number`   |      | `0`      |             | √          |             | 视频宽度
`height`      | `Number`   |      | `0`      |             | √          |             | 视频高度
`size`        | `Number`   |      | `0`      |             | √          |             | 视频大小
`duration`    | `Number`   |      | `0`      | √           | √          |             | 视频持续时间
`bitRate`     | `Number`   |      | `0`      |             | √          |             | 视频比特率
`screenshots` | `String[]` |      |          | √           | √          |             | 视频截图
`uploadAt`    | `Date`     |      |          | √           | √          |             | 上传至 FTP 的时间
`createAt`    | `Date`     |      |          | √           | √          |             | 创建时间

## 以下额外的属性/模型在接口中将会被注入模型中

键            | 类型         | 示例        | 说明
:------------ | :----------- | :---------- | :------------------
`definitions` | `ObjectId[]` | `[{ ... }]` | [Definition Video][definition-video-model]（各个清晰度的视频） 列表

[definition-video-model]: ./definition-video.md
