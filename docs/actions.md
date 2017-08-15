# 接口动作列表

算法请参见 [签名验证算法](../../signature-authorization.md)

## User

API                                                                          | Action
:--------------------------------------------------------------------------- | :----------------------
[`GET` 获取用户资料][user-get-personal-profile]                              | `user:personal-profile`
[`GET` 获取用户列表][user-get-fetch-user-list]                               | `user:fetch-user-list`
[`GET` 获取用户详情][user-get-fetch-user-profile]                            | `user:fetch-user-profile`
[`GET` 获取当前用户点赞的视频列表][user-GET-fetchPersonalFavouriteVideoList] | `user:fetch-user-favourite-video-list`
[`GET` 获取当前用户收藏的视频列表][user-GET-fetchPersonalCollectedVideoList] | `user:fetch-user-collected-video-list`
[`POST` 刷新验证 keys][user-post-refresh-keys]                               | `user:refresh-keys`
[`PUT` 更新当前用户信息][User_PUT_UpdatePersonalProfile]                     | `user:update-personal-profile`
[`DELETE` 用户登出][user-delete-logout]                                      | `user:logout`
[`DEL` 删除登录用户点赞视频][User_DEL_DestroyPersonalFavouriteVideos]        | `user:destroy-personal-favourite-videos`
[`DEL` 删除登录用户收藏视频][User_DEL_DestroyPersonalCollectedVideos]        | `user:destroy-personal-collected-videos`

## Video

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

## LoopVideo

API                                                        | Action
:--------------------------------------------------------- | :------------------------------
[`GET` 获取循环视频列表][LoopVideo_GET_fetchLoopVideoList] | `loop-video:fetch-loop-video-list`



[user-get-personal-profile]: ./api/user/get.personal-profile.md
[user-get-fetch-user-list]: ./api/user/get.fetch-user-list.md
[user-get-fetch-user-profile]: ./api/user/get.fetch-user-profile.md
[user-GET-fetchPersonalFavouriteVideoList]: ./api/user/GET.fetchPersonalFavouriteVideoList.md
[user-GET-fetchPersonalCollectedVideoList]: ./api/user/GET.fetchPersonalCollectedVideoList.md
[User_PUT_UpdatePersonalProfile]: ./api/user/PUT.updatePersonalProfile.md
[user-post-refresh-keys]: ./api/user/post.refresh-keys.md
[user-delete-logout]: ./api/user/delete.logout.md
[User_DEL_DestroyPersonalFavouriteVideos]: ./api/user/DEL.destroyPersonalFavouriteVideos.md
[User_DEL_DestroyPersonalCollectedVideos]: ./api/user/DEL.destroyPersonalCollectedVideos.md

[video-get-fetch-video-list]: ./api/video/get.fetch-video-list.md
[video-get-fetch-video-profile]: ./api/video/get.fetch-video-profile.md
[video-get-search-video]: ./api/video/get.search-video.md
[video-put-favour-video]: ./api/video/put.favour-video.md
[video-put-add-collection]: ./api/video/put.add-collection.md
[video-del-destroy-favourite-video]: ./api/video/del.destroy-favourite-video.md
[video-del-destroy-collected-video]: ./api/video/del.destroy-collected-video.md
[video-get-fetch-random-video-list]: ./api/video/get.fetch-random-video-list.md

[LoopVideo_GET_fetchLoopVideoList]: ./api/loop-video/GET.fetchLoopVideoList.md
