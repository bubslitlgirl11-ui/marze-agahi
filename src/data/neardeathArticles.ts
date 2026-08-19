import articlesData from './neardeath_articles.json'

export interface NearDeathArticle {
  id: number
  index: number
  title: string
  url: string
  date: string
  categories: string[]
  primary_category: string
  primary_category_slug: string
  text: string
  char_count: number
  word_count: number
}

export const NEARDEATH_ARTICLES: NearDeathArticle[] = articlesData as NearDeathArticle[]

export function getArticlesByCategory(categorySlug: string): NearDeathArticle[] {
  return NEARDEATH_ARTICLES.filter(
    (art) => art.primary_category_slug.toLowerCase() === categorySlug.toLowerCase()
  )
}

export function getArticleById(id: number): NearDeathArticle | undefined {
  return NEARDEATH_ARTICLES.find((art) => art.id === id)
}

export function searchArticles(query: string): NearDeathArticle[] {
  const q = query.trim().toLowerCase()
  if (!q) return NEARDEATH_ARTICLES
  return NEARDEATH_ARTICLES.filter(
    (art) =>
      art.title.toLowerCase().includes(q) ||
      art.text.toLowerCase().includes(q) ||
      art.categories.some((c) => c.toLowerCase().includes(q))
  )
}
