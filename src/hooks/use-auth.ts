// hooks/use-auth.ts
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = getTokenFromLocalStorage()
    setIsAuthenticated(!!token)
  }, [])

  return { isAuthenticated, setIsAuthenticated }
}
