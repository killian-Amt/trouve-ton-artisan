const Categorie = require('./Categorie')
const Specialite = require('./Specialite')
const Artisan = require('./Artisan')

// Relations

Categorie.hasMany(Specialite, {
  foreignKey: 'categorie_id'
})

Specialite.belongsTo(Categorie, {
  foreignKey: 'categorie_id'
})

Specialite.hasMany(Artisan, {
  foreignKey: 'specialite_id'
})

Artisan.belongsTo(Specialite, {
  foreignKey: 'specialite_id'
})

module.exports = {
  Categorie,
  Specialite,
  Artisan
}
