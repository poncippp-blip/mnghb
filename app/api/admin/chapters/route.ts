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

    const chapter = await prisma.chapter.create({
      data: {
        mangaId: data.mangaId,
        title: data.title,
        chapterNumber: data.chapterNumber,
        volume: data.volume,
        pages: data.pages,
        scanlationGroup: data.scanlationGroup,
      },
    })

    // Update manga's updatedAt
    await prisma.manga.update({
      where: { id: data.mangaId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(chapter)
  } catch (error) {
    console.error('Error creating chapter:', error)
    return NextResponse.json({ error: 'Failed to create chapter' }, { status: 500 })
  }
}
