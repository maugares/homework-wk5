const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/users', (req, res, next) => {
  const email = req.headers.email
  const password = req.headers.password
  const password_confirmation = req.headers.password_confirmation

  const user = {
    email: email,
    password: bcrypt.hashSync(password, 10)
  }

  if (password === password_confirmation) {
    User
      .create(user)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: `user does not exist`
          })
        }
        return res.status(201).send(user)
      })
      .catch(error => {
        res.status(400).send({
          message: `Error ${error.name}:${error.message}`
        })
        next(error)})
  } else {
    res.status(400).send({
      message: 'Passwords do not match'
    })
  }
})

module.exports = router