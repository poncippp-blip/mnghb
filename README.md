# MangaScans - Frontend-Only Manga Scanlation Website

A beautiful, modern manga scanlation website frontend built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by professional platforms like PhiliaScans, SilentQuill, and MangaDex.

> **Note**: This is a frontend-only version with mock data. Backend integration is not included but can be added later.

## 🎨 Features

### Beautiful UI/UX
- **Modern Design**: Clean, responsive design with smooth animations
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion powered transitions

### Core Features (Frontend)
- Advanced Manga Reader with multiple reading modes
- Search and filtering system
- Genre browsing
- Latest and popular manga sections
- Featured manga carousel
- Responsive navigation with mobile menu

### User Features
- Personal dashboard with reading statistics
- Reading history tracking
- Bookmarking/Library system
- Chapter progress tracking
- Customizable reading preferences
- User profiles and authentication

### Reader Features
- **Single Page Mode**: Traditional page-by-page reading
- **Double Page Mode**: Two pages side-by-side (like a book)
- **Long Strip Mode**: Continuous vertical scrolling (webtoon style)
- Keyboard navigation (arrow keys)
- Auto-hiding controls
- Chapter navigation
- Reading progress tracking

### Admin Features
- Add/Edit manga with metadata
- Upload chapters with multiple pages
- Manage genres and tags
- User role management (User, Scanlator, Admin)
- View statistics and analytics

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Carousel**: Swiper
- **State Management**: Zustand
- **Notifications**: React Hot Toast

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Quick Start

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd mnghb
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Visit [http://localhost:3000](http://localhost:3000)

That's it! No database setup, no environment variables required. Just install and run!

## Database Schema

The application uses the following main models:

- **User**: User accounts with role-based access
- **Manga**: Manga series with metadata
- **Chapter**: Individual chapters with pages
- **Genre**: Manga genres/categories
- **Bookmark**: User's bookmarked manga
- **ReadingHistory**: Track user's reading progress
- **Comment**: User comments on manga
- **Rating**: User ratings for manga

## Usage

### First-Time Setup

1. **Create an admin account**:
   - Register a new account at `/register`
   - Manually update the user's role to `ADMIN` in the database using Prisma Studio

2. **Access the admin panel**:
   - Navigate to `/admin`
   - Click "Add Manga" to create your first manga entry

3. **Add manga**:
   - Fill in manga details (title, description, cover image, etc.)
   - Upload a cover image URL (or use your own image hosting)
   - Set status, type, and other metadata

4. **Add chapters**:
   - After creating manga, add chapters with page URLs
   - Pages should be hosted externally or in `/public/uploads`

### User Roles

- **USER**: Can read, bookmark, comment, and rate manga
- **SCANLATOR**: Can upload manga and chapters
- **ADMIN**: Full access to all features and user management

## Project Structure

```
mnghb/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── admin/           # Admin API endpoints
│   │   ├── bookmarks/       # Bookmark management
│   │   ├── comments/        # Comment system
│   │   └── ratings/         # Rating system
│   ├── admin/               # Admin panel pages
│   ├── manga/               # Manga detail pages
│   ├── read/                # Manga reader
│   ├── browse/              # Browse with filters
│   ├── search/              # Search functionality
│   ├── library/             # User library
│   ├── history/             # Reading history
│   ├── dashboard/           # User dashboard
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── providers/           # Context providers
│   ├── Navbar.tsx           # Navigation bar
│   ├── Footer.tsx           # Footer component
│   ├── MangaCard.tsx        # Manga card component
│   ├── MangaReader.tsx      # Advanced reader component
│   ├── BookmarkButton.tsx   # Bookmark functionality
│   ├── RatingComponent.tsx  # Rating system
│   ├── CommentSection.tsx   # Comment system
│   └── FilterSidebar.tsx    # Filter component
├── lib/                     # Utility functions
│   ├── prisma.ts            # Prisma client
│   └── utils.ts             # Helper functions
├── prisma/                  # Prisma schema
│   └── schema.prisma        # Database schema
├── public/                  # Static files
│   └── uploads/             # Uploaded images
├── types/                   # TypeScript types
│   └── next-auth.d.ts       # NextAuth types
├── .env.example             # Example environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

### Database Hosting

For production, use a managed PostgreSQL database:
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)

### Image Hosting

For production, consider using:
- [Cloudinary](https://cloudinary.com/)
- [Uploadthing](https://uploadthing.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Vercel Blob](https://vercel.com/storage/blob)

## Configuration

### Changing Site Name/Branding

Update the following files:
- `app/layout.tsx` - Metadata
- `components/Navbar.tsx` - Logo and name
- `components/Footer.tsx` - Footer text

### Adding Genres

Use Prisma Studio or create genres via the database:

```typescript
await prisma.genre.createMany({
  data: [
    { name: 'Action', slug: 'action' },
    { name: 'Romance', slug: 'romance' },
    { name: 'Comedy', slug: 'comedy' },
    // Add more genres
  ]
})
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Disclaimer

This is a manga scanlation platform template. Please ensure you have the proper rights and permissions for any content you host. Respect copyright laws and support official releases.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Acknowledgments

- Inspired by PhiliaScans, SilentQuill, and MangaDex
- Built with Next.js and Prisma
- UI components styled with Tailwind CSS
