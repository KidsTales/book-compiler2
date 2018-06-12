const Router = require('koa-router');
const router = new Router();

// GET /generator
router.get('/', async ctx => {
  await ctx.render('generator');
});

router.post('/', async ctx => {
  console.log(ctx.request.body);
  console.log(ctx.request.files);
  ctx.redirect('back');
});


module.exports = router.routes();