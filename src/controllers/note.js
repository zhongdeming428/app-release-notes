const Router = require('express').Router
const jwt = require('jsonwebtoken')

const router = Router()

// home page
router.get('/', (req, res) => {
  const token = req.cookies.token
  const userName = jwt.decode(token)
  const context = {
    userName,
    query: req.query
  }
  if (req.query.tab === 'list')
    context.list = []
  return res.render('home', context)
})

module.exports = router