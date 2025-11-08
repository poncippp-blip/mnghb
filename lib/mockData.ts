// Mock manga data
export interface Manga {
  id: string
  title: string
  slug: string
  alternativeTitles: string[]
  description: string
  coverImage: string
  bannerImage: string
  author: string[]
  artist: string[]
  status: 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED'
  type: 'MANGA' | 'MANHWA' | 'MANHUA' | 'NOVEL' | 'ONE_SHOT'
  year: number
  rating: number
  views: number
  featured: boolean
  genres: string[]
  chapters: Chapter[]
}

export interface Chapter {
  id: string
  mangaId: string
  title: string | null
  chapterNumber: number
  volume: number | null
  pages: string[]
  scanlationGroup: string | null
  views: number
  createdAt: Date
  updatedAt: Date
}

export const mockManga: Manga[] = [
  {
    id: '1',
    title: 'Shadow Chronicles',
    slug: 'shadow-chronicles',
    alternativeTitles: ['影の記録', 'Kage no Kiroku'],
    description: 'In a world where shadows come to life, a young warrior discovers an ancient power that could either save humanity or destroy it. Follow the epic journey of Ren as he navigates through treacherous lands, forms unlikely alliances, and uncovers the dark secrets of the Shadow Realm.',
    coverImage: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=1200&h=400&fit=crop',
    author: ['Takeshi Yamamoto'],
    artist: ['Kenji Watanabe'],
    status: 'ONGOING',
    type: 'MANGA',
    year: 2023,
    rating: 9.2,
    views: 1250000,
    featured: true,
    genres: ['Action', 'Fantasy', 'Adventure', 'Supernatural'],
    chapters: Array.from({ length: 45 }, (_, i) => ({
      id: `ch-1-${i + 1}`,
      mangaId: '1',
      title: i % 5 === 0 ? `The Battle Begins` : null,
      chapterNumber: i + 1,
      volume: Math.floor(i / 10) + 1,
      pages: Array.from({ length: 24 }, (_, j) =>
        `https://images.unsplash.com/photo-${1580000000000 + j}?w=800&h=1200&fit=crop`
      ),
      scanlationGroup: 'Elite Scans',
      views: Math.floor(Math.random() * 50000) + 10000,
      createdAt: new Date(Date.now() - (45 - i) * 86400000),
      updatedAt: new Date(Date.now() - (45 - i) * 86400000),
    })),
  },
  {
    id: '2',
    title: 'Eternal Love Story',
    slug: 'eternal-love-story',
    alternativeTitles: ['永遠の恋物語'],
    description: 'A heartwarming tale of two souls destined to meet across different lifetimes. Experience the beautiful journey of love, loss, and redemption as they search for each other through the ages.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&h=400&fit=crop',
    author: ['Sakura Miyamoto'],
    artist: ['Hana Yoshida'],
    status: 'ONGOING',
    type: 'MANGA',
    year: 2024,
    rating: 8.8,
    views: 890000,
    featured: true,
    genres: ['Romance', 'Drama', 'Fantasy', 'Slice of Life'],
    chapters: Array.from({ length: 32 }, (_, i) => ({
      id: `ch-2-${i + 1}`,
      mangaId: '2',
      title: null,
      chapterNumber: i + 1,
      volume: Math.floor(i / 10) + 1,
      pages: Array.from({ length: 20 }, (_, j) =>
        `https://images.unsplash.com/photo-${1590000000000 + j}?w=800&h=1200&fit=crop`
      ),
      scanlationGroup: 'Romance Scans',
      views: Math.floor(Math.random() * 40000) + 8000,
      createdAt: new Date(Date.now() - (32 - i) * 86400000),
      updatedAt: new Date(Date.now() - (32 - i) * 86400000),
    })),
  },
  {
    id: '3',
    title: 'Demon Slayer Academy',
    slug: 'demon-slayer-academy',
    alternativeTitles: ['悪魔退治学園'],
    description: 'At the prestigious Demon Slayer Academy, students train to become elite warriors against the forces of darkness. Join the adventures of a new generation of demon slayers as they face challenges, forge friendships, and prepare for the ultimate battle.',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=400&fit=crop',
    author: ['Haruki Tanaka'],
    artist: ['Yuki Sato'],
    status: 'ONGOING',
    type: 'MANGA',
    year: 2023,
    rating: 9.0,
    views: 2100000,
    featured: true,
    genres: ['Action', 'Supernatural', 'School Life', 'Comedy'],
    chapters: Array.from({ length: 56 }, (_, i) => ({
      id: `ch-3-${i + 1}`,
      mangaId: '3',
      title: i % 10 === 0 ? `Arc ${Math.floor(i / 10) + 1} Begins` : null,
      chapterNumber: i + 1,
      volume: Math.floor(i / 10) + 1,
      pages: Array.from({ length: 22 }, (_, j) =>
        `https://images.unsplash.com/photo-${1600000000000 + j}?w=800&h=1200&fit=crop`
      ),
      scanlationGroup: 'Elite Scans',
      views: Math.floor(Math.random() * 60000) + 15000,
      createdAt: new Date(Date.now() - (56 - i) * 86400000),
      updatedAt: new Date(Date.now() - (56 - i) * 86400000),
    })),
  },
  {
    id: '4',
    title: 'Tower of Gods',
    slug: 'tower-of-gods',
    alternativeTitles: ['神々の塔', 'Kamigami no Tou'],
    description: 'Climb the mysterious tower that reaches the heavens, where each floor presents deadly challenges and powerful adversaries. Only those who reach the top will have their wishes granted by the gods.',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=400&fit=crop',
    author: ['Min-Woo Park'],
    artist: ['Ji-Hoon Lee'],
    status: 'ONGOING',
    type: 'MANHWA',
    year: 2022,
    rating: 9.5,
    views: 3500000,
    featured: true,
    genres: ['Action', 'Adventure', 'Fantasy', 'Mystery'],
    chapters: Array.from({ length: 120 }, (_, i) => ({
      id: `ch-4-${i + 1}`,
      mangaId: '4',
      title: `Floor ${i + 1}`,
      chapterNumber: i + 1,
      volume: null,
      pages: Array.from({ length: 60 }, (_, j) =>
        `https://images.unsplash.com/photo-${1610000000000 + j}?w=800&h=2400&fit=crop`
      ),
      scanlationGroup: 'Webtoon Scans',
      views: Math.floor(Math.random() * 80000) + 20000,
      createdAt: new Date(Date.now() - (120 - i) * 86400000),
      updatedAt: new Date(Date.now() - (120 - i) * 86400000),
    })),
  },
  {
    id: '5',
    title: 'Martial Peak',
    slug: 'martial-peak',
    alternativeTitles: ['武炼巅峰', 'Wu Lian Dian Feng'],
    description: 'The journey to the martial peak is a lonely, solitary and long one. In the face of adversity, you must survive and remain unyielding. Only then can you break through and continue on your journey to become the strongest.',
    coverImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=400&fit=crop',
    author: ['Momo'],
    artist: ['Pikapi'],
    status: 'ONGOING',
    type: 'MANHUA',
    year: 2021,
    rating: 8.5,
    views: 5600000,
    featured: false,
    genres: ['Action', 'Martial Arts', 'Adventure', 'Xuanhuan'],
    chapters: Array.from({ length: 280 }, (_, i) => ({
      id: `ch-5-${i + 1}`,
      mangaId: '5',
      title: null,
      chapterNumber: i + 1,
      volume: null,
      pages: Array.from({ length: 18 }, (_, j) =>
        `https://images.unsplash.com/photo-${1620000000000 + j}?w=800&h=1200&fit=crop`
      ),
      scanlationGroup: 'Divine Scans',
      views: Math.floor(Math.random() * 70000) + 10000,
      createdAt: new Date(Date.now() - (280 - i) * 86400000),
      updatedAt: new Date(Date.now() - (280 - i) * 86400000),
    })),
  },
  {
    id: '6',
    title: 'Cyberpunk 2099',
    slug: 'cyberpunk-2099',
    alternativeTitles: ['サイバーパンク2099'],
    description: 'In the neon-lit streets of Neo Tokyo, a hacker discovers a conspiracy that threatens the entire city. Dive into a world of advanced technology, corporate espionage, and digital warfare.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=400&fit=crop',
    author: ['Akira Tanaka'],
    artist: ['Ryu Nakamura'],
    status: 'ONGOING',
    type: 'MANGA',
    year: 2024,
    rating: 8.9,
    views: 750000,
    featured: false,
    genres: ['Sci-Fi', 'Action', 'Thriller', 'Cyberpunk'],
    chapters: Array.from({ length: 28 }, (_, i) => ({
      id: `ch-6-${i + 1}`,
      mangaId: '6',
      title: null,
      chapterNumber: i + 1,
      volume: Math.floor(i / 10) + 1,
      pages: Array.from({ length: 26 }, (_, j) =>
        `https://images.unsplash.com/photo-${1630000000000 + j}?w=800&h=1200&fit=crop`
      ),
      scanlationGroup: 'Future Scans',
      views: Math.floor(Math.random() * 35000) + 8000,
      createdAt: new Date(Date.now() - (28 - i) * 86400000),
      updatedAt: new Date(Date.now() - (28 - i) * 86400000),
    })),
  },
]

export const mockGenres = [
  { id: '1', name: 'Action', slug: 'action' },
  { id: '2', name: 'Adventure', slug: 'adventure' },
  { id: '3', name: 'Comedy', slug: 'comedy' },
  { id: '4', name: 'Drama', slug: 'drama' },
  { id: '5', name: 'Fantasy', slug: 'fantasy' },
  { id: '6', name: 'Horror', slug: 'horror' },
  { id: '7', name: 'Mystery', slug: 'mystery' },
  { id: '8', name: 'Romance', slug: 'romance' },
  { id: '9', name: 'Sci-Fi', slug: 'sci-fi' },
  { id: '10', name: 'Slice of Life', slug: 'slice-of-life' },
  { id: '11', name: 'Supernatural', slug: 'supernatural' },
  { id: '12', name: 'Thriller', slug: 'thriller' },
  { id: '13', name: 'Martial Arts', slug: 'martial-arts' },
  { id: '14', name: 'School Life', slug: 'school-life' },
  { id: '15', name: 'Xuanhuan', slug: 'xuanhuan' },
  { id: '16', name: 'Cyberpunk', slug: 'cyberpunk' },
]
