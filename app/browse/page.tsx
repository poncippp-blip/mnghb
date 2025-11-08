import { prisma } from '@/lib/prisma'
import MangaCard from '@/components/MangaCard'
import FilterSidebar from '@/components/FilterSidebar'
import { MangaStatus, MangaType } from '@prisma/client'

interface BrowsePageProps {
  searchParams: {
    status?: MangaStatus
    type?: MangaType
    genre?: string
    sort?: string
  }
}

async function getBrowseManga(filters: BrowsePageProps['searchParams']) {
  const where: any = {}

  if (filters.status) {
    where.status = filters.status
  }

  if (filters.type) {
    where.type = filters.type
  }

  if (filters.genre) {
    where.genres = {
      some: {
        slug: filters.genre,
      },
    }
  }

  let orderBy: any = { updatedAt: 'desc' }

  switch (filters.sort) {
    case 'popular':
      orderBy = { views: 'desc' }
      break
    case 'rating':
      orderBy = { rating: 'desc' }
      break
    case 'title':
      orderBy = { title: 'asc' }
      break
    case 'latest':
      orderBy = { createdAt: 'desc' }
      break
  }

  const manga = await prisma.manga.findMany({
    where,
    orderBy,
    include: {
      genres: true,
      chapters: {
        orderBy: { chapterNumber: 'desc' },
        take: 1,
      },
    },
    take: 48,
  })

  return manga
}

async function getGenres() {
  return await prisma.genre.findMany({
    orderBy: { name: 'asc' },
  })
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const [manga, genres] = await Promise.all([
    getBrowseManga(searchParams),
    getGenres(),
  ])

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Browse Manga</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar genres={genres} currentFilters={searchParams} />
          </aside>

          <div className="flex-1">
            {manga.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {manga.map((m) => (
                  <MangaCard
                    key={m.id}
                    id={m.id}
                    title={m.title}
                    slug={m.slug}
                    coverImage={m.coverImage}
                    rating={m.rating}
                    views={m.views}
                    latestChapter={m.chapters[0]?.chapterNumber}
                    genres={m.genres.map((g) => g.name)}
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
