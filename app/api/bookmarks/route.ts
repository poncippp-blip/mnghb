import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: session.user.id },
      include: {
        manga: {
          include: {
            genres: true,
            chapters: {
              orderBy: { chapterNumber: 'desc' },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookmarks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { mangaId } = await request.json()

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: session.user.id,
        mangaId,
      },
    })

    return NextResponse.json(bookmark)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create bookmark' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { mangaId } = await request.json()

    await prisma.bookmark.delete({
      where: {
        userId_mangaId: {
          userId: session.user.id,
          mangaId,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 })
  }
}
