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

const imoveis = [
  { id: 1, address: 'Rua Augusta, 1500 - Consolacao', type: 'apartamento', value: 520000, rooms: 2, area: 75, status: 'disponivel' },
  { id: 2, address: 'Av. Paulista, 900 - Bela Vista', type: 'comercial', value: 1200000, rooms: 0, area: 150, status: 'disponivel' },
  { id: 3, address: 'Al. Santos, 300 - Jardins', type: 'apartamento', value: 890000, rooms: 3, area: 120, status: 'vendido' },
  { id: 4, address: 'Rua Oscar Freire, 800 - Pinheiros', type: 'casa', value: 1500000, rooms: 4, area: 200, status: 'disponivel' },
  { id: 5, address: 'Estrada do Campo Limpo, km 15', type: 'fazenda', value: 3500000, rooms: 5, area: 50000, status: 'disponivel' },
  { id: 6, address: 'Rua Haddock Lobo, 500 - Cerqueira Cesar', type: 'apartamento', value: 680000, rooms: 2, area: 85, status: 'locado' },
  { id: 7, address: 'Av. Reboucas, 1200 - Pinheiros', type: 'comercial', value: 450000, rooms: 0, area: 80, status: 'disponivel' },
  { id: 8, address: 'Rua Funchal, 250 - Vila Olimpia', type: 'apartamento', value: 750000, rooms: 3, area: 95, status: 'vendido' },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'disponivel':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
    case 'vendido':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    case 'locado':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    default:
      return 'bg-zinc-100 text-zinc-700'
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatArea(area: number) {
  if (area >= 10000) {
    return `${(area / 10000).toFixed(0)} ha`
  }
  return `${area} m2`
}

export default async function ImoveisPage({ searchParams }: PageProps) {
  const params = await searchParams
  const tipoFilter = params.tipo || 'todos'
  const statusFilter = params.status || 'todos'

  const filtered = imoveis.filter((imovel) => {
    if (tipoFilter !== 'todos' && imovel.type !== tipoFilter) return false
    if (statusFilter !== 'todos' && imovel.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Imoveis</h1>
        <p className="text-zinc-500 mt-1">Catalogo de imoveis disponiveis</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre os imoveis por tipo ou status</CardDescription>
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
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="fazenda">Fazenda</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
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
                  <SelectItem value="disponivel">Disponivel</SelectItem>
                  <SelectItem value="vendido">Vendido</SelectItem>
                  <SelectItem value="locado">Locado</SelectItem>
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
          <CardTitle>Lista de Imoveis</CardTitle>
          <CardDescription>{filtered.length} imoveis encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endereco</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Quartos</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((imovel) => (
                <TableRow key={imovel.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {imovel.address}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {imovel.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(imovel.value)}
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {imovel.rooms > 0 ? imovel.rooms : '-'}
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {formatArea(imovel.area)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(imovel.status)}>
                      {imovel.status}
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
