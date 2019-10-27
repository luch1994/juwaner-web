'use strict';

const Service = require('egg').Service;

class MovieService extends Service {
  async findAll(category, pageIndex = 1, pageSize = 12) {
    const offset = (pageIndex - 1) * pageSize;
    const movies = await this.app.mysql.select('movies', {
      where: {
        category,
      },
      columns: [ 'id', 'name', 'category', 'description' ],
      limit: pageSize,
      offset,
    });
    return movies;
  }
  async findRecommend() {
    const movies = await this.app.mysql.select('movies', {
      where: {
        is_recommend: 1,
      },
      columns: [ 'id', 'name', 'category', 'description' ],
      limit: 12,
      offset: 0,
    });
    return movies;
  }
  async findLatest() {
    const movies = await this.app.mysql.select('movies', {
      orders: [[ 'updated_at', 'desc' ]],
      columns: [ 'id', 'name', 'category', 'description' ],
      limit: 12,
      offset: 0,
    });
    return movies;
  }
  async find(id) {
    const movie = await this.app.mysql.select('movies', {
      where: { id }, // WHERE 条件
      columns: [ 'id', 'name', 'category', 'link_list', 'db_info', 'description' ], // 要查询的表字段
    });
    return movie[0];
  }
  async search(name) {
    const movies = await this.app.mysql.query(`SELECT id, name, category, description FROM movies WHERE name LIKE "%${name}%" LIMIT 0, 24;`);
    return movies;
  }
}

module.exports = MovieService;
