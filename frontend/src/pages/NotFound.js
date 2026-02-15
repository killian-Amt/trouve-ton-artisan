import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="container text-center mt-5">

      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="Page non trouvée"
        width="200"
        className="mb-4"
      />

      <h1>404 - Page non trouvée</h1>

      <p>
        La page que vous avez demandée n'existe pas ou a été déplacée.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Retour à l'accueil
      </Link>

    </div>
  )
}

export default NotFound
