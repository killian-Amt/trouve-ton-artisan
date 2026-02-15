const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
)

async function connectDB() {
  try {
    await sequelize.authenticate()
    console.log("Connexion MySQL réussie")
  } catch (error) {
    console.error("Erreur connexion MySQL :", error)
  }
}

module.exports = { sequelize, connectDB }
