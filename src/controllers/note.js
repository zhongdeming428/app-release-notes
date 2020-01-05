const Router = require('express').Router
const jwt = require('jsonwebtoken')
const noteService = require('../services/note')
const { writeFileSync, readFileSync } = require('fs')
const md5 = require('md5')
const { resolve } = require('path')
const { execSync } = require('child_process')

const router = Router()
const loginMiddleware = require('../middlewares/login')

// home page
router.get('/', loginMiddleware, async (req, res) => {
  const token = req.cookies.token
  const userName = jwt.decode(token)
  const total = (await noteService.getTotal())[0].count
  const context = {
    userName,
    query: req.query
  }
  const { tab, offset = 0, limit = 10 } = req.query
  if (tab === 'list') {
    context.list = await noteService.getList(offset, limit)
    context.total = Math.ceil(total / limit)
    context.index = offset / limit + 1
  }
  return res.render('home', context)
})

router.post('/note', loginMiddleware, async (req, res) => {
  const { note, title, id } = req.body
  if (!note || !title) {
    return res.json({
      code: 1,
      msg: '请输入 note 内容以及标题！'
    })
  }
  const userName = jwt.decode(req.cookies.token)
  if (id) {
    // update
    const oldNote = (await noteService.get(id))[0]
    let path = oldNote.path
    execSync(`rm -rf ` + resolve(__dirname, '../../notes', path + '.html'))
    path = md5(note)
    writeFileSync(resolve(__dirname, '../../notes', `${path}.html`), note, {
      encoding: 'utf8'
    })
    noteService.update(id, path, title, userName).then(() => {
      return res.json({
        code: 0,
        msg: 'ok'
      })
    }).catch(err => {
      return res.json({
        code: 1,
        msg: err.message
      })
    })
    return
  }
  const path = `${md5(note)}`
  writeFileSync(resolve(__dirname, '../../notes', `${path}.html`), note, {
    encoding: 'utf8'
  })
  const result = await noteService.save(title, path, userName)
  if (result instanceof Error) {
    return res.json({
      code: 1,
      msg: result.message
    })
  } else {
    return res.json({
      code: 0,
      msg: 'ok'
    })
  }
})

router.get('/note', async (req, res) => {
  const { offset, limit = 10, id } = req.query
  const total = (await noteService.getTotal())[0].count
  if (id) {
    const note = await noteService.get(id)
    const content = readFileSync(resolve(__dirname, '../../notes', note[0].path + '.html')).toString('utf8')

    return res.json({
      code: 0,
      data: {
        note: {
          ...note[0],
          content
        },
        total
      }
    })
  }
  const list = await noteService.getList(offset, limit)
  return res.json({
    code: 0,
    data: {
      list,
      total
    }
  })
})

router.delete('/note', async (req, res) => {
  const note = (await noteService.get(req.query.id))[0]
  const { path } = note
  execSync(`rm -rf ${resolve(__dirname, '../../notes', `${path}.html`)}`)
  noteService.delete(req.query.id).then(result => {
    return res.json({
      code: 0,
      msg: 'ok'
    }).catch(err => {
      return res.json({
        code: 1,
        msg: err.message
      })
    })
  })
})

router.get('/note/total', async (req, res) => {
  const total = (await noteService.getTotal())[0].count
  return res.json({
    code: 0,
    data: total
  })
})

module.exports = router