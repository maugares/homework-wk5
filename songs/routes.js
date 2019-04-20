const { Router } = require('express')
const Playlist = require('../playlists/model')
const Song = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

//-------   ADD A SONG TO A PLAYLIST   -------//
router.post('/playlists/:id/songs', auth, (req, res, next) => {
  const userId = req.user.dataValues.id

  Playlist
    .findOne({
      where: {
        id: req.params.id,
        user_id: userId,
      }
    })
    .then(playlist => {


      Song
        .create({
          title: req.headers.title,
          artist: req.headers.artist,
          album: req.headers.album,
          playlist_id: req.params.id,
          user_id: userId
        })
        .then(song => {
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

router.get('/playlists/:id/songs', auth, (req, res, next) => {
  const userId = req.user.dataValues.id


  Song
    .findAll({
      where: {
        user_id: userId,
        playlist_id: req.params.id,
      }
    })
    .then(songs => {
      console.log(songs)
      if (!songs) {
        res.status(422).send({
          message: `Song request is not valid`
        })
      }
      if (songs<1) {
        res.status(404).send({
          message: `User playlist not found`
        })
      }
      return res.send(songs)
    })
    .catch(error => {
      res.status(404).send({
        message: `User playlist not found`
      })
    })
})

module.exports = router