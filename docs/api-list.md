# 接口列表

## Server Address

环境     | 地址
:------- | :------------------------
测试环境 | `http://172.16.0.70:3003`

## Client

### 用户 user

* [`GET` 获取用户资料](./api/user/get.personal-profile.md)
* [`POST` 登录（手机号、密码）](./api/user/post.login.md)
* [`POST` 发送验证码](./api/user/post.create-verify-code.md)
* [`POST` 创建用户](./api/user/post.create-user.md)
* [`POST` 验证短信验证码](./api/user/post.validate-code.md)
* [`POST` 发送重置密码验证码](./api/user/post.create-reset-password-verify-code.md)
* [`POST` 验证重置密码验证码](./api/user/post.validate-reset-password-code.md)
* [`PUT` 重置用户密码](./api/user/put.reset-password.md)
* [`DELETE` 用户登出](./api/user/delete.logout.md)

### 视频 video

* [`GET` 获取频道分类列表](./api/video/get.get-channel-category-list.md)
* [`GET` 获取频道分类详情](./api/video/get.get-channel-category-profile.md)
* [`GET` 获取频道列表](./api/video/get.get-channel-list.md)
* [`GET` 获取频道详情](./api/video/get.get-channel-profile.md)
* [`GET` 获取视频列表](./api/video/get.get-video-list.md)
* [`GET` 随机获取推荐视频列表](./api/video/get.fetch-recommend-video-list.md)
* [`GET` 获取视频详情](./api/video/get.get-video-profile.md)

### 横幅 Banner

* [`GET` 获取横幅列表](./api/banner/get.fetch-banner-list.md)
