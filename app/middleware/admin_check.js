'use strict';

module.exports = () => {
  return async function admin_check(ctx, next) {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.sesstion.return = ctx.path;
      await ctx.render('xxxadmin/login.nj');
    }
  };
};
