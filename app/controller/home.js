'use strict';

const Controller = require('egg').Controller;
// const moviesData = require('./combineData');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const categories = await ctx.service.category.findAll();
    const recommendList = await ctx.service.movie.findRecommend();
    const latestList = await ctx.service.movie.findLatest();
    // const recommendList = await ctx.service.index.getIndex();
    // const sideData = await ctx.service.index.getSide();
    const movieList = [
      {
        name: '首页',
        data: recommendList,
      },
    ];
    const sideList = [{
      name: '最新',
      data: latestList,
    }];
    await ctx.render('home/index.nj', { title: '剧丸儿-首页', categories, movieList, sideList, seoKeywords: '剧丸儿 美剧资源', seoDescription: '海量美剧资源' });
  }

  async search() {
    const { ctx } = this;
    const categories = await ctx.service.category.findAll();
    const search = decodeURIComponent(ctx.query.search);
    // let searchList = moviesData.filter(item => {
    //   return item.title.indexOf(search) >= 0;
    // }).slice(0, 24);

    // searchList = searchList.map(item => {
    //   return {
    //     id: item.id,
    //     category: item.category,
    //     name: item.title,
    //   };
    // });
    const searchList = await ctx.service.movie.search(search);

    // const sideData = await ctx.service.index.getSide();
    const limit = Math.ceil(searchList.length / 3);
    const sideData = await ctx.service.movie.findRecommend(limit);
    const sideList = [{
      name: '推荐',
      data: sideData,
    }];
    const movieList = [
      {
        name: '搜索结果',
        data: searchList,
      },
    ];
    await ctx.render('home/index.nj', { title: '搜索结果', categories, sideList, movieList, seoKeywords: '剧丸儿 美剧资源 搜索', seoDescription: '海量美剧资源 搜索 ' + search });
  }
}

module.exports = HomeController;
