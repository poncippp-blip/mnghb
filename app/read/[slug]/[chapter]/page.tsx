import { notFound } from 'next/navigation'
import MangaReader from '@/components/MangaReader'
import { mockManga } from '@/lib/mockData'

interface ReaderPageProps {
  params: {
    slug: string
    chapter: string
  }
}

export default function ReaderPage({ params }: ReaderPageProps) {
  const manga = mockManga.find((m) => m.slug === params.slug)

  if (!manga) {
    notFound()
  }

  const chapter = manga.chapters.find(
    (ch) => ch.chapterNumber === parseFloat(params.chapter)
  )

  if (!chapter) {
    notFound()
  }

  const currentIndex = manga.chapters.findIndex((ch) => ch.id === chapter.id)
  const previousChapter = manga.chapters[currentIndex - 1] || null
  const nextChapter = manga.chapters[currentIndex + 1] || null

  return (
    <MangaReader
      manga={{
        id: manga.id,
        title: manga.title,
        slug: manga.slug,
      }}
      chapter={chapter}
      previousChapter={previousChapter}
      nextChapter={nextChapter}
      allChapters={manga.chapters}
    />
  )
}
