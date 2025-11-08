import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ rating: null })
  }

  const { searchParams } = new URL(request.url)
  const mangaId = searchParams.get('mangaId')

  if (!mangaId) {
    return NextResponse.json({ error: 'Missing mangaId' }, { status: 400 })
  }

  try {
    const rating = await prisma.rating.findUnique({
      where: {
        userId_mangaId: {
          userId: session.user.id,
          mangaId,
        },
      },
    })

    return NextResponse.json({ rating: rating?.rating || null })
  } catch (error) {
    return NextResponse.json({ rating: null })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { mangaId, rating } = await request.json()

    if (rating < 1 || rating > 10) {
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })
    }

    // Upsert user rating
    await prisma.rating.upsert({
      where: {
        userId_mangaId: {
          userId: session.user.id,
          mangaId,
        },
      },
      update: { rating },
      create: {
        userId: session.user.id,
        mangaId,
        rating,
      },
    })

    // Update manga average rating
    const ratings = await prisma.rating.findMany({
      where: { mangaId },
    })

    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length

    await prisma.manga.update({
      where: { id: mangaId },
      data: { rating: averageRating },
    })

    return NextResponse.json({ success: true, rating: averageRating })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 })
  }
}
