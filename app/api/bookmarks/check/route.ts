import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ isBookmarked: false })
  }

  const { searchParams } = new URL(request.url)
  const mangaId = searchParams.get('mangaId')

  if (!mangaId) {
    return NextResponse.json({ error: 'Missing mangaId' }, { status: 400 })
  }

  try {
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_mangaId: {
          userId: session.user.id,
          mangaId,
        },
      },
    })

    return NextResponse.json({ isBookmarked: !!bookmark })
  } catch (error) {
    return NextResponse.json({ isBookmarked: false })
  }
}
