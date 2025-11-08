'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { slugify } from '@/lib/utils'

export default function NewMangaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    alternativeTitles: '',
    description: '',
    coverImage: '',
    bannerImage: '',
    author: '',
    artist: '',
    status: 'ONGOING',
    type: 'MANGA',
    year: new Date().getFullYear(),
    featured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/manga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: slugify(formData.title),
          alternativeTitles: formData.alternativeTitles.split(',').map(t => t.trim()).filter(Boolean),
          author: formData.author.split(',').map(a => a.trim()).filter(Boolean),
          artist: formData.artist.split(',').map(a => a.trim()).filter(Boolean),
        }),
      })

      if (response.ok) {
        toast.success('Manga created successfully!')
        router.push('/admin')
      } else {
        toast.error('Failed to create manga')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Add New Manga</h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Alternative Titles (comma-separated)</label>
            <input
              type="text"
              value={formData.alternativeTitles}
              onChange={(e) => setFormData({ ...formData, alternativeTitles: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Alternative Title 1, Alternative Title 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Cover Image URL *</label>
              <input
                type="url"
                required
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Banner Image URL</label>
              <input
                type="url"
                value={formData.bannerImage}
                onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/banner.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Author(s) (comma-separated) *</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Author 1, Author 2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Artist(s) (comma-separated) *</label>
              <input
                type="text"
                required
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Artist 1, Artist 2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="HIATUS">Hiatus</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="MANGA">Manga</option>
                <option value="MANHWA">Manhwa</option>
                <option value="MANHUA">Manhua</option>
                <option value="NOVEL">Novel</option>
                <option value="ONE_SHOT">One Shot</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-medium">Featured on homepage</span>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 transition"
            >
              {loading ? 'Creating...' : 'Create Manga'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 dark:bg-dark-700 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-dark-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
