'use strict';

module.exports = options => {
  return async function adminCheck(ctx, next) {
    if (!options.urls.includes(ctx.request.url)) {
      await next();
    } else if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.redirect('/xxxadmin/login');
    }
  };
};
