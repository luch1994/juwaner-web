'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {
  async findAll() {
    let categories = [];
    if (await this.app.cache.has('categories')) {
      categories = await this.app.cache.get('categories');
    } else {
      categories = await this.app.mysql.query('SELECT id, name, total_count FROM category WHERE parent = 1');
      await this.app.cache.set('categories', categories);
      // const token = await this.service.weixin.getToken();
      // const res = await this.ctx.curl(`https://api.weixin.qq.com/tcb/databasequery?access_token=${token}`, {
      //   method: 'POST',
      //   contentType: 'json',
      //   dataType: 'json',
      //   data: {
      //     env: this.config.weixin.cloudenv,
      //     query: 'db.collection("categories").field({_id: true,text: true,totalCount: true, url: true}).get();',
      //   },
      // });

      // if (res.status === 200) {
      //   const data = res.data;
      //   if (data.errcode === 0) {
      //     categories = data.data.map(item => {
      //       item = JSON.parse(item);
      //       const ret = {
      //         id: +item._id.match(/\d$/)[0],
      //         name: item.text,
      //         total_count: item.totalCount,
      //       };
      //       return ret;
      //     });
      //     await this.app.cache.set('categories', categories);
      //   }
      // }
    }
    return categories;
  }
  async find(id) {
    const category = await this.app.mysql.select('category', {
      where: { id }, // WHERE 条件
      columns: ['id', 'name', 'total_count'], // 要查询的表字段
    });
    return category[0];
    // id = +id;
    // const categories = await this.ctx.service.category.findAll();
    // let category;
    // for (const c of categories) {
    //   if (c.id === id) {
    //     category = c;
    //     break;
    //   }
    // }
    // return category;
  }
  async update(category) {
    const row = {
      id: category.id,
      name: category.name,
      total_count: category.total_count,
      url: category.url,
      updated_at: this.app.mysql.literals.now,
    };
    const result = await this.app.mysql.update('category', row);
    const id = parseInt(category.id);
    const ret = {};
    if (result.affectedRows === 1) {
      ret.dbCode = true;
      const token = await this.service.weixin.getToken();
      const res = await this.ctx.curl(`https://api.weixin.qq.com/tcb/databaseupdate?access_token=${token}`, {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        data: {
          env: this.config.weixin.cloudenv,
          query: `db.collection("categories").doc("category-0${id}").update({data: { text: '${row.name}', totalCount: ${row.total_count}, url: '${row.url}' }});`,
        },
      });

      if (res.status === 200) {
        const data = res.data;
        if (data.errcode === 0) {
          ret.resultCode = true;
        } else {
          ret.resultCode = false;
        }
      } else {
        ret.resultCode = false;
      }
    } else {
      ret.dbCode = false;
    }
    return ret;
  }
}

module.exports = CategoryService;
