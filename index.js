const express = require('express')
const usersRouter = require('./users/routes')
const companiesRouter = require('./companies/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(usersRouter)
  .use(companiesRouter)
  .listen(4000, () => console.log(`Listening on port ${port}`))