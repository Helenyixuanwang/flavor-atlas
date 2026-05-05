import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getRandomMeal } from '../api/meals'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  async function handleRandom() {
    const meal = await getRandomMeal()
    if (meal) navigate(`/meal/${meal.idMeal}`)
  }

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 px-4 text-center"
        style={{ backgroundColor: 'var(--color-ink)' }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, var(--color-papaya) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--color-saffron) 0%, transparent 40%)'
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="text-6xl mb-4">🌍</div>
          <h1
            className="text-5xl md:text-7xl font-black mb-4 leading-tight"
            style={{ color: 'var(--color-saffron)', fontFamily: 'Playfair Display, serif' }}
          >
            Explore World Flavors
          </h1>
          <p className="text-lg md:text-xl mb-10" style={{ color: 'var(--color-cream)', opacity: 0.8 }}>
            Discover delicious recipes from every corner of the globe 🍜🌮🍣
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto mb-4">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Try 'pasta', 'sushi', 'tacos'..."
              className="flex-1 px-5 py-3 rounded-full text-base outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'var(--color-cream)',
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--color-papaya)' }}
            >
              Search
            </button>
          </form>

          {/* Random button */}
          <button
            onClick={handleRandom}
            className="px-6 py-2 rounded-full font-semibold transition-transform hover:scale-105 text-sm"
            style={{
              backgroundColor: 'var(--color-saffron)',
              color: 'var(--color-ink)'
            }}
          >
            🎲 Surprise Me!
          </button>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2
          className="text-3xl font-bold text-center mb-10"
          style={{ color: 'var(--color-ink)' }}
        >
          What would you like to explore?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div
            onClick={() => navigate('/explore')}
            className="cursor-pointer rounded-2xl p-8 text-center transition-transform hover:scale-105 shadow-md"
            style={{ backgroundColor: 'var(--color-papaya)' }}
          >
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-white mb-2">By Region</h3>
            <p className="text-white opacity-80 text-sm">Japanese, Mexican, Italian and more</p>
          </div>

          <div
            onClick={() => navigate('/categories')}
            className="cursor-pointer rounded-2xl p-8 text-center transition-transform hover:scale-105 shadow-md"
            style={{ backgroundColor: 'var(--color-forest)' }}
          >
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-white mb-2">By Category</h3>
            <p className="text-white opacity-80 text-sm">Seafood, Dessert, Pasta and more</p>
          </div>

          <div
            onClick={handleRandom}
            className="cursor-pointer rounded-2xl p-8 text-center transition-transform hover:scale-105 shadow-md"
            style={{ backgroundColor: 'var(--color-saffron)' }}
          >
            <div className="text-5xl mb-4">🎲</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-ink)' }}>Random Meal</h3>
            <p className="opacity-70 text-sm" style={{ color: 'var(--color-ink)' }}>Feeling adventurous? Try something new!</p>
          </div>

        </div>
      </section>
      {/* Footer */}
      <footer className="text-center py-8 text-sm" style={{ color: 'var(--color-ink)' }}>
        <p className="opacity-40 mb-2">Built by Helen Wang · {new Date().getFullYear()}</p>
        <div className="flex justify-center gap-6">
          < a
            href="https://linkedin.com/in/helenyixuanwang"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 transition-opacity font-medium"
            style={{ color: 'var(--color-papaya)' }}
          >
            LinkedIn
          </a>
          < a
            href="https://github.com/Helenyixuanwang"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 transition-opacity font-medium"
            style={{ color: 'var(--color-papaya)' }}
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  )
}