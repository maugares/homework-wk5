const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.post('/playlists', auth, (req, res, next) => {
  Playlist
    .create(req.headers)
    .then(playlist => {
      if (!playlist) {
        errorMessage()
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

module.exports = router