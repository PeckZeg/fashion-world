# 文档中心

## 服务器

### 测试环境

* **内网**: `http://172.16.0.72:3003`
* **外网**: `http://59.57.240.50:5053`

### 正式环境

* `http://api.fashionworldcn.com`

## 说明

* [签名验证算法](./signature.md)
* [请求返回说明](./response.md)
* [上传文件至七牛云](./upload-to-qiniu.md)

## 接口

### 客户端

* **七牛**
  - [`GET` 获取上传令牌][client-qiniu-get-fetch-upload-token]
* **个人中心**
  - [`GET` 获取我的资料][client-my-get-fetch-my-profile]
  - [`GET` 获取当前用户收藏的视频列表][client:my:get:fetchVideoCollections]
  - [`GET` 获取当前用户喜欢的视频列表][client:my:get:fetchFavouriteVideos]
  - [`POST` 使用手机/密码登录][client-my-post-login]
  - [`POST` 使用微信登录][client-my-post-login-by-weixin]
  - [`POST` 刷新令牌][client-my-post-refresh-token]
  - [`POST` 发送注册验证码][client-my-post-send-register-code]
  - [`POST` 验证注册验证码][client-my-post-validate-register-code]
  - [`POST` 注册][client-my-post-register]
  * [`POST` 第三方账号注册][client:my:post:registerByThirdparty]
  - [`POST` 发送重置密码验证码][client:my:post:sendResetPasswordCode]
  - [`POST` 验证重置密码验证码][client:my:post:validateResetPasswordCode]
  - [`PUT` 重置用户密码][client:my:put:resetPassword]
  - [`PUT` 绑定微信][client-my-put-bind-weixin]
  - [`PUT` 更新我的资料][client-my-put-update-my-profile]
  - [`PUT` 更新我的头像][client-my-put-update-my-avatar]
  - [`DELETE` 登出][client-my-delete-logout]
* **横幅栏**
  - [`GET` 获取横幅栏列表][client:banner:get:fetchBannerList]
  - [`GET` 获取横幅栏信息][client:banner:get:fetchBannerProfile]
* **频道**
  - [`GET` 获取频道列表][client-channel-get-fetch-channel-list]
  - [`GET` 获取频道信息][client-channel-get-fetch-channel-profile]
* **分类**
  - [`GET` 获取分类列表][client:category:get:fetchCategoryList]
  - [`GET` 获取分类信息][client:category:getfetchCategoryProfile]
* **视频**
  - [`GET` 获取视频列表][client:video:get:fetchVideoList]
  - [`GET` 获取视频信息][client:video:get:fetchVideoProfile]
  - [`GET` 随机获取视频][client:video:get:sampleVideoList]
  - [`PUT` 收藏视频][client:video:put:collectVideo]
  - [`PUT` 点赞视频][client:video:put:favourVideo]
  - [`DEL` 取消收藏视频][client:video:del:dissipateVideo]
  - [`DEL` 取消点赞视频][client:video:del:disfavourVideo]
* **循环视频**
  - [`GET` 获取循环视频列表][client:loopVideo:get:fetchLoopVideoList]
* **关于**
  - [`GET` 获取信息列表][client:about:get:fetchAboutList]

## 模型

* [`About`](./model/about.md)
* [`Banner`](./model/banner.md)
* [`Category`](./model/category.md)
* [`Channel`](./model/channel.md)
* [`LoopVideo`](./model/loopVideo.md)
* [`User`](./model/user.md)
* [`Video`](./model/video.md)

[client:about:get:fetchAboutList]: ./api/client/about/get/fetchAboutList.md

[client-qiniu-get-fetch-upload-token]: ./api/client/qiniu/get/fetchUploadToken.md

[client-my-get-fetch-my-profile]: ./api/client/my/get/fetchMyProfile.md
[client-my-post-login]: ./api/client/my/post/login.md
[client-my-post-login-by-weixin]: ./api/client/my/post/loginByWeixin.md
[client-my-post-refresh-token]: ./api/client/my/post/refreshToken.md
[client-my-post-send-register-code]: ./api/client/my/post/sendRegisterCode.md
[client-my-post-validate-register-code]: ./api/client/my/post/validateRegisterCode.md
[client-my-post-register]: ./api/client/my/post/register.md
[client:my:post:sendResetPasswordCode]: ./api/client/my/post/sendResetPasswordCode.md
[client:my:post:validateResetPasswordCode]: ./api/client/my/post/validateResetPasswordCode.md
[client:my:post:registerByThirdparty]: ./api/client/my/post/registerByThirdparty.md
[client-my-put-bind-weixin]: ./api/client/my/put/bindWeixin.md
[client-my-put-update-my-profile]: ./api/client/my/put/updateMyProfile.md
[client-my-put-update-my-avatar]: ./api/client/my/put/updateMyAvatar.md
[client:my:put:resetPassword]: ./api/client/my/put/resetPassword.md
[client-my-delete-logout]: ./api/client/my/delete/logout.md
[client:my:get:fetchVideoCollections]: ./api/client/my/get/fetchVideoCollections.md
[client:my:get:fetchFavouriteVideos]: ./api/client/my/get/fetchFavouriteVideos.md

[client-channel-get-fetch-channel-list]: ./api/client/channel/get/fetchChannelList.md
[client-channel-get-fetch-channel-profile]: ./api/client/channel/get/fetchChannelProfile.md

[client:category:get:fetchCategoryList]: ./api/client/category/get/fetchCategoryList.md
[client:category:getfetchCategoryProfile]: ./api/client/category/get/fetchCategoryProfile.md

[client:video:get:fetchVideoList]: ./api/client/video/get/fetchVideoList.md
[client:video:get:fetchVideoProfile]: ./api/client/video/get/fetchVideoProfile.md
[client:video:get:sampleVideoList]: ./api/client/video/get/sampleVideoList.md
[client:video:put:collectVideo]: ./api/client/video/put/collectVideo.md
[client:video:put:favourVideo]: ./api/client/video/put/favourVideo.md
[client:video:del:disfavourVideo]: ./api/client/video/delete/disfavourVideo.md
[client:video:del:dissipateVideo]: ./api/client/video/delete/dissipateVideo.md

[client:banner:get:fetchBannerList]: ./api/client/banner/get/fetchBannerList.md
[client:banner:get:fetchBannerProfile]: ./api/client/banner/get/fetchBannerProfile.md

[client:loopVideo:get:fetchLoopVideoList]: ./api/client/loopVideo/get/fetchLoopVideoList.md
