const Sequelize = require('sequelize')

const connectionString = process.env.PORT || 'postgres://postgres:12341234@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, { define: { timestamps: false, logging: false} })

sequelize.sync({ force: false })
  .then(() => {
    console.log('Sequelize updated database schema')
  })
  .catch(console.error)

module.exports = sequelize