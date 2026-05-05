import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Categories from './pages/Categories'
import SearchResults from './pages/SearchResults'
import MealDetail from './pages/MealDetail'

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/meal/:id" element={<MealDetail />} />
      </Routes>
    </div>
  )
}

export default App