'use strict';

const Service = require('egg').Service;

class MovieService extends Service {
  async findAll(category, pageIndex = 1, pageSize = 18) {
    category = +category;
    let movies = null;
    if (this.app.cache.has('movies')) {
      movies = await this.app.cache.get('movies');
      if (!movies) {
        movies = {};
      }
    } else {
      await this.app.cache.set('movies', {});
      movies = {};
    }
    if (!movies[category]) {
      movies[category] = [];
    }
    const offset = (pageIndex - 1) * pageSize;
    const categories = await this.service.category.findAll();
    let curCategory;
    for (const c of categories) {
      if (category === c.id) {
        curCategory = c;
        break;
      }
    }
    if (!curCategory) {
      return [];
    }
    if (offset >= curCategory.total_count) {
      return [];
    }
    if (movies[category].length > offset) {
      return movies[category].slice(offset, pageSize);
    }
    const token = await this.service.weixin.getToken();
    const categoryName = `category-0${category}`;
    const res = await this.ctx.curl(`https://api.weixin.qq.com/tcb/databasequery?access_token=${token}`, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: {
        env: this.config.weixin.cloudenv,
        query: `db.collection("${categoryName}").field({_id: true,category: true,dbInfo: true,desc: true,linkList: true,title: true}).skip(${offset}).limit(${pageSize}).get();`,
      },
    });
    if (res.status === 200) {
      const data = res.data;
      if (data.errcode === 0) {
        const d = data.data.map(item => {
          item = JSON.parse(item);
          const ret = {
            id: item._id,
            category: item.category,
            db_info: item.dbInfo,
            description: item.desc,
            name: item.title,
            link_list: JSON.stringify(item.linkList),
          };
          return ret;
        });
        if (offset === movies[category].length) {
          movies[category] = movies[category].concat(d);
          await this.app.cache.set('movies', movies);
        }
        return d;
      }
    }
    return [];
    // const movies = await this.app.mysql.select('movies', {
    //   where: {
    //     category,
    //   },
    //   columns: [ 'id', 'name', 'category', 'description' ],
    //   limit: pageSize,
    //   offset,
    // });
    // return movies;
  }
  async findRecommend() {
    const movies = await this.app.mysql.select('movies', {
      where: {
        is_recommend: 1,
      },
      columns: ['id', 'name', 'category', 'description'],
      limit: 12,
      offset: 0,
    });
    return movies;
  }
  async findLatest() {
    const movies = await this.app.mysql.select('movies', {
      orders: [['updated_at', 'desc']],
      columns: ['id', 'name', 'category', 'description'],
      limit: 12,
      offset: 0,
    });
    return movies;
  }
  async find(id, category) {
    id = +id;
    category = +category[10];
    let movies = null;
    if (this.app.cache.has('movies')) {
      movies = await this.app.cache.get('movies');
      if (!movies) {
        movies = {};
      }
    } else {
      await this.app.cache.set('movies', {});
      movies = {};
    }
    if (!movies[category]) {
      movies[category] = [];
    }
    let movie;
    for (const item of movies[category]) {
      if (id === item.id) {
        movie = item;
        break;
      }
    }
    if (!movie) {
      const token = await this.service.weixin.getToken();
      const categoryName = `category-0${category}`;
      const res = await this.ctx.curl(`https://api.weixin.qq.com/tcb/databasequery?access_token=${token}`, {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        data: {
          env: this.config.weixin.cloudenv,
          query: `db.collection("${categoryName}").doc(${id}).field({_id: true,category: true,dbInfo: true,desc: true,linkList: true,title: true}).get();`,
        },
      });
      if (res.status === 200 && res.data.errcode === 0) {
        const item = JSON.parse(res.data.data[0]);
        movie = {
          id: item._id,
          category: item.category,
          db_info: item.dbInfo,
          description: item.desc,
          name: item.title,
          link_list: JSON.stringify(item.linkList),
        };
      }
    }
    return movie;
    // const movie = await this.app.mysql.select('movies', {
    //   where: { id }, // WHERE 条件
    //   columns: ['id', 'name', 'category', 'link_list', 'db_info', 'description'], // 要查询的表字段
    // });
    // return movie[0];
  }
  async search(name) {
    const movies = await this.app.mysql.query(`SELECT id, name, category, description FROM movies WHERE name LIKE "%${name}%" LIMIT 0, 24;`);
    return movies;
  }
}

module.exports = MovieService;
