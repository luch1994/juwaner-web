'use strict';

const Controller = require('egg').Controller;

class XXXAdminController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('xxxadmin/index.nj', { title: '分类' });
  }
  async login() {
    const { ctx } = this;
    await ctx.render('xxxadmin/login.nj', { title: '登录' });
  }
  async logout() {
    const { ctx } = this;
    ctx.logout();
    ctx.redirect('/xxxadmin/login');
  }
  async movies() {
    const { ctx } = this;
    await ctx.render('xxxadmin/movies.nj', { title: '电影管理' });
  }

  async postLogin() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (username === 'luch' && password === '1233lch') {
      ctx.session.user = {
        username,
      };
      ctx.redirect('/xxxadmin/index');
    } else {
      ctx.body = {
        err_code: -1,
        err_msg: '信息错误',
      };
    }
  }
}

module.exports = XXXAdminController;
