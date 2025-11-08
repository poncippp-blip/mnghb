import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mangaId = searchParams.get('mangaId')

  if (!mangaId) {
    return NextResponse.json({ error: 'Missing mangaId' }, { status: 400 })
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { mangaId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { mangaId, content } = await request.json()

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 })
    }

    const comment = await prisma.comment.create({
      data: {
        userId: session.user.id,
        mangaId,
        content,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}
