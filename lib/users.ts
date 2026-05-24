import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export interface User {
  id: string
  email: string
  password_hash: string
  name: string
  client_name: string
  agent_name: string
  enabled_tabs: string[]
  created_at: string
}

export type UserPublic = Omit<User, 'password_hash'>

const USERS_FILE = path.join(process.cwd(), 'users.json')

function readUsers(): User[] {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return []
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeUsers(users: User[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

export function getAllUsers(): UserPublic[] {
  const users = readUsers()
  return users.map(({ password_hash, ...user }) => user)
}

export function getUserById(id: string): User | null {
  const users = readUsers()
  return users.find(u => u.id === id) || null
}

export function getUserByEmail(email: string): User | null {
  const users = readUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
}

export async function validatePassword(email: string, password: string): Promise<User | null> {
  const user = getUserByEmail(email)
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password_hash)
  return isValid ? user : null
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  client_name: string
  agent_name: string
  enabled_tabs: string[]
}): Promise<UserPublic> {
  const users = readUsers()

  if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('Email already exists')
  }

  const password_hash = await bcrypt.hash(data.password, 10)

  const newUser: User = {
    id: uuidv4(),
    email: data.email,
    password_hash,
    name: data.name,
    client_name: data.client_name,
    agent_name: data.agent_name,
    enabled_tabs: data.enabled_tabs,
    created_at: new Date().toISOString(),
  }

  users.push(newUser)
  writeUsers(users)

  const { password_hash: _, ...publicUser } = newUser
  return publicUser
}

export function deleteUser(id: string): boolean {
  const users = readUsers()
  const index = users.findIndex(u => u.id === id)

  if (index === -1) return false

  users.splice(index, 1)
  writeUsers(users)
  return true
}

export function updateUser(id: string, data: Partial<Omit<User, 'id' | 'password_hash' | 'created_at'>>): UserPublic | null {
  const users = readUsers()
  const index = users.findIndex(u => u.id === id)

  if (index === -1) return null

  users[index] = { ...users[index], ...data }
  writeUsers(users)

  const { password_hash, ...publicUser } = users[index]
  return publicUser
}
