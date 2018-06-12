const fs = require('fs');
const path = require('path');

const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

const content = fs.readFileSync(path.join(__dirname, '..', 'template.docx'), 'binary');
const zip = new JSZip(content);

module.exports = data => {
  const doc = new Docxtemplater();
  doc.loadZip(zip);

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
    type: 'nodebuffer'
  });
}