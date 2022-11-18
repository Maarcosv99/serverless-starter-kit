import { UserDBModel } from '../schemas/user'
import { createModel } from './base'

export const UserModel = createModel<UserDBModel>({
  pk: { type: String, value: 'user#${email}' },
  sk: { type: String, value: 'user#${email}' },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company_name: { type: String },
  domainsCount: { type: Number, default: 0 },
  videosCount: { type: Number, default: 0 }
})