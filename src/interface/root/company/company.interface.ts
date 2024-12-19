export interface GetCompanyDB {
  id: number
  authKeyCompany: string
  createdAt: Date
  updatedAt: Date
  is_active: boolean
  _count: Count
  groups_company_plan: null
  data_company: null
  auth_users: AuthUser[]
  admin_logs: any[]
  roles: Role[]
}

interface Count {
  auth_users: number
  roles: number
  Libro_Diario: number
  admin_logs: number
  Cuenta_contables: number
}

interface AuthUser {
  id: number
  username: string
  password: string
  description: string
  email: null
  first_name: string
  second_name: string
  companyId: number
  primaryRole: string
  last_login: null
  createdAt: Date
  updatedAt: Date
  is_active: boolean
}

interface Role {
  id: number
  name: string
  description: string
  permissionsId: number
  auth_users: AuthUser[]
  auth_usersId: number
  createdAt: Date
  updatedAt: Date
  is_active: boolean
  companyId: number
}
