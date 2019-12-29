const Router = require('express').Router
const userService = require('../services/user')
const jwt = require('jsonwebtoken')
const config = require('../config')
const cache = require('../db/utils').cache

const router = Router()
const isDev = process.env.NODE_ENV === 'development'

router.get('/user/init', (req, res) => {
  return res.render('init')
})

router.post('/user/init', (req, res) => {
  const { userName, password } = req.body
  userService.createAccount(userName, password)
    .then(() => {
      const token = jwt.sign(userName, isDev ? config.dev.secret : config.prod.secret)
      res.cookie('token', token, {
        maxAge: 3600000 * 2 // 2 hours
      })
      cache.set('token', token, 7200)
      return res.json({
        code: 0,
        msg: 'ok'
      })
    })
    .catch(err => {
      return res.status(502).json({
        code: 1,
        msg: err.message
      })
    })
})

router.get('/user/login', (req, res) => {
  return res.render('login')
})

module.exports = router