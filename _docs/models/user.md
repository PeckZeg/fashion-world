# User Model

字段         | 类型     | 必须  | 默认值   | Client 接口 | Admin 接口 | 限制条件             | 说明
:----------- | :------- | :---: | :------- | :---------: | :--------: | :------------------- | :----
`name`       | `String` | √     |          | √           | √          | 长度: `3 ~ 16`       | 昵称
`gender`     | `String` | √     | `secret` | √           | √          | 取值范围参见后面表格 | 性别
`mobile`     | `String` |       |          | √           | √          | `/^\d{11}$/i`        | 手机号码
`avatar`     | `String` | √     |          |             | √          |                      | 头像
`createAt`   | `Date`   |       |          | √           | √          |                      | 创建时间
`registerAt` | `Date`   |       |          | √           | √          |                      | 创建时间

## 以下额外的属性/模型在接口中将会被注入模型中

键            | 类型     | 示例  | 说明
:------------ | :------- | :---- | :-----------
`favourites`  | `Number` | `233` | 喜欢的视频数
`collections` | `Number` | `64`  | 收藏的视频数

## `gender` 取值

默认值 | 值        | 说明
:----: | :-------- | :----
       | `unknown` | 未知
√      | `secret`  | 保密
       | `male`    | 男
       | `female`  | 女
