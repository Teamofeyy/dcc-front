import type React from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, FileText, Package, Truck, Store } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-white">
      <div className="p-6">
        <Link to={'/'} className="flex items-center">
          <span className="text-2xl font-bold text-[#2C2D5B]">
            D<span className="text-[#FF6B6B]">CC</span>
          </span>
        </Link>
      </div>
      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          <NavItem href="/" icon={LayoutDashboard} active>
            Dashboard
          </NavItem>
          <NavItem href="/quotations" icon={FileText}>
            Quotations
          </NavItem>
          <NavItem href="/shipments" icon={Package}>
            Shipments
          </NavItem>
          <NavItem href="/dispatches" icon={Truck}>
            Dispatches
          </NavItem>
          <NavItem href="/store-management" icon={Store}>
            Store Management
          </NavItem>
        </nav>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  active?: boolean
}

function NavItem({ icon: Icon, children, active }: NavItemProps) {
  return (
    <Link
      to={'/'}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
        active && 'bg-[#2C2D5B] text-white hover:text-white'
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  )
}
