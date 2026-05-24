import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Sidebar } from './sidebar'
import { Toaster } from 'sonner'
import { getCurrentUser } from '@/lib/auth'

interface AppLayoutProps {
  children: React.ReactNode
}

export async function AppLayout({ children }: AppLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const cookieStore = await cookies()
  const currentMode = cookieStore.get('attendance_mode')?.value || 'intermediario'

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar
        agentName={user.agent_name}
        clientName={user.client_name}
        currentMode={currentMode}
        enabledTabs={user.enabled_tabs}
      />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  )
}
