import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const mode = cookieStore.get('attendance_mode')?.value || 'intermediario'
  const startTime = cookieStore.get('start_time')?.value || '08:00'
  const endTime = cookieStore.get('end_time')?.value || '22:00'
  const dailyLimit = cookieStore.get('daily_limit')?.value || '100'

  return NextResponse.json({
    mode,
    startTime,
    endTime,
    dailyLimit: Number(dailyLimit),
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { mode, startTime, endTime, dailyLimit } = body

  const cookieStore = await cookies()
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  }

  if (mode) {
    cookieStore.set('attendance_mode', mode, cookieOptions)
  }
  if (startTime) {
    cookieStore.set('start_time', startTime, cookieOptions)
  }
  if (endTime) {
    cookieStore.set('end_time', endTime, cookieOptions)
  }
  if (dailyLimit) {
    cookieStore.set('daily_limit', String(dailyLimit), cookieOptions)
  }

  return NextResponse.json({ success: true })
}
