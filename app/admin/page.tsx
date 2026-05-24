'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  client_name: string
  agent_name: string
  enabled_tabs: string[]
  created_at: string
}

const allTabs = [
  { key: 'conversas', label: 'Conversas' },
  { key: 'leads', label: 'Leads' },
  { key: 'imoveis', label: 'Imoveis' },
  { key: 'matches', label: 'Matches' },
  { key: 'relatorios', label: 'Relatorios' },
  { key: 'configuracoes', label: 'Configuracoes' },
]

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')
  const [agentName, setAgentName] = useState('')
  const [selectedTabs, setSelectedTabs] = useState<string[]>([])

  async function fetchUsers() {
    const res = await fetch('/api/admin/users')
    if (res.ok) {
      const data = await res.json()
      setUsers(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  function toggleTab(tabKey: string) {
    setSelectedTabs(prev =>
      prev.includes(tabKey)
        ? prev.filter(t => t !== tabKey)
        : [...prev, tabKey]
    )
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCreating(true)

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        name,
        client_name: clientName,
        agent_name: agentName,
        enabled_tabs: selectedTabs,
      }),
    })

    if (res.ok) {
      setEmail('')
      setPassword('')
      setName('')
      setClientName('')
      setAgentName('')
      setSelectedTabs([])
      fetchUsers()
    } else {
      const data = await res.json()
      setError(data.error || 'Erro ao criar usuario')
    }

    setCreating(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja deletar este usuario?')) return

    const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchUsers()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin - Gerenciar Usuarios</h1>
          <p className="text-zinc-500 mt-1">Criar, visualizar e deletar usuarios do painel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Usuario</CardTitle>
              <CardDescription>Preencha os dados do novo usuario</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Senha do usuario"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientName">Nome do Cliente</Label>
                  <Input
                    id="clientName"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Ex: Imobiliaria XYZ"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agentName">Nome do Agente</Label>
                  <Input
                    id="agentName"
                    value={agentName}
                    onChange={e => setAgentName(e.target.value)}
                    placeholder="Ex: Maria"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Abas Habilitadas</Label>
                  <div className="flex flex-wrap gap-2">
                    {allTabs.map(tab => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => toggleTab(tab.key)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedTabs.includes(tab.key)
                            ? 'bg-emerald-500 text-white'
                            : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? 'Criando...' : 'Criar Usuario'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usuarios Cadastrados</CardTitle>
              <CardDescription>{users.length} usuarios no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-zinc-500">Carregando...</p>
              ) : users.length === 0 ? (
                <p className="text-zinc-500">Nenhum usuario cadastrado</p>
              ) : (
                <div className="space-y-4">
                  {users.map(user => (
                    <div
                      key={user.id}
                      className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-zinc-500">{user.email}</p>
                          <p className="text-sm text-zinc-500 mt-1">
                            Cliente: {user.client_name} | Agente: {user.agent_name}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {user.enabled_tabs.map(tab => (
                              <Badge key={tab} variant="outline" className="text-xs">
                                {tab}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
