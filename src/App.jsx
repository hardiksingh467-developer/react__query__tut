// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// file imports
import HomePage from "./components/HomePage"
import SuperHeroesPage from "./components/SuperHeroesPage"
import RQSuperHeroesPage from "./components/RQSuperHeroesPage"
// import DefaultLayout from "./components/DefaultLayout"
import "./App.css"

function App() {

    return (
      <Router>
        <Routes>
          {/* Layout wrapper */}
            <Route path="/" element={<HomePage />} />
            <Route path="/superheroes" element={<SuperHeroesPage />} />
            <Route path="/react-query" element={<RQSuperHeroesPage />} />
            <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    )
}

export default App
