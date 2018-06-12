const fs = require('fs');
const path = require('path');

const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const ImageModule = require('docxtemplater-image-module');

const sizeOf = require('image-size');

const opts = {
  centered: true,
  getImage: function (tagValue, tagName) {
    return fs.readFileSync(tagValue);
  },
  getSize: function (img) {
    sizeObj = sizeOf(img);
    console.log(sizeObj);
    return [sizeObj.width, sizeObj.height];
  }
}



const content = fs.readFileSync(path.join(__dirname, '..', 'template.docx'), 'binary');

module.exports = data => {

  // Fill data
  data.year = new Date().getFullYear();
  data.book.subtitle = 'An Anthology of Stories';
  data.book.isbn13 = '[INSERT HERE]'
  data.book.isbn10 = '[INSERT HERE]';
  data.teacherList = data.teachers.join(', ');

  const doc = new Docxtemplater();
  doc.attachModule(new ImageModule(opts));
  doc.loadZip(new JSZip(content));

  doc.setData(data);

  try {
    doc.render();
  } catch (error) {
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    }
    console.log(JSON.stringify({
      error: e
    }));

    throw error;

  }
  return doc.getZip().generate({
    type: 'nodebuffer',
    compression: "DEFLATE"
  });
}