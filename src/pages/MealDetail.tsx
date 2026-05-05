import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMealById, extractIngredients } from '../api/meals'
import type { Meal } from '../api/meals'

export default function MealDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      getMealById(id).then(data => {
        setMeal(data)
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return <div className="text-center text-5xl animate-pulse mt-32">🍳</div>
  }

  if (!meal) {
    return (
      <div className="text-center mt-32">
        <div className="text-5xl mb-4">😕</div>
        <p className="opacity-60">Meal not found.</p>
      </div>
    )
  }

  const ingredients = extractIngredients(meal)
  const youtubeId = meal.strYoutube
  ? new URL(meal.strYoutube).searchParams.get('v') ||
    meal.strYoutube.split('/').pop()
  : null

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-medium mb-6 flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: 'var(--color-ink)' }}
      >
        ← Back
      </button>

      {/* Title */}
      <h1
        className="text-4xl md:text-5xl font-black mb-2 leading-tight"
        style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-ink)' }}
      >
        {meal.strMeal}
      </h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {meal.strCategory && (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: 'var(--color-papaya)' }}
          >
            {meal.strCategory}
          </span>
        )}
        {meal.strArea && (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: 'var(--color-forest)' }}
          >
            {meal.strArea}
          </span>
        )}
        {meal.strTags && meal.strTags.split(',').map(tag => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'var(--color-saffron)', color: 'var(--color-ink)' }}
          >
            {tag.trim()}
          </span>
        ))}
      </div>

      {/* Image + Ingredients side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Image */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full rounded-2xl shadow-lg object-cover aspect-square"
        />

        {/* Ingredients */}
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'white' }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-ink)' }}
          >
            🛒 Ingredients
          </h2>
          <ul className="space-y-2">
            {ingredients.map(({ ingredient, measure }) => (
              <li
                key={ingredient}
                className="flex justify-between text-sm border-b pb-1"
                style={{ borderColor: 'var(--color-cream)' }}
              >
                <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                  {ingredient}
                </span>
                <span className="opacity-60" style={{ color: 'var(--color-ink)' }}>
                  {measure}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-2xl p-6 mb-10" style={{ backgroundColor: 'white' }}>
        <h2
          className="text-xl font-bold mb-4"
          style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-ink)' }}
        >
          📋 Instructions
        </h2>
        <div className="space-y-3">
          {meal.strInstructions.split('\n').filter(p => p.trim()).map((para, i) => (
            <p key={i} className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--color-ink)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* YouTube embed */}
      {youtubeId && (
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <h2
            className="text-xl font-bold px-6 pt-6 pb-3"
            style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-ink)' }}
          >
            🎬 Watch & Cook
          </h2>
          <div className="relative aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={meal.strMeal}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  )
}