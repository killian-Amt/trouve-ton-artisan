const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Specialite = sequelize.define('Specialite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'specialite',
  timestamps: false
})

module.exports = Specialite
