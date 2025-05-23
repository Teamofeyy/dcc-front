export interface IRole {
  id: number
  name: string
}

export type RoleCreate = Omit<IRole, 'id'>
export type RoleUpdate = Partial<RoleCreate>
