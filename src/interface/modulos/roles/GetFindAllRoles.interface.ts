export interface FindAllRoles {
  id: number
  name: string
  description: string
  permissionsId: number
  createdAt: Date
  updatedAt: Date
  is_active: boolean
  companyId: number
  permissions: Permissions
}

export interface Permissions {
  id: number
  libro_diario: boolean
  libro_mayor: boolean
  balance_comprobacion: boolean
  est_financieros: boolean
  export_data: boolean
  import_data: boolean
  createdAt: Date
  updatedAt: Date
  _count: Count
}

export interface Count {
  auth_users: number
}
