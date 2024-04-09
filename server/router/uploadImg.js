const express = require ('express');
const router = express.Router ();
const multer = require ('multer');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });
const storage = multer.diskStorage ({
  destination: function (req, file, cb) {
    cb (null, './uploads/');
  },
  filename: function (req, file, cb) {
    const timestamp = new Date ().toISOString ().replace (/:/g, '-');
    cb (null, timestamp + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb (null, true);
  } else {
    cb (null, false);
  }
};

const upload = multer ({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post (
  '/',
  upload.fields ([{name: 'productImage', maxCount: 1}]),
  (req, res, next) => {
    let productImage;
    if (req.files && req.files.productImage) {
      productImage = req.files.productImage[0].path;
    }
    res.status (200).json ({
      message: 'Upload hình ảnh thành công.',
      img_product: productImage,
    });
  }
);

module.exports = router;
