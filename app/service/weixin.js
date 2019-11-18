'use strict';

const Service = require('egg').Service;

class WeixinService extends Service {
  async getToken() {
    let token;
    if (await this.app.cache.has('weixinToken')) {
      // console.log('read token from cache...');
      token = await this.app.cache.get('weixinToken');
    } else {
      const res = await this.ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.config.weixin.appid}&secret=${this.config.weixin.appSecret}`, {
        dataType: 'json',
      });
      // console.log('read token from db...');
      // console.log(res);
      if (res.status === 200) {
        token = res.data.access_token;
        // 5400秒，就是一个半小时
        this.app.cache.set('weixinToken', token, 5400);
      }
    }
    // console.log(token);
    return token;
  }
}

module.exports = WeixinService;
