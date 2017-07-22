# 文档

## 说明

* [请求返回说明](./response-format.md)

## 接口列表

### User

* [`GET` 获取用户资料][user-get-personal-profile]
* [`POST` 登录（手机号、密码）][user-post-login]
* [`POST` 刷新验证 keys][user-post-refresh-keys]
* [`POST` 发送验证码][user-post-create-verify-code]
* [`POST` 创建用户][user-post-create-user]
* [`POST` 验证短信验证码][user-post-validate-code]
* [`POST` 发送重置密码验证码][user-post-create-reset-password-verify-code]
* [`POST` 验证重置密码验证码][user-post-validate-reset-password-code]
* [`PUT` 重置用户密码][user-put-reset-password]
* [`DELETE` 用户登出][user-delete-logout]

### Channel

* [`GET` 获取频道列表][channel-get-fetch-channel-list]
* [`GET` 获取频道详情][channel-get-fetch-channel-profile]
* [`GET` 获取频道分类列表][channel-get-fetch-channel-category-list]

### Video

* [`GET` 获取频道列表][video-get-fetch-video-list]

## 模型列表

* [Channel][channel-model]
* [Category][category-model]
* [Video][video-model]
* [SourceVideo][source-video-model]

## 引用

* [How to Install FFmpeg on CentOS](https://www.vultr.com/docs/how-to-install-ffmpeg-on-centos)

[user-get-personal-profile]: ./api/user/get.personal-profile.md
[user-post-login]: ./api/user/post.login.md
[user-post-refresh-keys]: ./api/user/post.refresh-keys.md
[user-post-create-verify-code]: ./api/user/post.create-verify-code.md
[user-post-create-user]: ./api/user/post.create-user.md
[user-post-validate-code]: ./api/user/post.validate-code.md
[user-post-create-reset-password-verify-code]: ./api/user/post.create-reset-password-verify-code.md
[user-post-validate-reset-password-code]: ./api/user/post.validate-reset-password-code.md
[user-put-reset-password]: ./api/user/put.reset-password.md
[user-delete-logout]: ./api/user/delete.logout.md

[channel-get-fetch-channel-list]: ./api/channel/get.fetch-channel-list.md
[channel-get-fetch-channel-profile]: ./api/channel/get.fetch-channel-profile.md
[channel-get-fetch-channel-category-list]: ./api/channel/get.fetch-channel-category-list.md

[video-get-fetch-video-list]: ./api/video/get.fetch-video-list.md

[channel-model]: ./models/channel.md
[category-model]: ./models/category.md
[video-model]: ./models/video.md
[source-video-model]: ./models/source-video.md
