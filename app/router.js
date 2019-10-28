'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/search', controller.home.search);
  router.get('/c/:id', controller.category.index);
  router.get('/m/:id', controller.movie.index);
  const adminCheck = app.middleware.adminCheck({ urls: [ '/xxxadmin/index' ] });
  router.get('/xxxadmin/index', adminCheck, app.controller.xxxadmin.index);
  router.get('/xxxadmin/login', app.controller.xxxadmin.login);
  const localStrategy = app.passport.authenticate('local');
  app.router.post('/xxxadmin/login', localStrategy);
};
