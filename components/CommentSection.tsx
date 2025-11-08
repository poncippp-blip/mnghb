'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { timeAgo } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Comment {
  id: string
  content: string
  createdAt: Date
  user: {
    name: string | null
    image: string | null
  }
}

interface CommentSectionProps {
  mangaId: string
}

export default function CommentSection({ mangaId }: CommentSectionProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?mangaId=${mangaId}`)
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user) {
      router.push('/login')
      return
    }

    if (!newComment.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mangaId, content: newComment }),
      })

      if (response.ok) {
        setNewComment('')
        fetchComments()
        toast.success('Comment posted!')
      }
    } catch (error) {
      toast.error('Failed to post comment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      {/* Comment Form */}
      {session?.user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={4}
            className="w-full px-4 py-3 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="mt-2 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-100 dark:bg-dark-800 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Please{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-primary-500 hover:underline"
            >
              login
            </button>{' '}
            to post a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {comment.user.name?.[0] || 'U'}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold">{comment.user.name || 'Anonymous'}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {timeAgo(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  )
}
