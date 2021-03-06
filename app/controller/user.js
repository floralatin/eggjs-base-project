/**
 * @file 用户控制
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

const { Controller } = require('egg');
const md5 = require('md5');
class UserController extends Controller {

  async login() {
    const { ctx, service, logger, app } = this;
    const { reg } = app.utils;
    const { username, password } = ctx.request.body;
    if (!reg.username.test(username) || !reg.password.test(password)) {
      ctx.body = {
        status: 1002,
        statusInfo: '参数错误'
      };
      return;
    }
    const user = await service.user.getOne({ username });
    if (!user || user.password !== md5(password)) {
      ctx.body = {
        status: 1004,
        statusInfo: '用户名或密码错误'
      };
      return;
    }
    ctx.session.userId = user.id;
    ctx.body = {
      status: 0
    };
  }

  async register() {
    const { ctx, service, app } = this;
    const { reg } = app.utils;
    const { username, password, nickname, headImageUrl } = ctx.request.body;
    if (!reg.username.test(username) || !reg.password.test(password) || !reg.url.test(headImageUrl)) {
      ctx.body = {
        status: 1002,
        statusInfo: '参数错误'
      };
      return;
    }
    const user = await service.user.getOne({ username });
    if (user) {
      ctx.body = {
        status: 1001,
        statusInfo: '用户已经存在'
      };
      return;
    }
    ctx.body = {
      status: 0,
      data: await service.user.create({
        username,
        password: md5(password),
        nickname,
        headImageUrl
      })
    };
  }

  async getOneById() {
    const { ctx, service, app } = this;
    const { userId } = app;
    const user = await service.user.getOne({ id: userId });
    ctx.body = {
      status: 0,
      data: user
    };
  }

}

module.exports = UserController;
