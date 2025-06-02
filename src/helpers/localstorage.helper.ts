// Token helper
export function getTokenFromLocalStorage(): string {
  const data = localStorage.getItem('token')
  const token = data ? JSON.parse(data) : ''

  return token
}

export function setTokenToLocalStorage(key: string, token: string): void {
  localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string): void {
  localStorage.removeItem(key)
}

// Role helper
export function getRoleFromLocalStorage(): string {
  const data = localStorage.getItem('role')
  const role = data ? JSON.parse(data) : ''

  return role
}

export function setRoleToLocalStorage(key: string, role: string): void {
  localStorage.setItem(key, JSON.stringify(role))
}

export function removeRoleFromLocalStorage(key: string): void {
  localStorage.removeItem(key)
}
