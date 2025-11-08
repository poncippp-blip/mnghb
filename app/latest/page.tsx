import MangaCard from '@/components/MangaCard'
import { mockManga } from '@/lib/mockData'

export default function LatestPage() {
  const latest = mockManga

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Latest Updates</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {latest.map((m) => (
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
      </div>
    </div>
  )
}
