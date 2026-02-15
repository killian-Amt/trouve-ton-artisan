import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Artisans() {

  const [artisans, setArtisans] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5000/api/artisans")
      .then(response => {
        setArtisans(response.data)
      })
      .catch(error => {
        console.error("Erreur API :", error)
      })
  }, [])

  // 🔎 Filtrage par nom
  const artisansFiltres = artisans.filter(artisan =>
    artisan.nom.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mt-5">
      <h1>Liste des artisans</h1>

      {/* Barre de recherche */}
      <div className="mt-4 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un artisan par nom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {artisansFiltres.length > 0 ? (
          artisansFiltres.map(artisan => (
            <div key={artisan.id} className="col-md-4 mb-4">
              <div className="card shadow h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{artisan.nom}</h5>
                  <p>⭐ {artisan.note}</p>
                  <p><strong>Spécialité :</strong> {artisan.Specialite?.nom}</p>
                  <p><strong>Localisation :</strong> {artisan.localisation}</p>

                  <Link
                    to={`/artisan/${artisan.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    Voir détail
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun artisan trouvé.</p>
        )}
      </div>

    </div>
  )
}

export default Artisans
