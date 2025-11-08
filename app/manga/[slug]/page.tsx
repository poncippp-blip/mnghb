import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { timeAgo } from '@/lib/utils'
import { FiEye, FiStar, FiClock } from 'react-icons/fi'
import { mockManga } from '@/lib/mockData'

interface MangaPageProps {
  params: {
    slug: string
  }
}

export default function MangaPage({ params }: MangaPageProps) {
  const manga = mockManga.find((m) => m.slug === params.slug)

  if (!manga) {
    notFound()
  }

  const statusColors = {
    ONGOING: 'bg-green-500',
    COMPLETED: 'bg-blue-500',
    HIATUS: 'bg-yellow-500',
    CANCELLED: 'bg-red-500',
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-[400px] mb-8">
        <Image
          src={manga.bannerImage || manga.coverImage}
          alt={manga.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-dark-900 via-black/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <div className="relative w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={manga.coverImage}
                alt={manga.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{manga.title}</h1>

            {manga.alternativeTitles.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Also known as: {manga.alternativeTitles.join(', ')}
                </span>
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <FiStar className="text-yellow-500" />
                <span className="font-semibold">{manga.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiEye className="text-gray-500" />
                <span>{manga.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {manga.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm hover:bg-primary-600 transition"
                >
                  {genre}
                </span>
              ))}
              <span className={`px-3 py-1 ${statusColors[manga.status]} text-white rounded-full text-sm`}>
                {manga.status}
              </span>
              <span className="px-3 py-1 bg-gray-200 dark:bg-dark-700 rounded-full text-sm">
                {manga.type}
              </span>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Author:</span>
                <span className="ml-2 font-semibold">{manga.author.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Artist:</span>
                <span className="ml-2 font-semibold">{manga.artist.join(', ')}</span>
              </div>
              {manga.year && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Year:</span>
                  <span className="ml-2 font-semibold">{manga.year}</span>
                </div>
              )}
              <div>
                <span className="text-gray-500 dark:text-gray-400">Chapters:</span>
                <span className="ml-2 font-semibold">{manga.chapters.length}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-6">
              {manga.chapters.length > 0 && (
                <>
                  <Link
                    href={`/read/${manga.slug}/${manga.chapters[manga.chapters.length - 1].chapterNumber}`}
                    className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition"
                  >
                    Start Reading
                  </Link>
                  <Link
                    href={`/read/${manga.slug}/${manga.chapters[0].chapterNumber}`}
                    className="px-6 py-3 bg-gray-200 dark:bg-dark-700 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-dark-600 transition"
                  >
                    Latest Chapter
                  </Link>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">Synopsis</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {manga.description}
              </p>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Chapters</h2>
          {manga.chapters.length > 0 ? (
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow overflow-hidden">
              <div className="max-h-[600px] overflow-y-auto">
                {manga.chapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/read/${manga.slug}/${chapter.chapterNumber}`}
                    className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition"
                  >
                    <div>
                      <div className="font-semibold">
                        Chapter {chapter.chapterNumber}
                        {chapter.title && `: ${chapter.title}`}
                      </div>
                      {chapter.scanlationGroup && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {chapter.scanlationGroup}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <FiEye />
                        <span>{chapter.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiClock />
                        <span>{timeAgo(chapter.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-dark-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">No chapters available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
