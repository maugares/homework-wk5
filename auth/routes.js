const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const Users = require('../users/model')
const bcrypt = require('bcrypt')
const auth = require('./middleware')

const router = new Router()

// define endpoints here

// Create a user Token on login
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
        res.status(400).send({
          message: 'User with that email does not exist'
        })
      }
      if (bcrypt.compareSync(req.headers.password, entity.password)) {
        res.send({
          jwt: toJWT({ userId: entity.id }),
          userId: entity.id
        })
      }
      else {
        res.status(400).send({
          message: 'Password was incorrect'
        })
      }
    })

    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
})

// REMOVE!!
// Restrict access to users with a valid Token
router.get('/test', auth, (req, res) => {
  console.log(res)
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})


module.exports = router