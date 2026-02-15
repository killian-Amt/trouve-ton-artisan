import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Artisans from "./pages/Artisans"
import ArtisanDetail from "./pages/ArtisanDetail"
import Categorie from "./pages/Categorie"
import NotFound from "./pages/NotFound"

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Router>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/artisan/:id" element={<ArtisanDetail />} />
        <Route path="/categorie/:id" element={<Categorie />} />

        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </Router>
  )
}

export default App
