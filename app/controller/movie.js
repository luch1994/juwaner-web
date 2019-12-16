'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const { ctx } = this;
    const movie = await ctx.service.movie.find(ctx.params.id);
    const categories = await ctx.service.category.findAll();
    let linkList = [];
    try {
      linkList = JSON.parse(movie.link_list);
      delete movie.linkList;
    } catch (e) {
      linkList = [];
    }
    // const sideData = await ctx.service.index.getSide();
    const sideData = await ctx.service.movie.findRecommend(6);
    const sideList = [
      {
        name: '推荐',
        data: sideData,
      },
    ];
    await ctx.render('movie/index.nj', { movie, categories, linkList, sideList, seoKeywords: movie.name, seoDescription: movie.description });
  }
}

module.exports = CategoryController;
