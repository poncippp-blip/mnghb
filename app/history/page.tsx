import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { timeAgo } from '@/lib/utils'
import { FiClock, FiArrowRight } from 'react-icons/fi'

async function getHistory(userId: string) {
  const history = await prisma.readingHistory.findMany({
    where: { userId },
    include: {
      chapter: {
        include: {
          manga: {
            include: {
              genres: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  })

  return history
}

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const history = await getHistory(session.user.id)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <FiClock className="text-3xl text-primary-500" />
          <h1 className="text-3xl font-bold">Reading History</h1>
        </div>

        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="flex">
                  {/* Cover Image */}
                  <Link
                    href={`/manga/${item.chapter.manga.slug}`}
                    className="flex-shrink-0"
                  >
                    <div className="relative w-24 h-32 sm:w-32 sm:h-44">
                      <Image
                        src={item.chapter.manga.coverImage}
                        alt={item.chapter.manga.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/manga/${item.chapter.manga.slug}`}
                        className="font-semibold text-lg hover:text-primary-500 transition mb-2 block"
                      >
                        {item.chapter.manga.title}
                      </Link>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.chapter.manga.genres.slice(0, 3).map((genre) => (
                          <span
                            key={genre.id}
                            className="px-2 py-1 bg-primary-500 text-white text-xs rounded-full"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last read: Chapter {item.chapter.chapterNumber}
                        {item.chapter.title && ` - ${item.chapter.title}`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {timeAgo(item.updatedAt)}
                      </p>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Link
                        href={`/read/${item.chapter.manga.slug}/${item.chapter.chapterNumber}`}
                        className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold hover:bg-primary-600 transition flex items-center space-x-1"
                      >
                        <span>Continue Reading</span>
                        <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FiClock className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No reading history</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start reading manga to build your history
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
