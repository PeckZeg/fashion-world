# 签名验证算法

验证附加于 `Authorization` 里，格式为 `Caa ${Base64 String}`

其中 `Base64 String` 是字符串 `${apiKey}:${signature} ${timestamp}` 拼接后用 `Base64` 转换后的字符串。

其中各个变量为

* `apiKey`: 接口 Key，由登录时发放
* `signature`: 接口签名，由特定算法生成，下一部分会介绍
* `timestamp`: 时间戳，`13` 位数值，需要为 **当前时间**

### 示例

假设有如下一组值：

* apiKey: `SzggU8dj2xcegXfZVx1ucm/hKgre8DIckHPoxkkn+n0=`
* signature: `VHTnYjscONrGXMumaGChvV+Q+Xo=`
* timestamp: `1494908261599`

拼接后的字符串为

```
SzggU8dj2xcegXfZVx1ucm/hKgre8DIckHPoxkkn+n0=:VHTnYjscONrGXMumaGChvV+Q+Xo= 1494908261599
```

Base64 编码后的字符串为

```
U3pnZ1U4ZGoyeGNlZ1hmWlZ4MXVjbS9oS2dyZThESWNrSFBveGtrbituMD06VkhUbllqc2NPTnJHWE11bWFHQ2h2VitRK1hvPSAxNDk0OTA4MjYxNTk5
```

附加在 Header 里面为：

```
Authorization: Caa U3pnZ1U4ZGoyeGNlZ1hmWlZ4MXVjbS9oS2dyZThESWNrSFBveGtrbituMD06VkhUbllqc2NPTnJHWE11bWFHQ2h2VitRK1hvPSAxNDk0OTA4MjYxNTk5
```

## Signature

签名 `signature` 是接口验证的必要步骤，可以有效防止部分针对接口的攻击。

在使用用户登录接口时，会传送给客户端 `apiKey` 与 `secretKey` 是生成签名的主要工具。

每个接口都会有特定 `action`，`action` 用来标记接口。

每个请求都有 `timestamp`，用以标记接口请求时的时间。如果该 `timestamp` 在请求到达服务器时，超过正负 `5` 分钟，则该签名会失效。

### 生成方法

签名使用特定的顺序组合起来，并使用 `SHA1` 加密 `Base64` 字符串输出。

拼接格式为

```
?action=${action}&apiKey=${apiKey}&secretKey=${secretKey}&timestamp=${timestamp}
```

其中 `${action}` 为变量。

最后，将拼接的字符串使用 `SHA1` 加密并用 `Base64` 输出。

### 示例

* action: `user:personal-profile`
* apiKey: `SzggU8dj2xcegXfZVx1ucm/hKgre8DIckHPoxkkn+n0=`
* secretKey: `fz/THFXY6gbW7eWh+qKtefvgY49IR2W4v6lpTNimsd0=`
* timestamp: `1494908261599`

拼接后的字符串为

```
?action=user:personal-profile&apiKey=SzggU8dj2xcegXfZVx1ucm/hKgre8DIckHPoxkkn+n0=&secretKey=fz/THFXY6gbW7eWh+qKtefvgY49IR2W4v6lpTNimsd0=&timestamp=1494908261599
```

最后使用 `SHA1` 加密后 `Base64` 输出的字符串为：

```
VHTnYjscONrGXMumaGChvV+Q+Xo=
```
