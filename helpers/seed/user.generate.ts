import { faker } from '@faker-js/faker'
import {UserCreate} from '@infrastructure/database/schemas/user'

function createRandomUser(): UserCreate {
  const user_email = faker.internet.email()
  return {
    email: user_email,
    password: faker.internet.password()
  }
}

function listRandomUsers(length: number): UserCreate[] {
  const response: UserCreate[] = []
  Array.from({ length }).forEach(() => {
    response.push(createRandomUser());
  });
  return response
}

export {
  listRandomUsers
}
