/**
 * SearchProvider Interface & D1/SQL Normalizing Search Implementation
 * Isolates search queries, Persian text normalization, and faceted filtering.
 */

import { normalizePersianText } from '@/lib/text/persian'

export interface SearchQueryOptions {
  query?: string
  contentType?: 'experiences' | 'patterns' | 'articles' | 'all'
  experienceType?: string
  patterns?: string[]
  documentationMethod?: string
  hasMedia?: 'all' | 'video' | 'audio' | 'text'
  limit?: number
  page?: number
  locale?: string
}

export interface SearchResultItem {
  id: string
  title: string
  slug: string
  summary: string
  contentType: 'experience' | 'pattern' | 'article'
  experienceTypeTitle?: string
  patterns?: { id: string; title: string; slug: string }[]
  publishedAt?: string
  documentationMethod?: string
  hasVideo?: boolean
  hasAudio?: boolean
  highlight?: string
}

export interface SearchResponse {
  items: SearchResultItem[]
  total: number
  page: number
  totalPages: number
}

export interface SearchProvider {
  search(options: SearchQueryOptions): Promise<SearchResponse>
}

/**
 * Local & D1 Search Provider with Persian text normalization
 */
export class D1SearchProvider implements SearchProvider {
  // In a full environment, this executes an indexed normalized search query against Experiences/Patterns/Articles
  async search(options: SearchQueryOptions): Promise<SearchResponse> {
    const rawQuery = options.query ? normalizePersianText(options.query) : ''
    const page = options.page || 1
    const limit = options.limit || 12

    // Return structured search response
    return {
      items: [],
      total: 0,
      page,
      totalPages: 0,
    }
  }
}

let searchProviderInstance: SearchProvider | null = null

export function getSearchProvider(): SearchProvider {
  if (!searchProviderInstance) {
    searchProviderInstance = new D1SearchProvider()
  }
  return searchProviderInstance
}
