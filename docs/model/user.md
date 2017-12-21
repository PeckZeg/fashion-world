# `User` Model

> 用户模型

```js
{
  "_id": ObjectId,                        //  用户编号
  "registerAt": Date,                     //  注册时间，13 位时间戳
  "createAt": Date,                       //  创建时间，13 位时间戳
  "thirdParty": {                         //  第三方登录信息
      "weixin": {                         //  微信
          "unionid": string,              //  联合编号
          "openid": string                //  开发编号
      }
  },
  "avatar": string,                       //  头像
  "gender": string,                       //  性别，只能从以下值枚举
                                          //    `unknown` - 未知
                                          //    `secret`  - 保密
                                          //    `male`    - 男
                                          //    `female`  - 女
  "name": string                          //  昵称
}
```
