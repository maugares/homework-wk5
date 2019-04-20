const Sequelize = require('sequelize')
const sequelize = require('../db')

const Playlist = sequelize.define(
  'playlists',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    logging: false,
    tableName: 'playlists'
  })

module.exports = Playlist