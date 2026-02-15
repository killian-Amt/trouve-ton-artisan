const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')

const { Categorie, Specialite, Artisan } = require('../models')

/*
    GET toutes les catégories
*/
router.get('/categories', async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: { model: Specialite }
    })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/*
    GET tous les artisans
*/
router.get('/artisans', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        include: Categorie
      }
    })
    res.json(artisans)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/*
    GET artisan par ID
*/
router.get('/artisans/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: {
        model: Specialite,
        include: Categorie
      }
    })

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" })
    }

    res.json(artisan)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/*
    GET artisans du mois
*/
router.get('/artisans-du-mois', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { artisan_du_mois: true },
      include: {
        model: Specialite,
        include: Categorie
      }
    })
    res.json(artisans)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/*
    RECHERCHE par nom
*/
router.get('/search', async (req, res) => {
  try {
    const { nom } = req.query

    if (!nom) {
      return res.status(400).json({ message: "Paramètre nom manquant" })
    }

    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [Op.like]: `%${nom}%`
        }
      },
      include: {
        model: Specialite,
        include: Categorie
      }
    })

    res.json(artisans)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/*
    FORMULAIRE CONTACT (Simulation)
*/
router.post('/contact', async (req, res) => {
  try {
    const { artisanId, nom, email, objet, message } = req.body

    // Validation simple
    if (!artisanId || !nom || !email || !objet || !message) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires"
      })
    }

    const artisan = await Artisan.findByPk(artisanId)

    if (!artisan) {
      return res.status(404).json({
        message: "Artisan non trouvé"
      })
    }

    // Simulation envoi email
    console.log("------ NOUVEAU MESSAGE ------")
    console.log("Pour :", artisan.email)
    console.log("De :", email)
    console.log("Nom :", nom)
    console.log("Objet :", objet)
    console.log("Message :", message)
    console.log("-----------------------------")

    res.json({
      message: "Message envoyé avec succès (simulation)"
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
