const Router = require('koa-router');
const router = new Router();

const docxtemplater = require('../docxtemplater');

// GET /generator
router.get('/', async ctx => {
  await ctx.render('generator');
});

router.post('/', async ctx => {
  const body = ctx.request.body;
  let files = ctx.request.files;

  for (let file in files) {
    if (file === 'student-image') {
      files[file] = files[file].map(f => f.path);
    } else {
      files[file] = files[file].path;
    }
  }

  ['teacher', 'student-name', 'student-bio', 'student-story-title', 'student-story-content'].forEach(key => {
    if (body[key].constructor !== Array) body[key] = [body[key]];
  });

  ['student-image'].forEach(key => {
    if (files[key].constructor !== Array) files[key] = [files[key]];
  });

  console.log(body);
  console.log(files);

  const data = {
    book: {
      title: body['book-title'],
      introduction: body['book-introduction'],
      coverImage: files['book-cover'],
      backImage: files['book-back']
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
      author: body['student-name'][index],
      content: body['student-story-content'][index]
    }))
  }

  console.log(data);
  ctx.body = docxtemplater(data);
});


module.exports = router.routes();