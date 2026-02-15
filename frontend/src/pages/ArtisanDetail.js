import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function ArtisanDetail() {

  const { id } = useParams()
  const [artisan, setArtisan] = useState(null)

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: ""
  })

  const [messageConfirmation, setMessageConfirmation] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:5000/api/artisans/${id}`)
      .then(response => {
        setArtisan(response.data)
      })
      .catch(error => {
        console.error("Erreur API :", error)
      })
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post("http://localhost:5000/api/contact", {
      artisan_id: id,
      ...formData
    })
    .then(response => {
      setMessageConfirmation(response.data.message)
      setFormData({
        nom: "",
        email: "",
        message: ""
      })
    })
    .catch(error => {
      console.error("Erreur envoi :", error)
    })
  }

  if (!artisan) {
    return <div className="container mt-5">Chargement...</div>
  }

  return (
    <div className="container mt-5">
      <h1>{artisan.nom}</h1>

      <p>⭐ {artisan.note}</p>
      <p><strong>Spécialité :</strong> {artisan.specialite}</p>
      <p><strong>Catégorie :</strong> {artisan.categorie}</p>
      <p><strong>Ville :</strong> {artisan.ville}</p>

      <hr />

      <h4>À propos</h4>
      <p>{artisan.a_propos}</p>

      <hr />

      <h4>Formulaire de contact</h4>

      {messageConfirmation && (
        <div className="alert alert-success">
          {messageConfirmation}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3">

        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            name="nom"
            className="form-control"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-control"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Envoyer
        </button>

      </form>
    </div>
  )
}

export default ArtisanDetail
