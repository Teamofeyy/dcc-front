import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import type { JSX } from 'react'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === null) {
    return <div>Загрузка...</div> // или спиннер
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
