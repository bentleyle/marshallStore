const express = require ('express');
const app = express ();
const morgan = require ('morgan');
const bodyParser = require ('body-parser');

const uploadImgRoutes = require ('./router/uploadImg');

app.use (morgan ('dev'));
app.use ('/uploads', express.static ('uploads'));
app.use (bodyParser.urlencoded ({extended: false}));
app.use (bodyParser.json ());
app.use (express.json ());

app.use ((req, res, next) => {
  res.header ('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header (
      'Access-Control-Allow-Methods',
      'PUT, PATCH, GET, POST, DELETE'
    );
    return res.status (200).send ();
  }
  next ();
});

app.use ('/upload-img', uploadImgRoutes);

app.use ((req, res, next) => {
  const error = new Error ('Not found');
  error.status = 404;
  next (error);
});
app.use ((error, req, res, next) => {
  res.status (error.status || 500);
  res.json ({
    error: {message: error.message},
  });
});

module.exports = app;
