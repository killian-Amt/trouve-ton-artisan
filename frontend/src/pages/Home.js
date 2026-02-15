import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Home() {

  const [topArtisans, setTopArtisans] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/top-artisans")
      .then(response => {
        setTopArtisans(response.data.slice(0, 3))
      })
      .catch(error => {
        console.error("Erreur API :", error)
      })
  }, [])

  return (
    <div className="container mt-5">

      <h1 className="mb-4">Bienvenue sur Trouve ton artisan</h1>

      <section className="mb-5">
        <h3>Comment trouver mon artisan ?</h3>
        <p>
          Consultez les catégories disponibles dans le menu.
          Sélectionnez un artisan selon sa spécialité et sa localisation.
          Consultez sa fiche détaillée et utilisez le formulaire pour le contacter.
        </p>
      </section>

      <section>
        <h3 className="mb-4">Artisans du mois</h3>

        <div className="row">
          {topArtisans.map(artisan => (
            <div key={artisan.id} className="col-md-4 mb-4">
              <div className="card shadow h-100">
                <div className="card-body d-flex flex-column">

                  <h5 className="card-title">{artisan.nom}</h5>
                  <p>⭐ {artisan.note}</p>
                  <p><strong>Spécialité :</strong> {artisan.specialite}</p>
                  <p><strong>Ville :</strong> {artisan.ville}</p>

                  <Link 
                    to={`/artisan/${artisan.id}`} 
                    className="btn btn-success mt-auto"
                  >
                    Voir détail
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  )
}

export default Home
