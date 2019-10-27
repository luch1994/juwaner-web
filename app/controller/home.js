'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const categories = await ctx.service.category.findAll();
    const recommendList = await ctx.service.movie.findRecommend();
    const latestList = await ctx.service.movie.findLatest();
    const movieList = [
      {
        name: '推荐',
        data: recommendList,
      },
      {
        name: '最新',
        data: latestList,
      },
    ];
    await ctx.render('home/index.nj', { title: '剧丸儿-首页', categories, movieList });
  }

  async search() {
    const { ctx } = this;
    const categories = await ctx.service.category.findAll();
    const search = decodeURIComponent(ctx.query.search);
    const searchList = await ctx.service.movie.search(search);
    const movieList = [
      {
        name: '搜索结果',
        data: searchList,
      },
    ];
    await ctx.render('home/index.nj', { title: '搜索结果', categories, movieList });
  }
}

module.exports = HomeController;
