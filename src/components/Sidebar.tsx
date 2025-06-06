import type React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, LogOut, Package, Truck, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getRoleFromLocalStorage,
  removeTokenFromLocalStorage,
} from '@/helpers/localstorage.helper'

const handleLogout = () => {
  removeTokenFromLocalStorage('token')
}

export default function Sidebar() {
  const location = useLocation()
  const role = getRoleFromLocalStorage()

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-white">
      <div className="p-6">
        <Link to={'/dashboard'} className="flex items-center">
          <span className="text-2xl font-bold text-[#2C2D5B]">
            D<span className="text-[#FF6B6B]">CC</span>
          </span>
        </Link>
      </div>
      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          <NavItem
            href="/dashboard"
            icon={LayoutDashboard}
            active={location.pathname === '/dashboard'}
          >
            Дэшборд
          </NavItem>
          <NavItem
            href="/deliveries"
            icon={Package}
            active={location.pathname.startsWith('/deliveries')}
          >
            Доставки
          </NavItem>
          {role !== 'user' && (
            <NavItem href="/users" icon={User}>
              Пользователи
            </NavItem>
          )}
          {role !== 'user' && (
            <NavItem
              href="/transport"
              icon={Truck}
              active={location.pathname.startsWith('/transport')}
            >
              Транспорт
            </NavItem>
          )}

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-sm text-gray-500 hover:text-red-600 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span>
                <Link to={'/auth'}>Выйти</Link>
              </span>
            </button>
          </div>
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

function NavItem({ href, icon: Icon, children, active }: NavItemProps) {
  return (
    <Link
      to={href}
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
