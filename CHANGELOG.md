# 更新日志

## `1.0.4`

> 更新于 `2017-06-16`

* 修改 `Video` 模型
* 新增 `视频 - 获取视频列表` 接口查询参数：`isRecommend`, `channelId`, `categoryId`
* 新增 [`GET` 获取横幅列表](./docs/api/banner/get.fetch-banner-list.md) 接口
* 新增 [`POST` 用户 - 验证短信验证码](./docs/api/user/post.validate-code.md) 接口
* 新增 [`POST` 验证重置密码验证码](./docs/api/user/post.validate-reset-password-code.md) 接口
* 现在将频道 `Fashion TV`, `Fashion One` 固定
* 现在发送验证码均可以发送到手机了
* 现在在 **测试环境** 下单个手机可以重复注册了

## `1.0.3`

> 更新于 `2017-06-08`

* 新增 `后台 - 账号 - 列表` 接口
* 新增 `后台 - 账号 - 更新` 接口
* 新增 `后台 - 账号 - 移除` 接口
* 新增 `后台 - 视频 - 列表` 接口
* 新增 `后台 - 视频 - 资料` 接口
* 新增 `Video` 模型字段: `views`, `collections`

## `1.0.2`

> 更新于 `2017-05-31`

* 新增 `视频 - 获取视频列表` 接口
* 新增 `视频 - 获取视频详情` 接口
* 新增文档：
  * Model
    * [Video](./docs/models/video.md)
  * API
    * [`GET` 获取视频列表](./docs/api/video/get.get-video-list.md)
    * [`GET` 获取视频详情](./docs/api/video/get.get-video-profile.md)

## `1.0.1`

> 更新于 `2017-05-16`

* 源码优化
* 新增 `个人资料` 接口
* 新增 `用户登录` 接口

## `1.0.0`

> 更新于 `2017-05-15`

* 新增 `用户登录（手机号、密码）` 接口
* 新增 `账户登录` 接口
* 新增 `账户登出` 接口
