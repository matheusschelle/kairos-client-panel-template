import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link2 } from 'lucide-react'

const matches = [
  {
    id: 1,
    buyer: {
      name: 'Maria Silva',
      profile: '3 quartos, suite, Zona Sul',
      budget: 500000,
    },
    property: {
      address: 'Rua Augusta, 1500 - Consolacao',
      value: 480000,
      seller: 'Joao Santos',
    },
    score: 5,
    totalCriteria: 6,
    isDouble: true,
  },
  {
    id: 2,
    buyer: {
      name: 'Patricia Lima',
      profile: 'Studio ou 1 quarto, centro',
      budget: 300000,
    },
    property: {
      address: 'Av. Paulista, 900 - Bela Vista',
      value: 280000,
      seller: null,
    },
    score: 4,
    totalCriteria: 6,
    isDouble: false,
  },
  {
    id: 3,
    buyer: {
      name: 'Thiago Ferreira',
      profile: '3 quartos, suite, vaga, ate 700k',
      budget: 700000,
    },
    property: {
      address: 'Rua Oscar Freire, 800 - Pinheiros',
      value: 650000,
      seller: 'Roberto Almeida',
    },
    score: 6,
    totalCriteria: 6,
    isDouble: true,
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value)
}

function getScoreColor(score: number, total: number) {
  const ratio = score / total
  if (ratio >= 0.8) return 'text-emerald-500'
  if (ratio >= 0.6) return 'text-yellow-500'
  return 'text-zinc-500'
}

export default function MatchesPage() {
  const sortedMatches = [...matches].sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
        <p className="text-zinc-500 mt-1">Conexoes identificadas entre compradores e imoveis</p>
      </div>

      <div className="grid gap-6">
        {sortedMatches.map((match) => (
          <Card key={match.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch">
                <div className="p-6 bg-blue-50 dark:bg-blue-950/30">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide mb-2">
                    Comprador
                  </p>
                  <p className="font-semibold text-lg">{match.buyer.name}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {match.buyer.profile}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Orcamento: {formatCurrency(match.buyer.budget)}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-zinc-100 dark:bg-zinc-900">
                  <div className={`p-3 rounded-full bg-white dark:bg-zinc-800 shadow-sm ${getScoreColor(match.score, match.totalCriteria)}`}>
                    <Link2 className="h-6 w-6" />
                  </div>
                  <p className={`mt-2 text-xl font-bold ${getScoreColor(match.score, match.totalCriteria)}`}>
                    {match.score}/{match.totalCriteria}
                  </p>
                  <p className="text-xs text-zinc-500">criterios</p>
                  {match.isDouble && (
                    <Badge className="mt-3 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      Match Duplo
                    </Badge>
                  )}
                </div>

                <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-wide mb-2">
                    {match.property.seller ? 'Vendedor / Imovel' : 'Imovel'}
                  </p>
                  {match.property.seller && (
                    <p className="font-semibold text-lg">{match.property.seller}</p>
                  )}
                  <p className={`text-sm ${match.property.seller ? 'text-zinc-600 dark:text-zinc-400 mt-1' : 'font-semibold text-lg'}`}>
                    {match.property.address}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Valor: {formatCurrency(match.property.value)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {matches.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum match encontrado</CardTitle>
            <CardDescription>
              Ainda nao identificamos conexoes entre compradores e imoveis disponiveis
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
