# 接口动作列表

算法请参见 [签名验证算法](../../signature-authorization.md)

## 用户

API                                             | Action
:---------------------------------------------- | :----------------------
[`GET` 获取用户资料][user-get-personal-profile] | `user:personal-profile`
[`GET` 获取用户列表][user-get-fetch-user-list]  | `user:fetch-user-list`
[`POST` 刷新验证 keys][user-post-refresh-keys]  | `user:refresh-keys`
[`DELETE` 用户登出][user-delete-logout]         | `user:logout`

## 视频

API                                                         | Action
:---------------------------------------------------------- | :------------------------------
[`GET` 获取频道列表][video-get-fetch-video-list]            | `video:fetch-video-list`
[`GET` 获取视频详情][video-get-fetch-video-profile]         | `video:fetch-video-profile`
[`GET` 获取随机视频列表][video-get-fetch-random-video-list] | `video:fetch-random-video-list`
[`GET` 搜索视频][video-get-search-video]                    | `video:search-video`
[`PUT` 点赞视频][video-put-favour-video]                    | `video:favour-video`
[`PUT` 收藏视频][video-put-add-collection]                  | `video:collect-video`
[`DEL` 取消点赞视频][video-del-destroy-favourite-video]     | `video:destroy-favourite-video`
[`DEL` 取消收藏视频][video-del-destroy-collected-video]     | `video:destroy-collected-video`

[user-get-personal-profile]: ./api/user/get.personal-profile.md
[user-get-fetch-user-list]: ./api/user/get.fetch-user-list.md
[user-post-refresh-keys]: ./api/user/post.refresh-keys.md
[user-delete-logout]: ./api/user/delete.logout.md

[video-get-fetch-video-list]: ./api/video/get.fetch-video-list.md
[video-get-fetch-video-profile]: ./api/video/get.fetch-video-profile.md
[video-get-search-video]: ./api/video/get.search-video.md
[video-put-favour-video]: ./api/video/put.favour-video.md
[video-put-add-collection]: ./api/video/put.add-collection.md
[video-del-destroy-favourite-video]: ./api/video/del.destroy-favourite-video.md
[video-del-destroy-collected-video]: ./api/video/del.destroy-collected-video.md
[video-get-fetch-random-video-list]: ./api/video/get.fetch-random-video-list.md
