'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiSettings,
  FiX,
  FiHome,
} from 'react-icons/fi'

type ReadingMode = 'single' | 'double' | 'long-strip'

interface Chapter {
  id: string
  chapterNumber: number
  title: string | null
  pages: string[]
}

interface MangaReaderProps {
  manga: {
    id: string
    title: string
    slug: string
  }
  chapter: Chapter
  previousChapter: Chapter | null
  nextChapter: Chapter | null
  allChapters: Chapter[]
}

export default function MangaReader({
  manga,
  chapter,
  previousChapter,
  nextChapter,
  allChapters,
}: MangaReaderProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)
  const [readingMode, setReadingMode] = useState<ReadingMode>('single')
  const [showControls, setShowControls] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showChapterList, setShowChapterList] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load saved reading mode from localStorage
    const savedMode = localStorage.getItem('readingMode') as ReadingMode
    if (savedMode) {
      setReadingMode(savedMode)
    }
  }, [])

  useEffect(() => {
    // Auto-hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => {
      if (!showSettings && !showChapterList) {
        setShowControls(false)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [showControls, showSettings, showChapterList])

  const handleMouseMove = () => {
    setShowControls(true)
  }

  const goToPage = (page: number) => {
    if (page >= 0 && page < chapter.pages.length) {
      setCurrentPage(page)
      setIsLoading(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const nextPage = useCallback(() => {
    if (currentPage < chapter.pages.length - 1) {
      goToPage(currentPage + 1)
    } else if (nextChapter) {
      router.push(`/read/${manga.slug}/${nextChapter.chapterNumber}`)
    }
  }, [currentPage, chapter.pages.length, nextChapter, manga.slug, router])

  const previousPage = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1)
    } else if (previousChapter) {
      router.push(`/read/${manga.slug}/${previousChapter.chapterNumber}`)
    }
  }, [currentPage, previousChapter, manga.slug, router])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') previousPage()
      if (e.key === 'ArrowRight') nextPage()
      if (e.key === 'Escape') setShowSettings(false)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nextPage, previousPage])

  const changeReadingMode = (mode: ReadingMode) => {
    setReadingMode(mode)
    localStorage.setItem('readingMode', mode)
    setShowSettings(false)
  }

  const goToChapter = (chapterNumber: number) => {
    router.push(`/read/${manga.slug}/${chapterNumber}`)
    setShowChapterList(false)
  }

  return (
    <div
      className="reader-container min-h-screen bg-black text-white"
      onMouseMove={handleMouseMove}
    >
      {/* Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm transition-transform duration-300 ${
          showControls ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href={`/manga/${manga.slug}`}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <FiHome className="text-xl" />
            </Link>
            <div>
              <h1 className="font-semibold">{manga.title}</h1>
              <p className="text-sm text-gray-400">
                Chapter {chapter.chapterNumber}
                {chapter.title && `: ${chapter.title}`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowChapterList(!showChapterList)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition flex items-center space-x-2"
            >
              <FiMenu />
              <span className="hidden sm:inline">Chapters</span>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              <FiSettings className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-dark-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Reader Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <FiX />
              </button>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Reading Mode</h3>
              <div className="space-y-2">
                <button
                  onClick={() => changeReadingMode('single')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    readingMode === 'single'
                      ? 'bg-primary-500'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="font-semibold">Single Page</div>
                  <div className="text-sm text-gray-400">One page at a time</div>
                </button>
                <button
                  onClick={() => changeReadingMode('double')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    readingMode === 'double'
                      ? 'bg-primary-500'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="font-semibold">Double Page</div>
                  <div className="text-sm text-gray-400">Two pages side by side</div>
                </button>
                <button
                  onClick={() => changeReadingMode('long-strip')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    readingMode === 'long-strip'
                      ? 'bg-primary-500'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="font-semibold">Long Strip</div>
                  <div className="text-sm text-gray-400">Vertical scrolling</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter List Panel */}
      {showChapterList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-dark-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">All Chapters</h2>
              <button
                onClick={() => setShowChapterList(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <FiX />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {allChapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => goToChapter(ch.chapterNumber)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
                    ch.id === chapter.id
                      ? 'bg-primary-500'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  Chapter {ch.chapterNumber}
                  {ch.title && `: ${ch.title}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reader Content */}
      <div className="pt-20 pb-20">
        {readingMode === 'long-strip' ? (
          // Long Strip Mode
          <div className="max-w-4xl mx-auto">
            {chapter.pages.map((page, index) => (
              <div key={index} className="mb-2">
                <Image
                  src={page}
                  alt={`Page ${index + 1}`}
                  width={1000}
                  height={1400}
                  className="manga-page-img w-full h-auto"
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        ) : readingMode === 'double' ? (
          // Double Page Mode
          <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
            <div className="flex gap-2">
              {chapter.pages[currentPage] && (
                <div className="relative">
                  <Image
                    src={chapter.pages[currentPage]}
                    alt={`Page ${currentPage + 1}`}
                    width={700}
                    height={1000}
                    className="manga-page-img max-h-[80vh] w-auto"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              )}
              {chapter.pages[currentPage + 1] && (
                <div className="relative">
                  <Image
                    src={chapter.pages[currentPage + 1]}
                    alt={`Page ${currentPage + 2}`}
                    width={700}
                    height={1000}
                    className="manga-page-img max-h-[80vh] w-auto"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          // Single Page Mode
          <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
            {chapter.pages[currentPage] && (
              <div className="relative">
                <Image
                  src={chapter.pages[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  width={1000}
                  height={1400}
                  className="manga-page-img max-h-[90vh] w-auto"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      {readingMode !== 'long-strip' && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm transition-transform duration-300 ${
            showControls ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Page Slider */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={chapter.pages.length - 1}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>
                  Page {currentPage + 1} / {chapter.pages.length}
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={previousPage}
                disabled={currentPage === 0 && !previousChapter}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
              >
                <FiChevronLeft />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {previousChapter && (
                  <Link
                    href={`/read/${manga.slug}/${previousChapter.chapterNumber}`}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
                  >
                    Prev Chapter
                  </Link>
                )}
                {nextChapter && (
                  <Link
                    href={`/read/${manga.slug}/${nextChapter.chapterNumber}`}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition"
                  >
                    Next Chapter
                  </Link>
                )}
              </div>

              <button
                onClick={nextPage}
                disabled={
                  currentPage === chapter.pages.length - 1 && !nextChapter
                }
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
              >
                <span>Next</span>
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && readingMode !== 'long-strip' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}
    </div>
  )
}
