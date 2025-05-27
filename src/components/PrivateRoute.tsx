import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === null) {
    return <div>Загрузка...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />
}

export default PrivateRoute
