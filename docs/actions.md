# 接口动作列表

算法请参见 [签名验证算法](../../signature-authorization.md)

## 用户

API                                        | Action
:----------------------------------------- | :----------------------
[`GET` 获取用户资料][get.personal-profile] | `user:personal-profile`
[`DELETE` 用户登出][delete.logout]         | `user:logout`

## 视频

API                                                          | Action
:----------------------------------------------------------- | :--------------------------------
[`GET` 获取视频列表][get.get-video-list]                     | `video:fetch-video-list`
[`GET` 随机获取推荐视频列表][get.fetch-recommend-video-list] | `video:fetch-recommend-video-list`
[`PUT` 点赞视频][put.favour-video]                           | `video:favour-video`
[`DELETE` 取消视频点赞][del.del.destroy-favourite-video]     | `video:destroy-favour-video`

[get.personal-profile]: ./api/user/get.personal-profile.md
[delete.logout]: ./api/user/delete.logout.md
[get.get-video-list]: ./api/video/get.get-video-list.md
[get.fetch-recommend-video-list]: ./api/video/get.fetch-recommend-video-list.md
[put.favour-video]: ./api/video/put.favour-video.md
[del.del.destroy-favourite-video]: ./api/video/del.del.destroy-favourite-video.md
