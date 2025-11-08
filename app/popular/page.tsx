import { prisma } from '@/lib/prisma'
import MangaCard from '@/components/MangaCard'

async function getPopularManga() {
  return await prisma.manga.findMany({
    orderBy: { views: 'desc' },
    include: {
      genres: true,
      chapters: {
        orderBy: { chapterNumber: 'desc' },
        take: 1,
      },
    },
    take: 48,
  })
}

export default async function PopularPage() {
  const manga = await getPopularManga()

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Popular Manga</h1>

        {manga.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
            <p className="text-gray-600 dark:text-gray-400">No manga available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
