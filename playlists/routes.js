const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')
// const { toData } = require('./jwt')

const router = new Router()

//-------   CREATE A PLAYLIST   -------//
router.post('/playlists', auth, (req, res, next) => {
  const userId = req.user.dataValues.id
  console.log(req.headers)
  Playlist
    .create({
      name: req.headers.name,
      userId: userId
    })
    .then(playlist => {
      if (!playlist) {
        errorMessage()
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
router.get('/playlists/:id', (req, res, next) => {
  // console.log(req)
  Playlist
    .findByPk(req.params.id)
    .then(playlist => {
      // console.log('Return from findByPk:', playlist)
      if (!playlist) {
        errorMessage()
      }
      return res.send(playlist)
    })
    .catch(error => {
      res.status(400).send({
        message: `Error ${error.name}:${error.message}`
      })
      next(error)
    })
})


module.exports = router