import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllAreas } from '../api/meals'

const areaEmojis: Record<string, string> = {
  American: '🇺🇸', British: '🇬🇧', Canadian: '🇨🇦', Chinese: '🇨🇳',
  Croatian: '🇭🇷', Dutch: '🇳🇱', Egyptian: '🇪🇬', Filipino: '🇵🇭',
  French: '🇫🇷', Greek: '🇬🇷', Indian: '🇮🇳', Irish: '🇮🇪',
  Italian: '🇮🇹', Jamaican: '🇯🇲', Japanese: '🇯🇵', Kenyan: '🇰🇪',
  Malaysian: '🇲🇾', Mexican: '🇲🇽', Moroccan: '🇲🇦', Polish: '🇵🇱',
  Portuguese: '🇵🇹', Russian: '🇷🇺', Spanish: '🇪🇸', Thai: '🇹🇭',
  Tunisian: '🇹🇳', Turkish: '🇹🇷', Ukrainian: '🇺🇦', Uruguayan: '🇺🇾',
  Vietnamese: '🇻🇳', Unknown: '🌍',
}

export default function Explore() {
  const [areas, setAreas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllAreas().then(data => {
      setAreas(data)
      setLoading(false)
    })
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-3">🗺️</div>
        <h1
          className="text-4xl md:text-5xl font-black mb-3"
          style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-ink)' }}
        >
          Explore by Region
        </h1>
        <p className="text-lg opacity-60" style={{ color: 'var(--color-ink)' }}>
          Pick a country and discover its most beloved dishes
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center text-4xl animate-pulse mt-20">🌍</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {areas.map(area => (
            <div
              key={area}
              onClick={() => navigate(`/search?area=${encodeURIComponent(area)}`)}
              className="cursor-pointer rounded-2xl p-5 text-center transition-transform hover:scale-105 shadow-sm hover:shadow-md"
              style={{ backgroundColor: 'white', border: '2px solid transparent' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-papaya)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
            >
              <div className="text-4xl mb-2">{areaEmojis[area] || '🌍'}</div>
              <div className="font-semibold text-sm" style={{ color: 'var(--color-ink)' }}>
                {area}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}