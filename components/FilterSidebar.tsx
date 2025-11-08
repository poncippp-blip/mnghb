'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { MangaStatus, MangaType } from '@prisma/client'

interface Genre {
  id: string
  name: string
  slug: string
}

interface FilterSidebarProps {
  genres: Genre[]
  currentFilters: {
    status?: MangaStatus
    type?: MangaType
    genre?: string
    sort?: string
  }
}

export default function FilterSidebar({ genres, currentFilters }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/browse?${params.toString()}`)
  }

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg p-6 space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <select
          value={currentFilters.sort || 'updated'}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="updated">Recently Updated</option>
          <option value="latest">Latest Added</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <h3 className="font-semibold mb-3">Status</h3>
        <div className="space-y-2">
          {(['all', 'ONGOING', 'COMPLETED', 'HIATUS', 'CANCELLED'] as const).map((status) => (
            <label key={status} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value={status}
                checked={status === 'all' ? !currentFilters.status : currentFilters.status === status}
                onChange={(e) => updateFilter('status', e.target.value)}
                className="mr-2"
              />
              <span className="capitalize">{status.toLowerCase()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <h3 className="font-semibold mb-3">Type</h3>
        <div className="space-y-2">
          {(['all', 'MANGA', 'MANHWA', 'MANHUA', 'NOVEL', 'ONE_SHOT'] as const).map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                checked={type === 'all' ? !currentFilters.type : currentFilters.type === type}
                onChange={(e) => updateFilter('type', e.target.value)}
                className="mr-2"
              />
              <span className="capitalize">{type.toLowerCase().replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Genres */}
      <div>
        <h3 className="font-semibold mb-3">Genres</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="genre"
              value="all"
              checked={!currentFilters.genre}
              onChange={(e) => updateFilter('genre', e.target.value)}
              className="mr-2"
            />
            <span>All Genres</span>
          </label>
          {genres.map((genre) => (
            <label key={genre.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="genre"
                value={genre.slug}
                checked={currentFilters.genre === genre.slug}
                onChange={(e) => updateFilter('genre', e.target.value)}
                className="mr-2"
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => router.push('/browse')}
        className="w-full px-4 py-2 bg-gray-200 dark:bg-dark-700 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-600 transition"
      >
        Reset Filters
      </button>
    </div>
  )
}
