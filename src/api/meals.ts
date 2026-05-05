const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strYoutube: string
  strTags: string
  [key: string]: string // for dynamic ingredient/measure keys
}

export interface MealSummary {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

// Search meals by name
export async function searchMeals(query: string): Promise<MealSummary[]> {
  const res = await fetch(`${BASE_URL}/search.php?s=${query}`)
  const data = await res.json()
  return data.meals || []
}

// Get full meal detail by ID
export async function getMealById(id: string): Promise<Meal | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}

// Get all meals by area (region)
export async function getMealsByArea(area: string): Promise<MealSummary[]> {
  const res = await fetch(`${BASE_URL}/filter.php?a=${area}`)
  const data = await res.json()
  return data.meals || []
}

// Get all meals by category
export async function getMealsByCategory(category: string): Promise<MealSummary[]> {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`)
  const data = await res.json()
  return data.meals || []
}

// Get a random meal
export async function getRandomMeal(): Promise<Meal | null> {
  const res = await fetch(`${BASE_URL}/random.php`)
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}

// Get all areas (regions)
export async function getAllAreas(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/list.php?a=list`)
  const data = await res.json()
  return data.meals ? data.meals.map((m: { strArea: string }) => m.strArea) : []
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/categories.php`)
  const data = await res.json()
  return data.categories ? data.categories.map((m: { strCategory: string }) => m.strCategory) : []
}

// Extract ingredients from a full meal object
export function extractIngredients(meal: Meal): { ingredient: string; measure: string }[] {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient: ingredient.trim(), measure: measure?.trim() || '' })
    }
  }
  return ingredients
}