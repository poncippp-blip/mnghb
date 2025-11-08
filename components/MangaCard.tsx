import Link from 'next/link'
import Image from 'next/image'
import { FiEye, FiStar } from 'react-icons/fi'
import { formatNumber } from '@/lib/utils'

interface MangaCardProps {
  id: string
  title: string
  slug: string
  coverImage: string
  rating?: number
  views?: number
  latestChapter?: number
  genres?: string[]
}

export default function MangaCard({
  id,
  title,
  slug,
  coverImage,
  rating = 0,
  views = 0,
  latestChapter,
  genres = [],
}: MangaCardProps) {
  return (
    <Link href={`/manga/${slug}`}>
      <div className="group relative bg-white dark:bg-dark-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Cover Image */}
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-dark-700">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {genres.slice(0, 2).map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-primary-500 text-white text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Chapter Badge */}
          {latestChapter && (
            <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Ch. {latestChapter}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary-500 transition-colors">
            {title}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <FiStar className="text-yellow-500" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiEye />
              <span>{formatNumber(views)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
