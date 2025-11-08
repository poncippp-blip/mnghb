import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SCANLATOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()

    const manga = await prisma.manga.create({
      data: {
        title: data.title,
        alternativeTitles: data.alternativeTitles,
        slug: data.slug,
        description: data.description,
        coverImage: data.coverImage,
        bannerImage: data.bannerImage,
        author: data.author,
        artist: data.artist,
        status: data.status,
        type: data.type,
        year: data.year,
        featured: data.featured,
      },
    })

    return NextResponse.json(manga)
  } catch (error) {
    console.error('Error creating manga:', error)
    return NextResponse.json({ error: 'Failed to create manga' }, { status: 500 })
  }
}
