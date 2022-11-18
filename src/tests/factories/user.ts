import { faker } from '@faker-js/faker'
import { UserCreate } from '@infrastructure/database/schemas/user'
import { UserCrud } from '@infrastructure/database/crud/user'
import { BaseFactory } from "@tests/factories/base"

export class UserFactory implements BaseFactory<UserCrud , UserCreate>{
  crud: UserCrud

  constructor() {
    this.crud = new UserCrud()
  }

  generate_random(): UserCreate {
    return {
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password()
    }
  }

  async create(payload: UserCreate = this.generate_random()) {
    return await this.crud.create(payload)
  }
}