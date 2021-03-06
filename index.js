const express = require('express')
const usersRouter = require('./users/routes')
const authRouter = require('./auth/routes')
const playlistsRouter = require('./playlists/routes')
const songsRouter = require('./songs/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(authRouter)
  .use(usersRouter)
  .use(playlistsRouter)
  .use(songsRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))