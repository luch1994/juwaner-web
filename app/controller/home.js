'use strict';

const Controller = require('egg').Controller;
const moviesData = require('./combineData');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const categories = await ctx.service.category.findAll();
    // const recommendList = await ctx.service.movie.findRecommend();
    // const latestList = await ctx.service.movie.findLatest();
    const recommendList = await ctx.service.index.getIndex();
    const sideData = await ctx.service.index.getSide();
    const movieList = [
      {
        name: '首页',
        data: recommendList,
      },
    ];
    const sideList = [{
      name: '推荐',
      data: sideData,
    }];
    await ctx.render('home/index.nj', { title: '剧丸儿-首页', categories, movieList, sideList });
  }

  async search() {
    const { ctx } = this;
    const categories = await ctx.service.category.findAll();
    const search = decodeURIComponent(ctx.query.search);
    let searchResult = moviesData.filter(item => {
      return item.title.indexOf(search) >= 0;
    }).slice(0, 24);

    searchResult = searchResult.map(item => {
      return {
        id: item.id,
        category: item.category,
        name: item.title,
      };
    });
    const sideData = await ctx.service.index.getSide();
    const sideList = [{
      name: '推荐',
      data: sideData,
    }];
    // const searchList = await ctx.service.movie.search(search);
    const movieList = [
      {
        name: '搜索结果',
        data: searchResult,
      },
    ];
    await ctx.render('home/index.nj', { title: '搜索结果', categories, sideList, movieList });
  }
}

module.exports = HomeController;
