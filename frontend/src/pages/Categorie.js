import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

function Categorie() {

  const { id } = useParams()
  const [artisans, setArtisans] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/api/categories/${id}/artisans`)
      .then(response => {
        setArtisans(response.data)
      })
      .catch(error => {
        console.error("Erreur API :", error)
      })
  }, [id])

  return (
    <div className="container mt-5">
      <h1>Artisans de la catégorie</h1>

      <div className="row mt-4">
        {artisans.map(artisan => (
          <div key={artisan.id} className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body d-flex flex-column">

                <h5 className="card-title">{artisan.nom}</h5>

                <p>⭐ {artisan.note}</p>

                <p>
                  <strong>Spécialité :</strong> {artisan.specialite}
                </p>

                <p>
                  <strong>Ville :</strong> {artisan.ville}
                </p>

                <Link 
                  to={`/artisan/${artisan.id}`} 
                  className="btn btn-primary mt-auto"
                >
                  Voir détail
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Categorie
