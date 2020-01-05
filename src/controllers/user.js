const Router = require('express').Router
const userService = require('../services/user')
const jwt = require('jsonwebtoken')
const config = require('../config')
const memchaced = require('../db/memchaced')
const { isDev } = require('../utils')

const router = Router()
const secret = isDev() ? config.dev.secret : config.prod.secret

router.get('/user/init', (req, res) => {
  return res.render('init')
})

router.post('/user/init', (req, res) => {
  const { userName, password } = req.body
  userService.createAccount(userName, password)
    .then(() => {
      const token = jwt.sign(userName, secret)
      res.cookie('token', token, {
        maxAge: 3600000 * 8 // 2 hours
      })
      memchaced.set(token, true, 7200 * 4, (err, reply) => {
        if (!err)
          return res.json({
            code: 0,
            msg: 'ok'
          })
        else 
          return res.json({
            code: 1,
            msg: err.message
          })
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

router.post('/user/login', (req, res) => {
  const { userName, password } = req.body
  userService.login(userName, password)
    .then(data => {
      if (data[0].count > 0) {
        const token = jwt.sign(userName, secret)
        res.cookie('token', token, {
          maxAge: 3600000 * 8 // 2 hours
        })
        memchaced.set(token, true, 7200 * 4, (err, reply) => {
          if (!err)
            return res.json({
              code: 0,
              msg: 'ok'
            })
          else 
            return res.json({
              code: 1,
              msg: err.message
            })
        })
      } else {
        throw new Error(`账号不存在或者密码错误！`)
      }
    })
    .catch(err => {
      return res.json({
        code: 1,
        msg: err.message
      })
    })
})

module.exports = router