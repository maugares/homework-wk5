const Sequelize = require('sequelize')
const sequelize = require('../db')

const Company = sequelize.define(
  'companies',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    foundingYear: {
      type: Sequelize.INTEGER,
      field: 'founding_year',
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
    }
  },
  {
    timestamps: false,
    logging: false,
    tableName: 'companies'
  })

module.exports = Company