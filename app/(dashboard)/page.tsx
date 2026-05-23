import { cookies } from 'next/headers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MessageSquare, Users, Link2, Radio } from 'lucide-react'

const kpis = [
  { label: 'Atendimentos hoje', value: 47, icon: MessageSquare, color: 'text-blue-500' },
  { label: 'Leads qualificados', value: 12, icon: Users, color: 'text-emerald-500' },
  { label: 'Matches identificados', value: 3, icon: Link2, color: 'text-purple-500' },
  { label: 'Conversas ativas', value: 8, icon: Radio, color: 'text-orange-500' },
]

const recentConversations = [
  { id: 1, name: 'Maria Silva', status: 'qualificado', time: '14:32', type: 'comprador' },
  { id: 2, name: 'Joao Santos', status: 'quente', time: '14:15', type: 'vendedor' },
  { id: 3, name: 'Ana Costa', status: 'frio', time: '13:58', type: 'comprador' },
  { id: 4, name: 'Carlos Oliveira', status: 'morno', time: '13:45', type: 'vendedor' },
  { id: 5, name: 'Patricia Lima', status: 'qualificado', time: '13:22', type: 'comprador' },
]

const modeInfo: Record<string, { label: string; icon: string; description: string }> = {
  agressivo: {
    label: 'Agressivo',
    icon: '🔴',
    description: 'Fecha rapido, alta urgencia, follow-up agressivo',
  },
  intermediario: {
    label: 'Intermediario',
    icon: '⚖️',
    description: 'Balanceado, padrao do mercado',
  },
  empatico: {
    label: 'Empatico',
    icon: '❤️',
    description: 'Escuta primeiro, propoe depois. Alto padrao',
  },
  cordial: {
    label: 'Cordial',
    icon: '🤝',
    description: 'Formal, institucional, classe A',
  },
}

function getStatusColor(status: string) {
  switch (status) {
    case 'qualificado':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
    case 'quente':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    case 'morno':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    case 'frio':
      return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
    default:
      return 'bg-zinc-100 text-zinc-700'
  }
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const currentMode = cookieStore.get('attendance_mode')?.value || 'intermediario'
  const mode = modeInfo[currentMode] || modeInfo.intermediario

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Visao geral do seu painel de atendimento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  {kpi.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{kpi.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ultimas conversas</CardTitle>
            <CardDescription>Conversas mais recentes do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Horario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentConversations.map((conv) => (
                  <TableRow key={conv.id}>
                    <TableCell className="font-medium">{conv.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {conv.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(conv.status)}>
                        {conv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500">{conv.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modo de atendimento atual</CardTitle>
            <CardDescription>Configuracao ativa do agente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <span className="text-4xl">{mode.icon}</span>
              <div>
                <p className="font-semibold text-lg">{mode.label}</p>
                <p className="text-sm text-zinc-500 mt-1">{mode.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
