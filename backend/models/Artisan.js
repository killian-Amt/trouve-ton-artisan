const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.DECIMAL(2,1)
  },
  localisation: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING
  },
  telephone: {
    type: DataTypes.STRING
  },
  site_web: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  artisan_du_mois: {
    type: DataTypes.BOOLEAN
  }
}, {
  tableName: 'artisan',
  timestamps: false
})

module.exports = Artisan
