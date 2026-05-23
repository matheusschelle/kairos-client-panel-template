import { cookies } from 'next/headers'
import { Sidebar } from './sidebar'
import { Toaster } from 'sonner'

interface AppLayoutProps {
  children: React.ReactNode
}

export async function AppLayout({ children }: AppLayoutProps) {
  const agentName = process.env.AGENT_NAME || 'Agente'
  const clientName = process.env.CLIENT_NAME || 'Cliente'

  const cookieStore = await cookies()
  const currentMode = cookieStore.get('attendance_mode')?.value || 'intermediario'

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar
        agentName={agentName}
        clientName={clientName}
        currentMode={currentMode}
      />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  )
}
