'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const modes = [
  {
    id: 'agressivo',
    icon: '🔴',
    label: 'Agressivo',
    description: 'Fecha rapido, alta urgencia, follow-up agressivo',
    color: 'border-red-500 bg-red-50 dark:bg-red-950/30',
  },
  {
    id: 'intermediario',
    icon: '⚖️',
    label: 'Intermediario',
    description: 'Balanceado, padrao do mercado',
    color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30',
  },
  {
    id: 'empatico',
    icon: '❤️',
    label: 'Empatico',
    description: 'Escuta primeiro, propoe depois. Alto padrao',
    color: 'border-pink-500 bg-pink-50 dark:bg-pink-950/30',
  },
  {
    id: 'cordial',
    icon: '🤝',
    label: 'Cordial',
    description: 'Formal, institucional, classe A',
    color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/30',
  },
]

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState('intermediario')
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('22:00')
  const [dailyLimit, setDailyLimit] = useState(100)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/config/mode')
      .then((res) => res.json())
      .then((data) => {
        if (data.mode) setSelectedMode(data.mode)
        if (data.startTime) setStartTime(data.startTime)
        if (data.endTime) setEndTime(data.endTime)
        if (data.dailyLimit) setDailyLimit(data.dailyLimit)
      })
      .catch(() => {})
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/config/mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: selectedMode,
          startTime,
          endTime,
          dailyLimit,
        }),
      })

      if (res.ok) {
        toast.success('Configuracoes salvas com sucesso!')
        router.refresh()
      } else {
        toast.error('Erro ao salvar configuracoes')
      }
    } catch {
      toast.error('Erro ao salvar configuracoes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuracoes</h1>
        <p className="text-zinc-500 mt-1">Ajuste o comportamento do agente</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modo de Atendimento</CardTitle>
          <CardDescription>Selecione o estilo de comunicacao do agente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={cn(
                  'p-4 rounded-lg border-2 text-left transition-all',
                  selectedMode === mode.id
                    ? mode.color
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{mode.icon}</span>
                  <div>
                    <p className="font-semibold">{mode.label}</p>
                    <p className="text-sm text-zinc-500 mt-1">{mode.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horario de Operacao</CardTitle>
          <CardDescription>Defina o periodo em que o agente esta ativo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Inicio</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-32"
              />
            </div>
            <span className="text-zinc-400 mt-6">ate</span>
            <div className="space-y-2">
              <Label htmlFor="endTime">Fim</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Limite Diario de Mensagens</CardTitle>
          <CardDescription>Numero maximo de mensagens enviadas por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="dailyLimit">Limite</Label>
            <Input
              id="dailyLimit"
              type="number"
              min={1}
              max={1000}
              value={dailyLimit}
              onChange={(e) => setDailyLimit(Number(e.target.value))}
              className="w-32"
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? 'Salvando...' : 'Salvar Configuracoes'}
        </Button>
      </div>
    </div>
  )
}
