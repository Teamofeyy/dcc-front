export interface IUserData {
  login: string
  id?: number
  name?: string
  password: string
  role?: {
    id: number
    name: string
  }
}
