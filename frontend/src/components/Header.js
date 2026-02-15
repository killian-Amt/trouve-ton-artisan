import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import logo from "../assets/Logo.png"

function Header() {

  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(response => {
        setCategories(response.data)
      })
      .catch(error => {
        console.error("Erreur catégories :", error)
      })
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img 
          src={logo} 
          alt="Logo" 
          width="40" 
          className="me-2"
        />
        Trouve ton artisan
      </Link>

      <div className="collapse navbar-collapse">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {categories.map(cat => (
            <li key={cat.id} className="nav-item">
              <Link 
                to={`/categorie/${cat.id}`} 
                className="nav-link"
              >
                {cat.nom}
              </Link>
            </li>
          ))}

        </ul>

        <form className="d-flex">
          <input
            type="search"
            className="form-control me-2"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

      </div>
    </nav>
  )
}

export default Header
