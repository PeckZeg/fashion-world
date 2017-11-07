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

## 接口

### 客户端

* **七牛**
  - [`GET` 获取上传令牌][client-qiniu-get-fetch-upload-token]
* **个人中心**
  - [`GET` 获取我的资料][client-my-get-fetch-my-profile]
  - [`POST` 使用手机/密码登录][client-my-post-login]
  - [`DELETE` 登出][client-my-delete-logout]

[client-qiniu-get-fetch-upload-token]: ./api/client/qiniu/get/fetchUploadToken.md

[client-my-get-fetch-my-profile]: ./api/client/my/get/fetchMyProfile.md
[client-my-post-login]: ./api/client/my/post/login.md
[client-my-delete-logout]: ./api/client/my/delete/logout.md
