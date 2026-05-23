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

const weekStats = {
  conversations: 156,
  leads: 42,
  matches: 8,
  conversions: 3,
}

const monthStats = {
  conversations: 624,
  leads: 168,
  matches: 32,
  conversions: 12,
}

const totalStats = {
  conversations: 3120,
  leads: 840,
  matches: 156,
  conversions: 58,
}

const topLeads = [
  { id: 1, name: 'Thiago Ferreira', type: 'comprador', score: 95, status: 'quente' },
  { id: 2, name: 'Joao Santos', type: 'vendedor', score: 92, status: 'quente' },
  { id: 3, name: 'Maria Silva', type: 'comprador', score: 88, status: 'quente' },
  { id: 4, name: 'Roberto Almeida', type: 'vendedor', score: 85, status: 'quente' },
  { id: 5, name: 'Mariana Rodrigues', type: 'vendedor', score: 82, status: 'quente' },
]

function StatCard({ title, stats }: { title: string; stats: typeof weekStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">Conversas</span>
          <span className="font-semibold">{stats.conversations}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">Leads captados</span>
          <span className="font-semibold">{stats.leads}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">Matches</span>
          <span className="font-semibold">{stats.matches}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">Conversoes</span>
          <span className="font-semibold text-emerald-600">{stats.conversions}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatorios</h1>
        <p className="text-zinc-500 mt-1">Metricas e analises de desempenho</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Semana Atual" stats={weekStats} />
        <StatCard title="Mes Atual" stats={monthStats} />
        <StatCard title="Total Historico" stats={totalStats} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads por Semana</CardTitle>
          <CardDescription>Evolucao de leads captados ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <p className="text-zinc-500">Grafico de leads por semana - em breve</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Leads Mais Quentes</CardTitle>
          <CardDescription>Leads com maior probabilidade de conversao</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posicao</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topLeads.map((lead, index) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-bold text-lg">#{index + 1}</TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {lead.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-emerald-600">{lead.score}%</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                      {lead.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
