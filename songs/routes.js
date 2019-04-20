const { Router } = require('express')
const Playlist = require('../playlists/model')
const Song = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

//-------   CREATE A PLAYLIST   -------//
router.post('/playlists/:id/songs', auth, (req, res, next) => {
  // console.log(req.params)
  const userId = req.user.dataValues.id
  const h = req.headers
  console.log(h)

  // console.log(req.headers)
  Playlist
    .findOne({
      where: {
        id: req.params.id,
        user_id: userId,
      }
    })
    .then(playlist => {
      console.log(h.title, h.artist, h.album)
      Song
        .create({
          title: h.title,
          artist: h.artist,
          album: h.album,
          playlist_id: req.params.id,
          user_id: userId
        })
        .then(song => {
          console.log(song)
          if (!song) {
            res.status(422).send({
              message: `Song provided is incorrect`
            })
          }
          return res.status(201).send(song)
        })
        .catch(error => {
          res.status(422).send({
            message: `The song could not be added`
          })
          next(error)
        })
    })
    .catch(error => {
      res.status(404).send({
        message: `User playlist not found`
      })
      next(error)
    })
})


module.exports = router