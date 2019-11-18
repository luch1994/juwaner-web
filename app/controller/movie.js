'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const { ctx } = this;
    const movie = await ctx.service.movie.find(ctx.params.id, ctx.query.c);
    const categories = await ctx.service.category.findAll();
    const linkList = JSON.parse(movie.link_list);
    // const linkList = movie.link_list;
    delete movie.linkList;
    // const recommendList = await ctx.service.movie.findRecommend();
    const sideData = await ctx.service.index.getSide();
    const sideList = [
      {
        name: '推荐',
        data: sideData,
      },
    ];
    await ctx.render('movie/index.nj', { movie, categories, linkList, sideList });
  }
}

module.exports = CategoryController;
