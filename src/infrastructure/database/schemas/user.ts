import { BaseInDB, BaseModel } from './base'

type BaseUser = {
  email: string
  password: string
  company_name?: string
  domainsCount: number
  videosCount: number
}

interface UserDBModel extends BaseUser, BaseModel {}

interface UserCreate {
  email: string
  password: string
}

interface UserUpdate {
  email: string
  password?: string
  company_name?: string
}

interface UserInDBBase extends Omit<BaseUser, 'password'>, BaseInDB {}

export {
  UserDBModel,
  UserCreate,
  UserUpdate,
  UserInDBBase
}