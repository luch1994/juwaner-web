'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const { ctx } = this;
    const movie = await ctx.service.movie.find(ctx.params.id);
    const categories = await ctx.service.category.findAll();
    const linkList = JSON.parse(movie.link_list);
    delete movie.linkList;
    const recommendList = await ctx.service.movie.findRecommend();
    const movieList = [
      {
        name: '热门',
        data: recommendList,
      },
    ];
    await ctx.render('movie/index.nj', { movie, categories, linkList, movieList });
  }
}

module.exports = CategoryController;
