const multer = require('multer');

const { v4 } = require('uuid');

const path = require('path');







// / Set up disk storage for files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
   const id=v4()


   const extName=file.originalname.split('.')[file.originalname.split('.').length-1]
   cb(null, `${id}.${extName}`)
    }
  });
 
  
  // File filter for validation
  const fileFilter = (req, file, cb) => {
    if (file.mimetype=='image/jpeg' || file.mimetype=='image/png' || file.mimetype=='video/mp4') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and MP4 are allowed.'), false);
    }
  };
  // // Middleware
  const multerConfig = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ])
module.exports=multerConfig