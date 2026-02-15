const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // mets ton mot de passe si tu en as un
    database: "trouve_ton_artisan",
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error("Erreur connexion MySQL :", err);
    } else {
        console.log("Connecté à MySQL");
    }
});


// ROUTE TEST
app.get("/", (req, res) => {
    res.json({ message: "API Trouve ton artisan" });
});


// 🔹 Récupérer tous les artisans
app.get("/api/artisans", (req, res) => {
    const sql = `
        SELECT artisans.*, categories.nom AS categorie
        FROM artisans
        JOIN categories ON artisans.categorie_id = categories.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});


// 🔹 Récupérer un artisan par ID
app.get("/api/artisans/:id", (req, res) => {
    const sql = `
        SELECT artisans.*, categories.nom AS categorie
        FROM artisans
        JOIN categories ON artisans.categorie_id = categories.id
        WHERE artisans.id = ?
    `;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results[0]);
    });
});


// 🔹 Artisans du mois
app.get("/api/top-artisans", (req, res) => {
    const sql = `
        SELECT artisans.*, categories.nom AS categorie
        FROM artisans
        JOIN categories ON artisans.categorie_id = categories.id
        WHERE artisans.top_artisan = TRUE
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});


// 🔹 Simulation envoi message
app.post("/api/contact", (req, res) => {
    const { nom, email, message, artisan_id } = req.body;

    console.log("------ NOUVEAU MESSAGE ------");
    console.log("Nom :", nom);
    console.log("Email :", email);
    console.log("Message :", message);
    console.log("Artisan ID :", artisan_id);
    console.log("-----------------------------");

    res.json({ message: "Message envoyé avec succès (simulation)" });
});

// 🔹 Récupérer toutes les catégories
app.get("/api/categories", (req, res) => {
    const sql = "SELECT * FROM categories";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// 🔹 Artisans par catégorie
app.get("/api/categories/:id/artisans", (req, res) => {
    const sql = `
        SELECT artisans.*, categories.nom AS categorie
        FROM artisans
        JOIN categories ON artisans.categorie_id = categories.id
        WHERE categories.id = ?
    `;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log("Serveur lancé sur port 5000");
});
