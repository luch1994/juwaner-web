'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const { ctx } = this;
    const category = await ctx.service.category.find(ctx.params.id);
    const categories = await ctx.service.category.findAll();
    let pageIndex = ctx.query.p;
    if (!pageIndex) {
      pageIndex = 1;
    } else {
      pageIndex = +pageIndex;
    }
    const pageSize = 18;
    const totalPage = Math.ceil(category.total_count / pageSize);
    const pages = [];
    const pageLen = 5;
    let start = 1;
    const maxStart = totalPage - pageLen + 1;
    if (pageIndex <= 3) {
      start = 1;
    } else if (pageIndex >= maxStart + 2) {
      start = maxStart;
    } else {
      start = pageIndex - 2;
    }
    for (let i = start; i < start + pageLen; i++) {
      let url = `?p=${i}`;
      const current = i === pageIndex;
      if (current) {
        url = '';
      }
      pages.push({
        url,
        text: `${i}`,
        current,
      });
    }
    if (pageIndex !== 1) {
      pages.unshift({
        url: `?p=${pageIndex - 1}`,
        text: '<',
      });
      pages.unshift({
        url: `?p=${1}`,
        text: '<<',
      });
    }
    if (pageIndex !== totalPage) {
      pages.push({
        url: `?p=${pageIndex + 1}`,
        text: '>',
      });
      pages.push({
        url: `?p=${totalPage}`,
        text: '>>',
      });
    }
    // const sideData = await ctx.service.index.getSide();
    const sideData = await ctx.service.movie.findRecommend(6);
    const sideList = [
      {
        name: '推荐',
        data: sideData,
      },
    ];
    const movies = await ctx.service.movie.findAll(ctx.params.id, pageIndex, pageSize);
    const categoryName = category.name;
    await ctx.render('category/index.nj', { title: `剧丸儿-${categoryName}`, category, categories, movies, pages, sideList, seoKeywords: `剧丸儿 美剧资源 ${categoryName}`, seoDescription: `海量美剧资源 ${categoryName}` });
  }
}

module.exports = CategoryController;
