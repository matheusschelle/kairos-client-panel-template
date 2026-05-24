'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Building2,
  Link2,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  tabKey?: string
}

const allNavItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/conversas', label: 'Conversas', icon: MessageSquare, tabKey: 'conversas' },
  { href: '/leads', label: 'Leads', icon: Users, tabKey: 'leads' },
  { href: '/imoveis', label: 'Imoveis', icon: Building2, tabKey: 'imoveis' },
  { href: '/matches', label: 'Matches', icon: Link2, tabKey: 'matches' },
  { href: '/relatorios', label: 'Relatorios', icon: BarChart3, tabKey: 'relatorios' },
  { href: '/configuracoes', label: 'Configuracoes', icon: Settings, tabKey: 'configuracoes' },
]

interface SidebarProps {
  agentName: string
  clientName: string
  currentMode: string
  enabledTabs: string[]
}

export function Sidebar({ agentName, clientName, currentMode, enabledTabs }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const modeLabels: Record<string, string> = {
    agressivo: 'Agressivo',
    intermediario: 'Intermediario',
    empatico: 'Empatico',
    cordial: 'Cordial',
  }

  const navItems = allNavItems.filter(item => {
    if (!item.tabKey) return true
    return enabledTabs.includes(item.tabKey)
  })

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-zinc-900 text-white flex flex-col min-h-screen">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold tracking-tight">Kairos</h1>
      </div>

      <div className="p-4 border-b border-zinc-800">
        <p className="text-sm text-zinc-400">Agente</p>
        <p className="font-semibold">{agentName}</p>
        <Badge variant="outline" className="mt-2 text-xs border-emerald-500 text-emerald-400">
          {modeLabels[currentMode] || 'Intermediario'}
        </Badge>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-500">Cliente</p>
        <p className="text-sm font-medium text-zinc-300">{clientName}</p>
      </div>
    </aside>
  )
}
