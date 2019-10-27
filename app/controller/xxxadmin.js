'use strict';

const Controller = require('egg').Controller;

class XXXAdminController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('xxxadmin/index.nj', { title: '管理员' });
  }
}

module.exports = XXXAdminController;
