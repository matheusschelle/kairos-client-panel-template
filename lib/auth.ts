import { cookies } from 'next/headers'
import { getUserById, type User } from './users'

export interface SessionData {
  userId: string
  email: string
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  if (!session) return null

  try {
    const data = JSON.parse(session.value)
    if (!data.userId || !data.email) return null
    return data
  } catch {
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  if (!session) return null

  return getUserById(session.userId)
}
