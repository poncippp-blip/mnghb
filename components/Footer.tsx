import Link from 'next/link'
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 mt-auto transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              MangaScans
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your premier destination for high-quality manga scanlations. Read the latest chapters of your favorite series.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition">
                  Browse Manga
                </Link>
              </li>
              <li>
                <Link href="/latest" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition">
                  Latest Updates
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition">
                  Popular Manga
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition">
                  DMCA
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-200 dark:bg-dark-800 rounded-full hover:bg-primary-500 hover:text-white transition"
              >
                <FiGithub className="text-xl" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-200 dark:bg-dark-800 rounded-full hover:bg-primary-500 hover:text-white transition"
              >
                <FiTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-200 dark:bg-dark-800 rounded-full hover:bg-primary-500 hover:text-white transition"
              >
                <FiMail className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} MangaScans. All rights reserved.</p>
          <p className="mt-2">
            All manga content is the property of their respective owners. This site does not store any files on its server.
          </p>
        </div>
      </div>
    </footer>
  )
}
