const Router = require('koa-router');
const router = new Router();

// GET /generator
router.get('/', async ctx => {
  await ctx.render('generator');
});

router.post('/', async ctx => {
  const body = ctx.request.body;
  const files = ctx.request.files;

  console.log(body);
  console.log(files);

  const data = {
    book: {
      title: body['book-title'],
      introduction: body['book-introduction'],
      coverImage: files['book-cover']
    },
    location: {
      name: body['location-name'],
      description: body['location-description'],
      image: files['location-image']
    },
    teachers: body['teacher'],
    students: body['student-name'].map((name, index) => Object.assign({}, {
      name,
      bio: body['student-bio'][index],
      image: files['student-image'][index]
    })),
    stories: body['student-story-title'].map((title, index) => Object.assign({}, {
      title,
      content: body['student-story-content'][index]
    }))
  }

  ctx.body = data;
});


module.exports = router.routes();