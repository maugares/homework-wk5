const { Router } = require('express')
const Company = require('./model')

const router = new Router()

const errorMessage = () => {
  return (res.status(404).send({
    message: `Company does not exist`
  }))
}

router.get('/companies', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offser || 0

  Promise.all([
    Company.count(),
    Company.findAll({ limit, offset })
  ])
    .then(([total, companies]) => {
      res.send([
        companies, total
      ])
    })
    .catch(error => next(error))
})

router.get('/companies/:id', (req, res, next) => {
  Company
    .findByPk(req.params.id)
    .then(company => {
      if (!company) {
        errorMessage()
      }
      return res.send(company)
    })
    .catch(error => next(error))
})

router.post('/companies', (req, res, next) => {
  Company
    .create(req.body)
    .then(company => {
      if (!company) {
        errorMessage()
      }
      return res.status(201).send(company)
    })
    .catch(error => next(error))
})

router.put('/companies/:id', (req, res, next) => {
  Company
    .findByPk(req.params.id)
    .then(company => {
      if (!company) {
        errorMessage()
      }
      return company.update(req.body).then(company => res.send(company))
    })
    .catch(error => next(error))
})

router.delete('/companies/:id', (req, res, next) => {
  Company
    .findByPk(req.params.id)
    .then(company => {
      if (!company) {
        errorMessage()
      }
      return company.destroy()
        .then(() => res.send({
          message: `Company was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router