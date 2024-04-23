import fs from 'fs';
import { helpers } from '../config/helpers.js';
import multer from 'multer';

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = req.uploadPath
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      })
    }
    cb(null, path)
  },
  filename: (req, file, cb) => {
    let fname = Date.now() + "-" + helpers.randomStringGenerate() + "-" + file.originalname;
    cb(null, fname)
  }

})

const imageFilter = (req, file, cb) => {
  try {
    let allowed = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
    // let filename = file.originalname;
    // let ext = filename.split('.').pop();
    let extension = file.originalname.split('.').pop()
    if (allowed.includes(extension.toLowerCase())) {
      cb(null, true)
    } else {
      cb({
        code: 400,
        message: "File format not supported"
      }, null)
    }
  } catch (exception) {
    cb(err, null)
  }
}

const uploader = multer({
  storage: myStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2000000
  }
})
export { uploader }