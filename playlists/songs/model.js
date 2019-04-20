const Sequelize = require('sequelize')
const sequelize = require('../db')

const Song = sequelize.define(
  'songs',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    artist: {
      type: Sequelize.STRING,
      allowNull: false
    },
    album: {
      type: Sequelize.STRING,
      allowNull: false
    },
    playlist_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    logging: false,
    tableName: 'songs'
  })

module.exports = Song