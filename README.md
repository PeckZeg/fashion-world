# Fashion World

## Start Server

```bash
# 开启调试模式
yarn start

# 开启接口调试模式
yarn run start-auth

# 后台启动
yarn run server
```

## Commands

```bash
# 启动 MongoDB
mongod --fork --config /etc/mongod.conf

# 启动 Redis
systemctl start redis

# 进入 MongoDB 数据库（测试环境）
mongo fwdb_dev -u fwadmin -p xmzc.123

# 进入 MongoDB 数据库（正式环境）

# 备份数据库
mongodump -d fwdb_dev -u fwadmin -p xmzc.123 -o /tmp/fwdb
```

## Command

```bash
# 处理封面为空的视频
npm run handle-empty-cover-video

# 移除所有空的循环视频（即 `videoId` 已阵亡的视频）
npm run remove-empty-loop-video
```

## Bash Profile

```bash
# 打开配置文件

vim ~/.bash_profile
```
