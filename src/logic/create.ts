import { UserCreate } from '@infrastructure/database/schemas/user'
import { User } from '@infrastructure/database/model/user'
import { CrudUser } from '@infrastructure/database/crud'
import { JsonResponse, STATUS_CODE } from '@libraries/api-helpers'

const crud = new CrudUser()

export async function createUser(payload: UserCreate) {
  try {
    const user = new User(payload)
    await crud.create(user)
    const response = user ? { email: user.email } : {}
    return JsonResponse(STATUS_CODE.CREATE, response)
  } catch (error) {
    return JsonResponse(STATUS_CODE.BAD_REQUEST, {})
  }
}
