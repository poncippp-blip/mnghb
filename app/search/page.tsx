import MangaCard from '@/components/MangaCard'
import { FiSearch } from 'react-icons/fi'
import { mockManga } from '@/lib/mockData'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  const results = query.trim()
    ? mockManga.filter((manga) => {
        const searchLower = query.toLowerCase()
        return (
          manga.title.toLowerCase().includes(searchLower) ||
          manga.description.toLowerCase().includes(searchLower) ||
          manga.alternativeTitles.some((title) => title.toLowerCase().includes(searchLower)) ||
          manga.author.some((author) => author.toLowerCase().includes(searchLower)) ||
          manga.genres.some((genre) => genre.toLowerCase().includes(searchLower))
        )
      })
    : []

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          {query && (
            <p className="text-gray-600 dark:text-gray-400">
              Found {results.length} results for &quot;{query}&quot;
            </p>
          )}
        </div>

        {!query ? (
          <div className="text-center py-20">
            <FiSearch className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Start Searching</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Use the search bar above to find your favorite manga
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map((manga) => (
              <MangaCard
                key={manga.id}
                id={manga.id}
                title={manga.title}
                slug={manga.slug}
                coverImage={manga.coverImage}
                rating={manga.rating}
                views={manga.views}
                latestChapter={manga.chapters[0]?.chapterNumber}
                genres={manga.genres}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FiSearch className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
