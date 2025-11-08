'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push('/search?q=' + encodeURIComponent(searchQuery))
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50 transition-theme backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-800 transition-all duration-300">
              MangaScans
            </div>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search manga..."
                className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/browse" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 font-medium">
              Browse
            </Link>
            <Link href="/latest" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 font-medium">
              Latest
            </Link>
            <Link href="/popular" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 font-medium">
              Popular
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-all duration-300"
            >
              {isDark ? <MdLightMode className="text-xl text-yellow-400" /> : <MdDarkMode className="text-xl text-gray-700" />}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-300"
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-dark-700 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search manga..."
                  className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            <div className="space-y-2">
              <Link href="/browse" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                Browse
              </Link>
              <Link href="/latest" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                Latest
              </Link>
              <Link href="/popular" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                Popular
              </Link>
              <button onClick={toggleTheme} className="flex items-center space-x-2 py-2 text-gray-700 dark:text-gray-300">
                {isDark ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
                <span>Toggle Theme</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
