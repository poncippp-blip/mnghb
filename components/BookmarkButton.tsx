'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FiBookmark } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface BookmarkButtonProps {
  mangaId: string
}

export default function BookmarkButton({ mangaId }: BookmarkButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      checkBookmark()
    }
  }, [session])

  const checkBookmark = async () => {
    try {
      const response = await fetch(`/api/bookmarks/check?mangaId=${mangaId}`)
      const data = await response.json()
      setIsBookmarked(data.isBookmarked)
    } catch (error) {
      console.error('Error checking bookmark:', error)
    }
  }

  const toggleBookmark = async () => {
    if (!session?.user) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/bookmarks', {
        method: isBookmarked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mangaId }),
      })

      if (response.ok) {
        setIsBookmarked(!isBookmarked)
        toast.success(isBookmarked ? 'Removed from library' : 'Added to library')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition ${
        isBookmarked
          ? 'bg-primary-500 text-white hover:bg-primary-600'
          : 'bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600'
      }`}
    >
      <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
      <span>{isBookmarked ? 'In Library' : 'Add to Library'}</span>
    </button>
  )
}
