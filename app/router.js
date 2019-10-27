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
};
