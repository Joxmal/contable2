export interface GetONECompanyUser {
  id: number
  groups_company_planId: number
  authKeyCompany: string
  authKeySystemFoxPro: number
  createdAt: Date
  updatedAt: Date
  is_active: boolean
  _count: Count
  groups_company_plan: GroupsCompanyPlan
  data_company: DataCompany
  auth_users: AuthUser[]
  admin_logs: any[]
  roles: any[]
}

interface Count {
  auth_users: number
  roles: number
  Libro_Diario: number
  admin_logs: number
  Cuenta_contables: number
  Cierre_Anual: number
}

export interface AuthUser {
  id: number
  username: string
  password: string
  description: string
  email: null
  createCompanyPermission: boolean
  first_name: string
  second_name: string
  companyId: number
  roleId: null
  primaryRole: string
  last_login: null
  createdAt: Date
  updatedAt: Date
  is_active: boolean
  role: null | RoleAuthUser
}

export interface RoleAuthUser {
  id: number
  name: string
  description: string
  permissionsId: number
  createdAt: Date
  updatedAt: Date
  is_active: boolean
  companyId: number
}

interface DataCompany {
  id: number
  nameCompany: string
  description: string
  companyId: number
}

interface GroupsCompanyPlan {
  id: number
  nombre: string
  description: string
  permissionsId: number
  createdAt: Date
  updatedAt: Date
}
