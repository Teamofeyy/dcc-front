// pages/UsersPage.tsx
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import UsersCard from '@/components/UsersCard' // вот этот компонент с CRUD-логикой
import { Toaster } from 'sonner'

export default function UsersPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header title="Управление пользователями" />
        <main className="p-6">
          <UsersCard />
        </main>
        <Toaster richColors position="top-right" />
      </div>
    </div>
  )
}
