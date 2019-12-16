'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // passport: {
  //   enable: true,
  //   package: 'egg-passport',
  // },
  // passportLocal: {
  //   enable: true,
  //   package: 'egg-passport-local',
  // },
  cache: {
    enable: true,
    package: 'egg-cache',
  },
};
