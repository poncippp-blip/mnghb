import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import MangaReader from '@/components/MangaReader'

interface ReaderPageProps {
  params: {
    slug: string
    chapter: string
  }
}

async function getChapterData(slug: string, chapterNumber: string) {
  const manga = await prisma.manga.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { chapterNumber: 'asc' },
      },
    },
  })

  if (!manga) {
    return null
  }

  const chapter = manga.chapters.find(
    (ch) => ch.chapterNumber === parseFloat(chapterNumber)
  )

  if (!chapter) {
    return null
  }

  // Increment view counts
  await Promise.all([
    prisma.chapter.update({
      where: { id: chapter.id },
      data: { views: { increment: 1 } },
    }),
    prisma.manga.update({
      where: { id: manga.id },
      data: { views: { increment: 1 } },
    }),
  ])

  const currentIndex = manga.chapters.findIndex((ch) => ch.id === chapter.id)
  const previousChapter = manga.chapters[currentIndex - 1] || null
  const nextChapter = manga.chapters[currentIndex + 1] || null

  return {
    manga: {
      id: manga.id,
      title: manga.title,
      slug: manga.slug,
    },
    chapter,
    previousChapter,
    nextChapter,
    allChapters: manga.chapters,
  }
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const data = await getChapterData(params.slug, params.chapter)

  if (!data) {
    notFound()
  }

  const session = await getServerSession(authOptions)

  // Save reading history for logged-in users
  if (session?.user) {
    await prisma.readingHistory.upsert({
      where: {
        userId_chapterId: {
          userId: session.user.id,
          chapterId: data.chapter.id,
        },
      },
      update: {
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        chapterId: data.chapter.id,
      },
    })
  }

  return (
    <MangaReader
      manga={data.manga}
      chapter={data.chapter}
      previousChapter={data.previousChapter}
      nextChapter={data.nextChapter}
      allChapters={data.allChapters}
    />
  )
}
