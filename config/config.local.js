/**
 * @file 本地环境配置文件
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

module.exports = {
  // redis配置
  redis: {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
  },
  // mysql 配置
  sequelize: {
    dialect: 'mysql',
    database: 'demo',
    username: 'root',
    password: 'mysql!!@@##21',
    host: 'localhost',
    port: 3306,
    pool: {
      max: 100,
      min: 0,
      idle: 10000
    },
    define: {
      engine: 'InnoDB',
      timestamp: false,
      createdAt: 'createTime',
      updatedAt: 'updateTime',
      charset: 'utf8'
    }
  },
};