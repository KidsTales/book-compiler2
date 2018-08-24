const Koa = require('koa');
const Body = require('koa-body');
const Router = require('koa-router');
const Logger = require('koa-logger');
const Helmet = require('koa-helmet');
const respond = require('koa-respond');
const compress = require('kompression');
const views = require('koa-views');
const static = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();

app.keys = [process.env.KEYS];

app.use(
  compress({
    filter: function (content_type) {
      return /text/i.test(content_type);
    },
    threshold: 2048
  })
);

/* Serve static files (CSS, JS, audio, etc.) */
app.use(static('client/public'));

app.context.helpers = require('./helpers');

/* Locals */
app.use(async (ctx, next) => {
  // Base folder for Pug to allow absolute paths
  ctx.state.basedir = path.join(__dirname, '..', 'views');

  ctx.state.path = ctx.request.url;

  // To use in views
  ctx.state.helpers = ctx.helpers;
  ctx.state.moment = require('moment');
  ctx.state.env = process.env.NODE_ENV || 'production';

  await next();
});

/* Sets basic security measures */
app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(Logger());
}

/* Allows request body parsing */
app.use(Body({
  multipart: true,
  formidable: {
    maxFileSize: 30 * 1024 * 1024
  }
}));

/* Adds helpful response methods */
app.use(respond());

/* Error handling */
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status == 404) ctx.throw(404, 'Page Not Found');
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.state.error = err;
    ctx.app.emit('error', err, ctx);

    await ctx.render('error');
  }
});

/* Views setup using Pug */
app.use(
  views(path.join(__dirname, '..', 'views'), {
    extension: 'pug'
  })
);

/* Router setup */
require('./routes')(router);
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
