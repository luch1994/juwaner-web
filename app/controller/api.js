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

  async getCategory() {
    const { ctx } = this;
    const id = parseInt(ctx.request.query.id);
    const category = await ctx.service.category.find(id);
    ctx.body = category;
  }

  async updateCategory() {
    const { ctx } = this;
    const category = ctx.request.body;
    const ret = await ctx.service.category.update(category);
    ctx.body = ret;
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

  async findAllAndCount() {
    const { ctx } = this;
    const { cPage, pSize, category, name } = ctx.request.query;
    const [ movies, totals ] = await ctx.service.movie.findAllAndCount(parseInt(category), parseInt(cPage), parseInt(pSize), name);
    this.ctx.body = {
      status: 'success',
      totals,
      data: movies,
    };
  }

  async getMovie() {
    const { ctx } = this;
    const id = parseInt(ctx.request.query.id);
    const movie = await ctx.service.movie.find(id);
    ctx.body = movie;
  }

  async updateMovie() {
    const { ctx } = this;
    const movie = ctx.request.body;
    const newMovie = {
      id: parseInt(movie.id),
      name: movie.name,
      category: parseInt(movie.category),
      db_info: movie.db_info,
      description: movie.description,
      is_recommend: parseInt(movie.is_recommend),
      link_list: JSON.stringify(movie.link_list),
    };
    const ret = await ctx.service.movie.update(newMovie);
    ctx.body = ret;
  }
}

module.exports = ApiController;
