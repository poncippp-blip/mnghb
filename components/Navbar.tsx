'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { FiSearch, FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiBookmark, FiClock } from 'react-icons/fi'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50 transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              MangaScans
            </div>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search manga..."
                className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-theme"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/browse" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
              Browse
            </Link>
            <Link href="/latest" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
              Latest
            </Link>
            <Link href="/popular" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
              Popular
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition"
            >
              {isDark ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
            </button>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 py-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiUser />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/library"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiBookmark />
                      <span>Library</span>
                    </Link>
                    <Link
                      href="/history"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiClock />
                      <span>History</span>
                    </Link>
                    {(session.user?.role === 'ADMIN' || session.user?.role === 'SCANLATOR') && (
                      <Link
                        href="/admin"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiSettings />
                        <span>Admin</span>
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition w-full text-left text-red-500"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700"
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-dark-700">
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
              <Link
                href="/browse"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                href="/latest"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Latest
              </Link>
              <Link
                href="/popular"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Popular
              </Link>

              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/library"
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Library
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left py-2 text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block py-2 text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
