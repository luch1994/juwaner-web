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
  router.get('/xxxadmin/login', app.controller.xxxadmin.login);
  // const localStrategy = app.passport.authenticate('local');
  app.router.post('/xxxadmin/login', app.controller.xxxadmin.postLogin);
  // { urls: [ '/xxxadmin/index' ] }
  const adminCheck = app.middleware.adminCheck();
  router.get('/xxxadmin/index', adminCheck, app.controller.xxxadmin.index);
  router.get('/xxxadmin/movies', adminCheck, app.controller.xxxadmin.movies);

  router.get('/api/getcategories', adminCheck, app.controller.api.getCategories);
  router.get('/api/getcategory', adminCheck, app.controller.api.getCategory);
  router.post('/api/updatecategory', adminCheck, app.controller.api.updateCategory);

  router.get('/api/getmovies', adminCheck, app.controller.api.getMovies);
  router.get('/api/getmovie', adminCheck, app.controller.api.getMovie);
  router.post('/api/updatemovie', adminCheck, app.controller.api.updateMovie);

  router.get('/api/findallandcount', app.controller.api.findAllAndCount);
};
