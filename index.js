const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const cors = require('cors');
const parser = require('body-parser');

let cache = {};

const server = express();
server.use(cors());
// server.use(parser.json({ type: '*/*' }));

server.get('/', (req, res) => res.send('check'));
server.post('/', parser.json({ type: '*/*' }), (req, res) => {
  console.log(JSON.stringify(req.body));
  res.send(JSON.stringify(req.body));
});
server.put('/', parser.json({ type: '*/*' }), (req, res) => {
  if (cache.standard && Object.keys(cache.standard).includes(Object.keys(req.body)[0])) {
    Object.assign(cache.standard, req.body);
  } else if (cache.custom && Object.keys(cache.custom).includes(Object.keys(req.body)[0])) {
    Object.assign(cache.custom, req.body);
  } else {
    Object.assign(cache, req.body);
  }
  console.log(cache);
  res.send(JSON.stringify(Object.assign(cache, {success: true})));
});

server.post('/upload', upload.single('file'), function (req, res) {
  console.log('received file: ' + req.file.filename);
  res.send(JSON.stringify({
    received: req.file.originalname,
    success: true
  }));
});

server.post('/upload/multiple', upload.array('files[]'), function (req, res) {
  /** @type {string[]} */
  const filenames = req.files.map(file => file.originalname);
  console.log('received files: ' + filenames.join(', '));
  res.send(JSON.stringify({
    received: filenames,
    success: true
  }));
});

server.listen(3030, () => console.log('Listening on port 3030'));
