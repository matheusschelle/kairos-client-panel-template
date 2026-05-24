import { NextResponse } from 'next/server'
import { getAllUsers, createUser, deleteUser } from '@/lib/users'

export async function GET() {
  const users = getAllUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, client_name, agent_name, enabled_tabs } = body

    if (!email || !password || !name || !client_name || !agent_name) {
      return NextResponse.json(
        { error: 'Campos obrigatorios: email, password, name, client_name, agent_name' },
        { status: 400 }
      )
    }

    const user = await createUser({
      email,
      password,
      name,
      client_name,
      agent_name,
      enabled_tabs: enabled_tabs || [],
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Email already exists') {
      return NextResponse.json({ error: 'Email ja cadastrado' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Erro ao criar usuario' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID obrigatorio' }, { status: 400 })
  }

  const deleted = deleteUser(id)

  if (!deleted) {
    return NextResponse.json({ error: 'Usuario nao encontrado' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
