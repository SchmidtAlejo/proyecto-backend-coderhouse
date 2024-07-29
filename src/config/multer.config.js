import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '';
    if (file.fieldname === 'productImage') {
      folder = 'src/public/images/';
    } else if (file.fieldname === 'documents') {
      folder = 'uploads/documents/';
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const uploadMulter = multer({ storage: storage });