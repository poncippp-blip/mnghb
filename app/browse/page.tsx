import MangaCard from '@/components/MangaCard'
import FilterSidebar from '@/components/FilterSidebar'
import { mockManga, mockGenres } from '@/lib/mockData'

interface BrowsePageProps {
  searchParams: {
    status?: string
    type?: string
    genre?: string
    sort?: string
  }
}

export default function BrowsePage({ searchParams }: BrowsePageProps) {
  let filteredManga = [...mockManga]

  // Filter by status
  if (searchParams.status) {
    filteredManga = filteredManga.filter((m) => m.status === searchParams.status)
  }

  // Filter by type
  if (searchParams.type) {
    filteredManga = filteredManga.filter((m) => m.type === searchParams.type)
  }

  // Filter by genre
  if (searchParams.genre) {
    const genreName = mockGenres.find((g) => g.slug === searchParams.genre)?.name
    if (genreName) {
      filteredManga = filteredManga.filter((m) => m.genres.includes(genreName))
    }
  }

  // Sort
  switch (searchParams.sort) {
    case 'popular':
      filteredManga.sort((a, b) => b.views - a.views)
      break
    case 'rating':
      filteredManga.sort((a, b) => b.rating - a.rating)
      break
    case 'title':
      filteredManga.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'latest':
      filteredManga.sort((a, b) => b.year - a.year)
      break
    default:
      // Default: recently updated (use ID as proxy)
      break
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Browse Manga</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar genres={mockGenres} currentFilters={searchParams} />
          </aside>

          <div className="flex-1">
            {filteredManga.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredManga.map((m) => (
                  <MangaCard
                    key={m.id}
                    id={m.id}
                    title={m.title}
                    slug={m.slug}
                    coverImage={m.coverImage}
                    rating={m.rating}
                    views={m.views}
                    latestChapter={m.chapters[0]?.chapterNumber}
                    genres={m.genres}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-600 dark:text-gray-400">
                  No manga found with the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
