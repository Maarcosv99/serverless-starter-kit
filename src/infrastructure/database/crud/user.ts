import { UserModel } from '../models/user'
import { BaseCrud } from './base'
import { UserCreate, UserUpdate } from '../schemas/user'
import { OneTableError } from 'dynamodb-onetable'

class UserCrud extends BaseCrud<typeof UserModel, UserCreate, UserUpdate> {
  constructor() {
    super('User')
  }

  async create(payload: UserCreate): Promise<typeof UserModel> {
    const user = await this.model.create(payload, { follow: true })
    return user
  }

  async get(email: string): Promise<typeof UserModel | undefined> {
    const user = await this.model.get({ email })
    return user
  }

  async update(email: string, payload: UserUpdate) {
    email = email.toLowerCase()
    try {
      return await this.model.update({ ...payload, email })
    } catch (error) {
      if (error instanceof OneTableError) {
        if (error.code == 'NotFoundError') {
          throw new Error('Not found account with this email')
        }
      }
    }
  }

  async remove(email: string): Promise<boolean> {
    await this.model.remove({ email })
    return true
  }
}

export {
  UserCrud
}