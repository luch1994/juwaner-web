'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async function adminCheck(ctx, next) {
    // console.log(ctx.session.user);
    if (typeof ctx.session.user !== 'undefined') {
      await next();
    } else {
      ctx.redirect('/xxxadmin/login');
    }
    // if (!options.urls.includes(ctx.request.url)) {
    //   await next();
    // } else if (ctx.isAuthenticated()) {
    //   await next();
    // } else {
    //   ctx.redirect('/xxxadmin/login');
    // }
  };
};
