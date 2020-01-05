const userRouter = require('./user')
const noteRouter = require('./note')
const fileRouter = require('./file')

module.exports = [
  userRouter,
  noteRouter,
  fileRouter
]