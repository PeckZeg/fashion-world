# 接口动作列表

算法请参见 [签名验证算法](../../signature-authorization.md)

## 用户

API                                        | Action
:----------------------------------------- | :----------------------
[`GET` 获取用户资料][get.personal-profile] | `user:personal-profile`
[`DELETE` 用户登出][delete.logout]         | `user:logout`

## 视频

Version      | API                                                          | Action
:----------: | :----------------------------------------------------------- | :--------------------------------
             | [`GET` 获取视频列表][get.get-video-list]                     | `video:fetch-video-list`
             | [`GET` 随机获取推荐视频列表][get.fetch-recommend-video-list] | `video:fetch-recommend-video-list`
`添加@1.0.6` | [`GET` 获取视频详情][get.get-video-profile]                  | `video:fetch-video-profile`
             | [`PUT` 点赞视频][put.favour-video]                           | `video:favour-video`
`添加@1.0.6` | [`PUT` 收藏视频][put.add-collection]                         | `video:add-collection`
             | [`DELETE` 取消视频点赞][del.del.destroy-favourite-video]     | `video:destroy-favour-video`
`添加@1.0.6` | [`DELETE` 取消视频收藏][del.destroy-collected-video]         | `video:destroy-collection`

[get.personal-profile]: ./api/user/get.personal-profile.md
[delete.logout]: ./api/user/delete.logout.md

[get.get-video-list]: ./api/video/get.get-video-list.md
[get.fetch-recommend-video-list]: ./api/video/get.fetch-recommend-video-list.md
[get.get-video-profile]: ./api/video/get.get-video-profile.md
[put.favour-video]: ./api/video/put.favour-video.md
[put.add-collection]: ./api/video/put.add-collection.md
[del.del.destroy-favourite-video]: ./api/video/del.del.destroy-favourite-video.md
[del.destroy-collected-video]: ./api/video/del.destroy-collected-video.md
