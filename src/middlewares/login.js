const cache = require('../db/utils').cache
const whiteList = []

module.exports = function(req, res, next) {
  if (whiteList.includes(req.path))
    return next()
  const token = !req.cookies.token
  if (!token || !cache.get(token)) {
    return res.redirect('/user/login')
  }
}