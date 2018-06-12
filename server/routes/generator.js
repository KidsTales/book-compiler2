const Router = require('koa-router');
const router = new Router();

// GET /generator
router.get('/', async ctx => {
  await ctx.render('generator');
});

module.exports = router.routes();