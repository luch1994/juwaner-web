/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571481789333_4589';

  // add your middleware config here
  // config.middleware = [ 'adminCheck' ];
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'juwaner',
    },
  };

  config.cache = {
    default: 'memory',
    stores: {
      memory: {
        driver: 'memory',
        max: 100,
        ttl: 0,
      },
    },
  };

  config.weixin = {
    appid: 'wxbf20614fb214491f',
    appSecret: '295b0d8fa6bee153d6dfcd2983cb28c5',
    cloudenv: 'juwaner-kk6ht',
  };

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
    defaultViewEnfine: 'nunjuecks',
    defaultExtension: '.nj',
  };

  // config.adminCheck = {
  //   urls: [ '/xxxadmin/index' ],
  // };

  config.passportLocal = {
    usernameFiled: 'username',
    passwordField: 'password',
  };

  return {
    ...config,
    ...userConfig,
  };
};
