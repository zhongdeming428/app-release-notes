const router = require('express').Router()
const noteService = require('../services/note')
const { readFileSync } = require('fs')
const { resolve } = require('path')

router.get('/list', async (req, res) => {
  const { offset = 0, limit = 10 } = req.query
  const list = (await noteService.getList(offset, limit))
  return res.render('list', { list })
})

router.get('/list/:id', async (req, res) => {
  const { id } = req.params
  const note = (await noteService.get(id))[0]
  const name = `${note.path}.html`
  return res.render('note', {
    name
  })
})

module.exports = router