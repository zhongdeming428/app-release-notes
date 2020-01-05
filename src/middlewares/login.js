const memchaced = require('../db/memchaced')
const whiteList = []

module.exports = function(req, res, next) {
  if (whiteList.includes(req.path))
    return next()
  const token = req.cookies.token
  if (!token) 
    return res.redirect('/user/login')
  memchaced.get(token, (err, reply) => {
    if (err || !reply)
      return res.redirect('/user/login')
    else 
      return next()
  })
}