# MangaScans - Advanced Manga Scanlation Website

A fully-featured, modern manga scanlation website built with Next.js 14, TypeScript, Prisma, and Tailwind CSS. Inspired by professional platforms like PhiliaScans, SilentQuill, and MangaDex.

## Features

### Core Features
- **Modern UI/UX**: Beautiful, responsive design with dark mode support
- **Advanced Manga Reader**: Multiple reading modes (single page, double page, long strip)
- **User Authentication**: Email/password and OAuth (Google, GitHub) support
- **Search & Filtering**: Powerful search with advanced filters (genre, status, type, etc.)
- **User Library**: Bookmark favorite manga and track reading history
- **Comments & Ratings**: Engage with the community through comments and ratings
- **Admin Panel**: Complete manga and chapter management system

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

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Zustand (for client state)
- **Image Optimization**: Next.js Image component with Sharp
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Git

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mnghb
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/manga_db?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"

# Upload Settings
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./public/uploads"
```

#### Getting OAuth Credentials

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

**GitHub OAuth:**
1. Go to GitHub Settings → Developer Settings → OAuth Apps
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 4. Set up the database

Generate Prisma client:

```bash
npx prisma generate
```

Push the schema to your database:

```bash
npx prisma db push
```

(Optional) Open Prisma Studio to view/edit data:

```bash
npx prisma studio
```

### 5. Create uploads directory

```bash
mkdir -p public/uploads
```

### 6. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
