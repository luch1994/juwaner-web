'use strict';

const Controller = require('egg').Controller;

class XXXAdminController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('xxxadmin/index.nj', { title: '管理员' });
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
}

module.exports = XXXAdminController;
