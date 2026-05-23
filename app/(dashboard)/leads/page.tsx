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

const leads = [
  { id: 1, name: 'Maria Silva', phone: '(11) 99999-1234', type: 'comprador', profile: '3 quartos, ate 500k, Zona Sul', status: 'quente', date: '2025-05-23' },
  { id: 2, name: 'Joao Santos', phone: '(11) 98888-5678', type: 'vendedor', profile: 'AP 120m2, Pinheiros, quer 650k', status: 'quente', date: '2025-05-22' },
  { id: 3, name: 'Ana Costa', phone: '(11) 97777-9012', type: 'comprador', profile: 'Casa, 4 quartos, condominio fechado', status: 'frio', date: '2025-05-22' },
  { id: 4, name: 'Carlos Oliveira', phone: '(11) 96666-3456', type: 'vendedor', profile: 'Fazenda 50ha, interior SP', status: 'morno', date: '2025-05-21' },
  { id: 5, name: 'Patricia Lima', phone: '(11) 95555-7890', type: 'comprador', profile: 'Studio ou 1 quarto, ate 300k', status: 'quente', date: '2025-05-21' },
  { id: 6, name: 'Roberto Almeida', phone: '(11) 94444-2345', type: 'vendedor', profile: 'Cobertura duplex, Moema', status: 'quente', date: '2025-05-20' },
  { id: 7, name: 'Fernanda Souza', phone: '(11) 93333-6789', type: 'comprador', profile: 'Comercial, ate 200m2, Centro', status: 'morno', date: '2025-05-20' },
  { id: 8, name: 'Lucas Pereira', phone: '(11) 92222-0123', type: 'comprador', profile: 'AP 2 quartos, proximo metro', status: 'frio', date: '2025-05-19' },
  { id: 9, name: 'Mariana Rodrigues', phone: '(11) 91111-4567', type: 'vendedor', profile: 'AP 80m2, Centro, urgente', status: 'quente', date: '2025-05-19' },
  { id: 10, name: 'Thiago Ferreira', phone: '(11) 90000-8901', type: 'comprador', profile: '3 quartos, suite, vaga, ate 700k', status: 'morno', date: '2025-05-18' },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'quente':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
    case 'morno':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    case 'frio':
      return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
    default:
      return 'bg-zinc-100 text-zinc-700'
  }
}

export default async function LeadsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const tipoFilter = params.tipo || 'todos'
  const statusFilter = params.status || 'todos'

  const filtered = leads.filter((lead) => {
    if (tipoFilter !== 'todos' && lead.type !== tipoFilter) return false
    if (statusFilter !== 'todos' && lead.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        <p className="text-zinc-500 mt-1">Gerenciamento de leads capturados</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre os leads por tipo ou temperatura</CardDescription>
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
                  <SelectValue placeholder="Temperatura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas temperaturas</SelectItem>
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
          <CardTitle>CRM de Leads</CardTitle>
          <CardDescription>{filtered.length} leads encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="max-w-xs">Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Entrada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-zinc-500">{lead.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {lead.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-zinc-500">
                    {lead.profile}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500">{lead.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
