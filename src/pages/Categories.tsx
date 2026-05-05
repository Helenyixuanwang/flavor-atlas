import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategories } from '../api/meals'

const categoryEmojis: Record<string, string> = {
  Beef: '🥩', Breakfast: '🍳', Chicken: '🍗', Dessert: '🍰',
  Goat: '🐐', Lamb: '🫕', Miscellaneous: '🍲', Pasta: '🍝',
  Pork: '🥓', Seafood: '🦞', Side: '🥗', Starter: '🥟',
  Vegan: '🥦', Vegetarian: '🥕',
}

const categoryColors = [
  '#FF6B35', '#F7C948', '#2D6A4F', '#E63946',
  '#457B9D', '#A8DADC', '#6A4C93', '#F4A261',
  '#2A9D8F', '#E9C46A', '#264653', '#E76F51',
  '#8338EC', '#FB5607',
]

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllCategories().then(data => {
      setCategories(data)
      setLoading(false)
    })
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-3">🍽️</div>
        <h1
          className="text-4xl md:text-5xl font-black mb-3"
          style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-ink)' }}
        >
          Browse by Category
        </h1>
        <p className="text-lg opacity-60" style={{ color: 'var(--color-ink)' }}>
          From hearty mains to sweet desserts — find what you're craving
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center text-4xl animate-pulse mt-20">🍽️</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div
              key={category}
              onClick={() => navigate(`/search?category=${encodeURIComponent(category)}`)}
              className="cursor-pointer rounded-2xl p-5 text-center transition-transform hover:scale-105 shadow-sm hover:shadow-md"
              style={{ backgroundColor: categoryColors[index % categoryColors.length] }}
            >
              <div className="text-4xl mb-2">
                {categoryEmojis[category] || '🍴'}
              </div>
              <div className="font-semibold text-sm text-white">
                {category}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}