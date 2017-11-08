# 上传至七牛云

上传七牛云，需要预先获取一个 `uploadToken`，该值的获取在服务端已经做了封装，可以参看 [`GET` 获取上传令牌][client-qiniu-get-fetch-upload-token]。

在获取了 `uploadToken` 之后，可以根据所使用语言的 [SDK][sdk] 去上传文件数据。（在大多数情况之下，仅限定于 `jpg/png` 图片的上传）。

在上传完毕之后，需要根据所在 `key`（文件在七牛云存储的位置）传递给修改图片的接口以完成修改操作。（在此过程中会重命名该文件）

[sdk]: https://developer.qiniu.com/kodo

[client-qiniu-get-fetch-upload-token]: ./api/client/qiniu/get/fetchUploadToken.md
