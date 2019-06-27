const Sequelize = require('sequelize')
const Models = require('./models')

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

Models.map(model => model(sequelize))
module.exports = sequelize