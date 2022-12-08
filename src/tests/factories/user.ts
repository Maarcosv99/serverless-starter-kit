import { faker } from '@faker-js/faker'
import { UserCreate } from '@infrastructure/database/schemas/user'
import { CrudUser } from '@infrastructure/database/crud'
import { BaseFactory } from "@tests/factories/base"
import { User } from '@infrastructure/database/model/user'

export class UserFactory implements BaseFactory<CrudUser , UserCreate>{
  crud: CrudUser

  constructor() {
    this.crud = new CrudUser()
  }

  generate_random(): UserCreate {
    return {
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password()
    }
  }

  async create(payload: UserCreate = this.generate_random()) {
    const user = new User(payload)
    return await this.crud.create(user)
  }
}
