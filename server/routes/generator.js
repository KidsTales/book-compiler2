const Router = require('koa-router');
const router = new Router();

// GET /generator
router.get('/', ctx => {
  ctx.body = 'g';
});

module.exports = router.routes();