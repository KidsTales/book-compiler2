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
  
  console.log(files);
  for (let file in files) {
    console.log(file);
    if (file === 'student-image') {
      try {
        files[file] = files[file].map(f => f.path);
      } catch (e) { console.error(`Failed to replace file ${file} with its path`); console.error(e); }
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
      locationImage: files['location-image']
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
  ctx.set('Content-disposition', `attachment; filename=${data.book.title}.docx`)
  ctx.body = docxtemplater(data);
});


module.exports = router.routes();
