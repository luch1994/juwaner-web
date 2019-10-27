'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {
  async findAll() {
    const categories = await this.app.mysql.query('SELECT id, name FROM category WHERE parent = 1');
    return categories;
  }
  async find(id) {
    const category = await this.app.mysql.select('category', {
      where: { id }, // WHERE 条件
      columns: [ 'id', 'name', 'total_count' ], // 要查询的表字段
    });
    return category[0];
  }
}

module.exports = CategoryService;
