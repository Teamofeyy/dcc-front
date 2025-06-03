'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

type DashboardHeaderProps = {
  title: string
}

export default function Header({ title }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Свернуть меню</span>
        </Button>
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
    </header>
  )
}
