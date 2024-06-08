const util = require('util');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
}).single('file');

let uploadFile = util.promisify(upload);

module.exports = uploadFile;
