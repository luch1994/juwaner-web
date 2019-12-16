'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {

  async getCategories() {
    const { ctx } = this;
    const categories = await ctx.service.category.findAll();
    ctx.body = {
      status: 'success',
      totals: categories.length,
      data: categories,
    };
  }

  async getMovies() {
    const { ctx } = this;
    let { cPage, pSize } = ctx.request.query;
    const category = await ctx.service.category.find(1);
    const totalCount = category.total_count;
    cPage = parseInt(cPage);
    pSize = parseInt(pSize);
    const movies = await ctx.service.movie.findAll(null, cPage, pSize);
    ctx.body = {
      status: 'success',
      totals: totalCount,
      data: movies,
    };
  }
}

module.exports = ApiController;
