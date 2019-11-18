'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
  async getIndex() {
    let indexArr = [];
    if (this.app.cache.has('indexArr')) {
      indexArr = await this.app.cache.get('indexArr');
    }
    if (!indexArr || indexArr.length === 0) {
      const token = await this.service.weixin.getToken();
      const res = await this.ctx.curl(`https://api.weixin.qq.com/tcb/databasequery?access_token=${token}`, {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        data: {
          env: this.config.weixin.cloudenv,
          query: 'db.collection("configs").doc("2c180102-0057-4f3c-9b46-877f3da29ce6").field({ indexArr: true }).get()',
        },
      });

      if (res.status === 200) {
        const data = JSON.parse(res.data.data[0]);
        indexArr = data.indexArr.map(item => {
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
        await this.app.cache.set('indexArr', indexArr);
      }
    }
    return indexArr;
  }
  async getSide() {
    const indexArr = await this.ctx.service.index.getIndex();
    const len = indexArr.length;
    const random = parseInt(Math.random() * (len - 6));
    return indexArr.slice(random, random + 6);
  }
}

module.exports = IndexService;
