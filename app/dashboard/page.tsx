import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FiBookmark, FiClock, FiTrendingUp } from 'react-icons/fi'

async function getDashboardStats(userId: string) {
  const [bookmarksCount, historyCount, commentsCount] = await Promise.all([
    prisma.bookmark.count({ where: { userId } }),
    prisma.readingHistory.count({ where: { userId } }),
    prisma.comment.count({ where: { userId } }),
  ])

  const recentHistory = await prisma.readingHistory.findMany({
    where: { userId },
    include: {
      chapter: {
        include: {
          manga: true,
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  })

  return {
    bookmarksCount,
    historyCount,
    commentsCount,
    recentHistory,
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const stats = await getDashboardStats(session.user.id)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome back, {session.user.name || 'Reader'}!
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/library"
            className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Library
                </p>
                <p className="text-3xl font-bold">{stats.bookmarksCount}</p>
              </div>
              <FiBookmark className="text-4xl text-primary-500" />
            </div>
          </Link>

          <Link
            href="/history"
            className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Chapters Read
                </p>
                <p className="text-3xl font-bold">{stats.historyCount}</p>
              </div>
              <FiClock className="text-4xl text-primary-500" />
            </div>
          </Link>

          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Comments
                </p>
                <p className="text-3xl font-bold">{stats.commentsCount}</p>
              </div>
              <FiTrendingUp className="text-4xl text-primary-500" />
            </div>
          </div>
        </div>

        {/* Recent Reading */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Continue Reading</h2>
            <Link
              href="/history"
              className="text-primary-500 hover:text-primary-600 transition"
            >
              View All
            </Link>
          </div>

          {stats.recentHistory.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {stats.recentHistory.map((item) => (
                <Link
                  key={item.id}
                  href={`/read/${item.chapter.manga.slug}/${item.chapter.chapterNumber}`}
                  className="bg-white dark:bg-dark-800 rounded-lg p-4 shadow-md hover:shadow-lg transition flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {item.chapter.manga.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Chapter {item.chapter.chapterNumber}
                      {item.chapter.title && ` - ${item.chapter.title}`}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition">
                    Continue
                  </button>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-dark-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                No recent reading history
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
