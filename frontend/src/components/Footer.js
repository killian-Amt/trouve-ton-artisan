import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 p-4">

      <div className="container">

        <div className="row">

          <div className="col-md-6">
            <h5>Pages légales</h5>
            <ul className="list-unstyled">
              <li><Link to="/mentions-legales" className="text-light">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles" className="text-light">Données personnelles</Link></li>
              <li><Link to="/accessibilite" className="text-light">Accessibilité</Link></li>
              <li><Link to="/cookies" className="text-light">Cookies</Link></li>
            </ul>
          </div>

          <div className="col-md-6">
            <h5>Antenne de Lyon</h5>
            <p>
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              +33 (0)4 26 73 40 00
            </p>
          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer
