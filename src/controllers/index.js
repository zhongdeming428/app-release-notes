const userRouter = require('./user')
const noteRouter = require('./note')
const fileRouter = require('./file')
const listRouter = require('./list')

module.exports = [
  userRouter,
  noteRouter,
  fileRouter,
  listRouter
]