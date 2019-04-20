const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const Users = require('../users/model')
const bcrypt = require('bcrypt')
const auth = require('./middleware')

const router = new Router()

//-------   CREATE A USER TOKEN   -------//
router.post('/tokens', (req, res, next) => {
  const email = req.headers.email
  const password = req.headers.password

  Users
    .findOne({
      where: {
        email: req.headers.email
      }
    })
    .then(entity => {
      if (!entity) {
        res.status(404).send({
          message: 'No user registered with that email'
        })
      }
      if (bcrypt.compareSync(req.headers.password, entity.password)) {
        res.send({
          jwt: toJWT({ userId: entity.id }),
          userId: entity.id
        })
      }
      else {
        res.status(401).send({
          message: 'Password was incorrect'
        })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: `Error ${error.name}:${error.message}`
      })
      next(error)})
})

module.exports = router