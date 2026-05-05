import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <nav style={{ backgroundColor: 'var(--color-ink)' }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🌍</span>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-saffron)' }}
          >
            flavor-atlas
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/explore"
            className="text-sm font-medium transition-colors hover:text-yellow-300"
            style={{ color: 'var(--color-cream)' }}
          >
            🗺 Explore
          </Link>
          <Link
            to="/categories"
            className="text-sm font-medium transition-colors hover:text-yellow-300"
            style={{ color: 'var(--color-cream)' }}
          >
            🍽 Categories
          </Link>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search any dish..."
            className="w-full px-3 py-1.5 rounded-full text-sm outline-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'var(--color-cream)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'var(--color-papaya)', color: 'white' }}
          >
            Go
          </button>
        </form>

      </div>
    </nav>
  )
}