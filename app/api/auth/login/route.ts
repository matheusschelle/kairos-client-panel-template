import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { validatePassword } from '@/lib/users'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 })
  }

  const user = await validatePassword(email, password)

  if (user) {
    const cookieStore = await cookies()
    const sessionData = JSON.stringify({
      userId: user.id,
      email: user.email,
    })

    cookieStore.set('session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 })
}
