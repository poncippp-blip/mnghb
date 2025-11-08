import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import MangaCard from '@/components/MangaCard'
import { FiArrowRight, FiTrendingUp, FiClock } from 'react-icons/fi'

async function getFeaturedManga() {
  try {
    const featured = await prisma.manga.findMany({
      where: { featured: true },
      take: 5,
      include: {
        genres: true,
        chapters: {
          orderBy: { chapterNumber: 'desc' },
          take: 1,
        },
      },
    })
    return featured
  } catch (error) {
    return []
  }
}

async function getLatestUpdates() {
  try {
    const latest = await prisma.manga.findMany({
      take: 12,
      orderBy: { updatedAt: 'desc' },
      include: {
        genres: true,
        chapters: {
          orderBy: { chapterNumber: 'desc' },
          take: 1,
        },
      },
    })
    return latest
  } catch (error) {
    return []
  }
}

async function getPopularManga() {
  try {
    const popular = await prisma.manga.findMany({
      take: 12,
      orderBy: { views: 'desc' },
      include: {
        genres: true,
        chapters: {
          orderBy: { chapterNumber: 'desc' },
          take: 1,
        },
      },
    })
    return popular
  } catch (error) {
    return []
  }
}

export default async function Home() {
  const [featured, latest, popular] = await Promise.all([
    getFeaturedManga(),
    getLatestUpdates(),
    getPopularManga(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Manga */}
      {featured.length > 0 && (
        <section className="relative h-[500px] md:h-[600px] mb-12">
          <div className="absolute inset-0">
            <Image
              src={featured[0].bannerImage || featured[0].coverImage}
              alt={featured[0].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1 bg-primary-500 text-white text-sm rounded-full mb-4">
                Featured
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {featured[0].title}
              </h1>
              <p className="text-lg text-gray-200 mb-6 line-clamp-3">
                {featured[0].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featured[0].genres.slice(0, 5).map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <Link
                  href={`/manga/${featured[0].slug}`}
                  className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition flex items-center space-x-2"
                >
                  <span>Read Now</span>
                  <FiArrowRight />
                </Link>
                {featured[0].chapters[0] && (
                  <Link
                    href={`/read/${featured[0].slug}/${featured[0].chapters[0].chapterNumber}`}
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition"
                  >
                    Chapter {featured[0].chapters[0].chapterNumber}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Latest Updates */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FiClock className="text-2xl text-primary-500" />
              <h2 className="text-2xl md:text-3xl font-bold">Latest Updates</h2>
            </div>
            <Link
              href="/latest"
              className="text-primary-500 hover:text-primary-600 flex items-center space-x-2 transition"
            >
              <span>View All</span>
              <FiArrowRight />
            </Link>
          </div>

          {latest.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {latest.map((manga) => (
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
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No manga available yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Popular Manga */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FiTrendingUp className="text-2xl text-primary-500" />
              <h2 className="text-2xl md:text-3xl font-bold">Popular Manga</h2>
            </div>
            <Link
              href="/popular"
              className="text-primary-500 hover:text-primary-600 flex items-center space-x-2 transition"
            >
              <span>View All</span>
              <FiArrowRight />
            </Link>
          </div>

          {popular.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popular.map((manga) => (
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
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No popular manga to display yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
