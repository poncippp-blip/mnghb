import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import MangaCard from '@/components/MangaCard'
import { FiBookmark } from 'react-icons/fi'

async function getLibrary(userId: string) {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    include: {
      manga: {
        include: {
          genres: true,
          chapters: {
            orderBy: { chapterNumber: 'desc' },
            take: 1,
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return bookmarks
}

export default async function LibraryPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const bookmarks = await getLibrary(session.user.id)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <FiBookmark className="text-3xl text-primary-500" />
          <h1 className="text-3xl font-bold">My Library</h1>
        </div>

        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {bookmarks.map((bookmark) => (
              <MangaCard
                key={bookmark.id}
                id={bookmark.manga.id}
                title={bookmark.manga.title}
                slug={bookmark.manga.slug}
                coverImage={bookmark.manga.coverImage}
                rating={bookmark.manga.rating}
                views={bookmark.manga.views}
                latestChapter={bookmark.manga.chapters[0]?.chapterNumber}
                genres={bookmark.manga.genres.map((g) => g.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FiBookmark className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your library is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding manga to your library to keep track of your favorites
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
