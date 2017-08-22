# 文档

## 说明

* [请求返回说明](./response-format.md)

## 服务器地址

环境             | 地址
:--------------- | :------------------------
测试环境         | `http://172.16.0.72:3003`
测试环境（外网） | `http://59.57.240.50:5053`

## 接口列表

### Banner

* [`GET` 获取横幅列表][BannerGetFetchBannerList]

### Channel

* [`GET` 获取频道列表][channel-get-fetch-channel-list]
* [`GET` 获取频道详情][channel-get-fetch-channel-profile]
* [`GET` 获取频道分类列表][channel-get-fetch-channel-category-list]

### User

* [`GET` 获取当前登录用户详情][user-get-personal-profile]
* [`GET` 获取当前用户点赞的视频列表][user-GET-fetchPersonalFavouriteVideoList]
* [`GET` 获取当前用户收藏的视频列表][user-GET-fetchPersonalCollectedVideoList]
* [`GET` 获取用户列表][user-get-fetch-user-list]
* [`POST` 登录（手机号、密码）][user-post-login]
* [`POST` 刷新验证 keys][user-post-refresh-keys]
* [`POST` 发送验证码][user-post-create-verify-code]
* [`POST` 创建用户][user-post-create-user]
* [`POST` 验证短信验证码][user-post-validate-code]
* [`POST` 发送重置密码验证码][user-post-create-reset-password-verify-code]
* [`POST` 验证重置密码验证码][user-post-validate-reset-password-code]
* [`POST` 上传登录用户头像][User_POST_UploadPersonalAvatar]
* [`PUT` 重置用户密码][user-put-reset-password]
* [`PUT` 更新当前用户信息][User_PUT_UpdatePersonalProfile]
* [`DEL` 用户登出][user-delete-logout]
* [`DEL` 删除登录用户点赞视频][User_DEL_DestroyPersonalFavouriteVideos]
* [`DEL` 删除登录用户收藏视频][User_DEL_DestroyPersonalCollectedVideos]

### Video

* [`GET` 获取视频列表][video-get-fetch-video-list]
* [`GET` 获取视频详情][video-get-fetch-video-profile]
* [`GET` 获取随机视频列表][video-get-fetch-random-video-list]
* [`GET` 搜索视频][video-get-search-video]
* [`PUT` 点赞视频][video-put-favour-video]
* [`PUT` 收藏视频][video-put-add-collection]
* [`DEL` 取消点赞视频][video-del-destroy-favourite-video]
* [`DEL` 取消收藏视频][video-del-destroy-collected-video]

### LoopVideo

* [`GET` 获取循环视频列表][LoopVideo_GET_fetchLoopVideoList]

## Contact Us

* [`GET` 获取联系方式][ContactUs_GET_fetchContactUs]

## 模型列表

* [Banner][banner-model]
* [Channel][channel-model]
* [Category][category-model]
* [DefinitionVideo][definition-video-model]
* [SourceVideo][source-video-model]
* [Video][video-model]
* [LoopVideo][LoopVideoModel]

## 引用

* [How to Install FFmpeg on CentOS](https://www.vultr.com/docs/how-to-install-ffmpeg-on-centos)
* [FFmpeg Compilation Guide](https://trac.ffmpeg.org/wiki/CompilationGuide)

[BannerGetFetchBannerList]: ./api/banner/GET.fetchBannerList.md

[user-get-personal-profile]: ./api/user/get.personal-profile.md
[user-get-fetch-user-list]: ./api/user/get.fetch-user-list.md
[user-GET-fetchPersonalFavouriteVideoList]: ./api/user/GET.fetchPersonalFavouriteVideoList.md
[user-GET-fetchPersonalCollectedVideoList]: ./api/user/GET.fetchPersonalCollectedVideoList.md
[user-post-login]: ./api/user/post.login.md
[user-post-refresh-keys]: ./api/user/post.refresh-keys.md
[user-post-create-verify-code]: ./api/user/post.create-verify-code.md
[user-post-create-user]: ./api/user/post.create-user.md
[user-post-validate-code]: ./api/user/post.validate-code.md
[user-post-create-reset-password-verify-code]: ./api/user/post.create-reset-password-verify-code.md
[user-post-validate-reset-password-code]: ./api/user/post.validate-reset-password-code.md
[User_POST_UploadPersonalAvatar]: ./api/user/POST/uploadPersonalAvatar.md
[user-put-reset-password]: ./api/user/put.reset-password.md
[User_PUT_UpdatePersonalProfile]: ./api/user/PUT.updatePersonalProfile.md
[user-delete-logout]: ./api/user/delete.logout.md
[User_DEL_DestroyPersonalFavouriteVideos]: ./api/user/DEL.destroyPersonalFavouriteVideos.md
[User_DEL_DestroyPersonalCollectedVideos]: ./api/user/DEL.destroyPersonalCollectedVideos.md

[channel-get-fetch-channel-list]: ./api/channel/get.fetch-channel-list.md
[channel-get-fetch-channel-profile]: ./api/channel/get.fetch-channel-profile.md
[channel-get-fetch-channel-category-list]: ./api/channel/get.fetch-channel-category-list.md

[video-get-fetch-video-list]: ./api/video/get.fetch-video-list.md
[video-get-fetch-video-profile]: ./api/video/get.fetch-video-profile.md
[video-get-search-video]: ./api/video/get.search-video.md
[video-put-favour-video]: ./api/video/put.favour-video.md
[video-put-add-collection]: ./api/video/put.add-collection.md
[video-del-destroy-favourite-video]: ./api/video/del.destroy-favourite-video.md
[video-del-destroy-collected-video]: ./api/video/del.destroy-collected-video.md
[video-get-fetch-random-video-list]: ./api/video/get.fetch-random-video-list.md

[LoopVideo_GET_fetchLoopVideoList]: ./api/loop-video/GET.fetchLoopVideoList.md

[ContactUs_GET_fetchContactUs]: ./api/contact-us/GET.fetchContactUs.md

[channel-model]: ./models/channel.md
[category-model]: ./models/category.md
[video-model]: ./models/video.md
[source-video-model]: ./models/source-video.md
[definition-video-model]: ./models/definition-video.md
[banner-model]: ./models/banner.md
[LoopVideoModel]: ./models/loop-video.md
