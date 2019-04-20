const { Router } = require('express')
const Playlist = require('./model')
const Song = require('../songs/model')
const auth = require('../auth/middleware')

const router = new Router()

//-------   CREATE A PLAYLIST   -------//
router.post('/playlists', auth, (req, res, next) => {
  const userId = req.user.dataValues.id
  Playlist
    .create({
      name: req.headers.name,
      user_id: userId
    })
    .then(playlist => {
      if (!playlist) {
        res.status(422).send({
          message: `Playlist provided is incorrect`
        })
      }
      res.setHeader('user_id', userId)
      return res.status(201).send(playlist)
    })
    .catch(error => {
      res.status(400).send({
        message: `Error ${error.name}:${error.message}`
      })
      next(error)
    })
})

//-------   GET ALL PLAYLISTS   -------//
router.get('/playlists', auth, (req, res, next) => {
  const userId = req.user.dataValues.id
  Playlist
    .findAll({
      where: {
        user_id: userId
      }
    })
    .then(playlists => {
      if (!playlists) {
        res.status(422).send({
          message: `Playlist provided is incorrect`
        })
      }
      return res.send([playlists])
    })
    .catch(error => {
      res.status(400).send({
        message: `Error ${error.name}:${error.message}`
      })
      next(error)
    })
})

//-------   GET ONE PLAYLIST   -------//
router.get('/playlists/:id', auth, (req, res, next) => {
  const userId = req.user.dataValues.id
  Playlist
    .findOne({
      where: {
        id: req.params.id,
        user_id: userId,
      }
    })
    .then(playlist => {
      if (!playlist) {
        res.status(422).send({
          message: `Playlist provided is incorrect`
        })
      }
      return res.send(playlist)
    })
    .catch(error => {
      res.status(404).send({
        message: `User playlist not found`
      })
      next(error)
    })
})

router.delete('/playlists/:id', auth, (req, res, next) => {
  const playlistId = req.params.id
  const userId = req.user.dataValues.id
  Playlist
    .findOne({
      where: {
        id: playlistId,
        user_id: userId,
      }
    })
    .then(playlist => {
      if (!playlist) {
        res.status(404).send({
          message: `Playlist provided is incorrect`
        })
      }


      Song
        .findAll({
          where: {
            playlist_id: playlistId
          }
        })
        .then(songs => {
          for (song in songs) {
            songs[song].destroy()
          }

        })
        .catch(error => {
          res.status(400).send({
            message: `Error ${error.name}:${error.message}`
          })
          next(error)
        })
      return playlist.destroy()
        .then(() => res.send({
          message: `Playlist was deleted`
        }))


    })
    .catch(error => {
      res.status(400).send({
        message: `Error ${error.name}:${error.message}`
      })
      next(error)
    })
})

module.exports = router