import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FiPlus, FiBook, FiUsers, FiMessageSquare } from 'react-icons/fi'

async function getAdminStats() {
  const [mangaCount, chapterCount, userCount, commentCount] = await Promise.all([
    prisma.manga.count(),
    prisma.chapter.count(),
    prisma.user.count(),
    prisma.comment.count(),
  ])

  const recentManga = await prisma.manga.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: {
      _count: {
        select: { chapters: true },
      },
    },
  })

  return {
    mangaCount,
    chapterCount,
    userCount,
    commentCount,
    recentManga,
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SCANLATOR')) {
    redirect('/')
  }

  const stats = await getAdminStats()

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Link
            href="/admin/manga/new"
            className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition flex items-center space-x-2"
          >
            <FiPlus />
            <span>Add Manga</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Total Manga
                </p>
                <p className="text-3xl font-bold">{stats.mangaCount}</p>
              </div>
              <FiBook className="text-4xl text-primary-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Total Chapters
                </p>
                <p className="text-3xl font-bold">{stats.chapterCount}</p>
              </div>
              <FiBook className="text-4xl text-primary-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Total Users
                </p>
                <p className="text-3xl font-bold">{stats.userCount}</p>
              </div>
              <FiUsers className="text-4xl text-primary-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Total Comments
                </p>
                <p className="text-3xl font-bold">{stats.commentCount}</p>
              </div>
              <FiMessageSquare className="text-4xl text-primary-500" />
            </div>
          </div>
        </div>

        {/* Recent Manga */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Manga</h2>
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Chapters</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Views</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                {stats.recentManga.map((manga) => (
                  <tr key={manga.id} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                    <td className="px-6 py-4">
                      <Link
                        href={`/manga/${manga.slug}`}
                        className="font-medium hover:text-primary-500 transition"
                      >
                        {manga.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        {manga.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{manga._count.chapters}</td>
                    <td className="px-6 py-4">{manga.views.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/manga/${manga.id}/edit`}
                        className="text-primary-500 hover:text-primary-600 mr-4"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/manga/${manga.id}/chapters`}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        Chapters
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
