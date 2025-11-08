import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import MangaCard from '@/components/MangaCard'
import { FiSearch } from 'react-icons/fi'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

async function searchManga(query: string) {
  if (!query || query.trim().length === 0) {
    return []
  }

  const manga = await prisma.manga.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { alternativeTitles: { has: query } },
        { author: { has: query } },
      ],
    },
    include: {
      genres: true,
      chapters: {
        orderBy: { chapterNumber: 'desc' },
        take: 1,
      },
    },
    take: 50,
  })

  return manga
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const results = await searchManga(query)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          {query && (
            <p className="text-gray-600 dark:text-gray-400">
              Found {results.length} results for "{query}"
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
                genres={manga.genres.map((g) => g.name)}
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
