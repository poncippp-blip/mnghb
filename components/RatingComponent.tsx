'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FiStar } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface RatingComponentProps {
  mangaId: string
  currentRating: number
}

export default function RatingComponent({ mangaId, currentRating }: RatingComponentProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      fetchUserRating()
    }
  }, [session])

  const fetchUserRating = async () => {
    try {
      const response = await fetch(`/api/ratings?mangaId=${mangaId}`)
      const data = await response.json()
      if (data.rating) {
        setUserRating(data.rating)
      }
    } catch (error) {
      console.error('Error fetching rating:', error)
    }
  }

  const handleRating = async (rating: number) => {
    if (!session?.user) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mangaId, rating }),
      })

      if (response.ok) {
        setUserRating(rating)
        toast.success('Rating submitted!')
        router.refresh()
      }
    } catch (error) {
      toast.error('Failed to submit rating')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-gray-200 dark:border-dark-700 pt-6">
      <h3 className="text-lg font-semibold mb-3">Rate this manga</h3>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              disabled={loading}
              className="transition-transform hover:scale-110"
            >
              <FiStar
                className={`text-2xl ${
                  star <= (hoverRating || userRating)
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userRating ? `You rated: ${userRating}/10` : 'Click to rate'}
        </span>
      </div>
    </div>
  )
}
