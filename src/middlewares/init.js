const { execSql } = require('../db/utils')

module.exports = function(req, res, next) {
  const sql = `SELECT COUNT(*) AS COUNT FROM d_app_release_notes.t_user`
  execSql(sql)
    .then(result => {
      if (result.COUNT === 0 && req.path !== '/user/init') {
        // redirect to init page
        res.redirect('/user/init')
      } else {
        next()
      }
    })
    .catch(err => {
      console.log(err)
    })
}