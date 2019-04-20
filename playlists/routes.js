const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

//-------   CREATE A PLAYLIST   -------//
router.post('/playlists', auth, (req, res, next) => {
  const userId = req.user.dataValues.id
  Playlist
    .create({
      name: req.headers.name,
      userId: userId
    })
    .then(playlist => {
      if (!playlist) {
        res.status(404).send({
          message: `Playlist not provided`
        })
      }
      res.setHeader('userId', userId)
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
        userId: userId
      }
    })
    .then(playlists => {
      if (!playlist) {
        res.status(404).send({
          message: `Playlist does not exist`
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
        userId: userId,
      }
    })
    .then(playlist => {
      if (!playlist) {
        res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.send(playlist)
    })
    .catch(error => {
      res.status(400).send({
        message: `User playlist not found`
      })
      next(error)
    })
})

router.delete('/playlists/:id', auth, (req, res, next) => {
  const userId = req.user.dataValues.id
  Playlist
    .findOne({
      where: {
        id: req.params.id,
        userId: userId,
      }
    })
    .then(playlist => {
      if (!playlist) {
        res.status(404).send({
          message: `Playlist does not exist`
        })
      }
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