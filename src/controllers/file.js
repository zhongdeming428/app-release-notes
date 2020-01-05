const router = require('express').Router()
const multer = require('multer')
const { resolve } = require('path')
const { extension } = require('mime-types')
const md5 = require('md5')

const storage = multer.diskStorage({
  destination: resolve(__dirname, '../public/images/uploads'),
  filename: (req, file, cb) => {
    const hash = md5(file.fieldname + file.originalname + Date.now()),
      filename = hash + '.' + extension(file.mimetype)
    cb(null, filename)
  }
})

const upload = multer({ storage })

router.post(
  '/upload', 
  require('../middlewares/login'), 
  upload.array('images', 12),
  (req, res) => {
    return res.json({
      "errno": 0,
      "data": req.files.map(file => `/images/uploads/${file.filename}`)
    })
  }
)

module.exports = router