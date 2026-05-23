import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PageProps {
  searchParams: Promise<{ tipo?: string; status?: string }>
}

const conversations = [
  { id: 1, contact: 'Maria Silva', type: 'comprador', status: 'qualificado', lastMessage: 'Gostei muito do apartamento, podemos agendar visita?', time: '14:32' },
  { id: 2, contact: 'Joao Santos', type: 'vendedor', status: 'quente', lastMessage: 'Aceito a proposta de 450mil', time: '14:15' },
  { id: 3, contact: 'Ana Costa', type: 'comprador', status: 'frio', lastMessage: 'Vou pensar melhor', time: '13:58' },
  { id: 4, contact: 'Carlos Oliveira', type: 'vendedor', status: 'morno', lastMessage: 'Qual a comissao?', time: '13:45' },
  { id: 5, contact: 'Patricia Lima', type: 'comprador', status: 'qualificado', lastMessage: 'Busco 3 quartos ate 500k', time: '13:22' },
  { id: 6, contact: 'Roberto Almeida', type: 'vendedor', status: 'quente', lastMessage: 'Posso fazer 420mil a vista', time: '12:50' },
  { id: 7, contact: 'Fernanda Souza', type: 'comprador', status: 'morno', lastMessage: 'Tem opcao de financiamento?', time: '12:30' },
  { id: 8, contact: 'Lucas Pereira', type: 'comprador', status: 'frio', lastMessage: 'Estou apenas pesquisando', time: '11:45' },
  { id: 9, contact: 'Mariana Rodrigues', type: 'vendedor', status: 'qualificado', lastMessage: 'Quero vender meu AP no Centro', time: '11:20' },
  { id: 10, contact: 'Thiago Ferreira', type: 'comprador', status: 'quente', lastMessage: 'Vamos fechar hoje!', time: '10:55' },
]

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

export default async function ConversasPage({ searchParams }: PageProps) {
  const params = await searchParams
  const tipoFilter = params.tipo || 'todos'
  const statusFilter = params.status || 'todos'

  const filtered = conversations.filter((conv) => {
    if (tipoFilter !== 'todos' && conv.type !== tipoFilter) return false
    if (statusFilter !== 'todos' && conv.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conversas</h1>
        <p className="text-zinc-500 mt-1">Historico de conversas com leads</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre as conversas por tipo ou status</CardDescription>
        </CardHeader>
        <CardContent>
          <form method="GET" className="flex gap-4">
            <div className="w-48">
              <Select name="tipo" defaultValue={tipoFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="comprador">Comprador</SelectItem>
                  <SelectItem value="vendedor">Vendedor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <Select name="status" defaultValue={statusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="qualificado">Qualificado</SelectItem>
                  <SelectItem value="quente">Quente</SelectItem>
                  <SelectItem value="morno">Morno</SelectItem>
                  <SelectItem value="frio">Frio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Filtrar
            </button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Conversas</CardTitle>
          <CardDescription>{filtered.length} conversas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contato</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="max-w-xs">Ultima Mensagem</TableHead>
                <TableHead>Horario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((conv) => (
                <TableRow key={conv.id}>
                  <TableCell className="font-medium">{conv.contact}</TableCell>
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
                  <TableCell className="max-w-xs truncate text-zinc-500">
                    {conv.lastMessage}
                  </TableCell>
                  <TableCell className="text-zinc-500">{conv.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
