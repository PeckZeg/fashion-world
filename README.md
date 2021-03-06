# Fashion World

## Start Server

```bash
# 开启调试模式
npm start

# 开启接口调试模式
npm run start-auth

# 后台启动
npm run server
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
mongo fwdb -u fwadmin -p xmzc.123

# 进入 Redis Cli
redis-cli -a xmzc.123

# 备份数据库（测试）
mongodump -d fwdb_dev -u fwadmin -p xmzc.123 -o /tmp/fwdb

# 备份数据库（正式）
mongodump -d fwdb -u fwadmin -p xmzc.123 -o /tmp/fwdb
```

## Scripts

```bash
# 迁移 Banner
npm run migrate:banner

# 迁移 Video
npm run migrate:video

# 迁移 User
npm run migrate:user

# 迁移循环视频
npm run migrate:loop-video

# 增加视频属性 `duration`
npm run video:duration

# 增加视频属性 `size`
npm run video:size

# 初始化 About
npm run init:about

# 修复用户创建时间为空
npm run fix:user:createAt:null
```

## Bash Profile

```bash
# 打开配置文件

vim ~/.bash_profile
```
