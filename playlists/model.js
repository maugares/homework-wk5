const Sequelize = require('sequelize')
const sequelize = require('../db')

const Playlist = sequelize.define(
  'playlists',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    logging: false,
    tableName: 'playlists'
  })

module.exports = Playlist