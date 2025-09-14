// file imports
import HomePage from "./components/HomePage"
import SuperHeroesPage from "./components/SuperHeroesPage"
import RQSuperHeroesPage from "./components/RQSuperHeroesPage"
import "./App.css";
// dependency imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/superheroes" element={<SuperHeroesPage />} />
        <Route path="/react-query" element={<RQSuperHeroesPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
