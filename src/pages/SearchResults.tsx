import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { searchMeals, getMealsByArea, getMealsByCategory } from '../api/meals'
import type { MealSummary } from '../api/meals'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const [meals, setMeals] = useState<MealSummary[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const query = searchParams.get('q')
  const area = searchParams.get('area')
  const category = searchParams.get('category')

  // Build a human-readable title
  const title = query
    ? `Results for "${query}"`
    : area
    ? `🌍 ${area} Cuisine`
    : category
    ? `🍽️ ${category}`
    : 'Search Results'

  useEffect(() => {
    setLoading(true)
    setMeals([])

    async function fetchMeals() {
      let results: MealSummary[] = []
      if (query) results = await searchMeals(query)
      else if (area) results = await getMealsByArea(area)
      else if (category) results = await getMealsByCategory(category)
      setMeals(results)
      setLoading(false)
    }

    fetchMeals()
  }, [query, area, category])

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium mb-4 flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--color-ink)' }}
        >
          ← Back
        </button>
        <h1
          className="text-3xl md:text-4xl font-black"
          style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-ink)' }}
        >
          {title}
        </h1>
        {!loading && (
          <p className="mt-1 opacity-50 text-sm" style={{ color: 'var(--color-ink)' }}>
            {meals.length} {meals.length === 1 ? 'dish' : 'dishes'} found
          </p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-5xl animate-pulse mt-20">🍜</div>
      )}

      {/* No results */}
      {!loading && meals.length === 0 && (
        <div className="text-center mt-20">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-lg opacity-60" style={{ color: 'var(--color-ink)' }}>
            No dishes found. Try a different search!
          </p>
        </div>
      )}

      {/* Meal grid */}
      {!loading && meals.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {meals.map(meal => (
            <div
              key={meal.idMeal}
              onClick={() => navigate(`/meal/${meal.idMeal}`)}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: 'white' }}
            >
              <img
                src={`${meal.strMealThumb}/medium`}
                alt={meal.strMeal}
                className="w-full aspect-square object-cover"
              />
              <div className="p-3">
                <p
                  className="font-semibold text-sm leading-tight"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {meal.strMeal}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}