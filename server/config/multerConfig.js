const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
 
  destination: function (req, file, cb) {
    cb(null, "images/uploads/");
  },
  filename: function (req, file, cb) {

    
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
