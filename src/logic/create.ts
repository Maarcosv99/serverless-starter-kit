import { UserCreate } from '@infrastructure/database/schemas/user'
import { UserCrud } from '@infrastructure/database/crud/user'
import { JsonResponse, STATUS_CODE } from '@libraries/api-helpers'

const crud = new UserCrud()

export async function createUser(payload: UserCreate) {
  try {
    const user = await crud.create(payload)
    const response = user ? { email: user.email } : {}
    return JsonResponse(STATUS_CODE.CREATE, response)
  } catch (error) {
    return JsonResponse(STATUS_CODE.BAD_REQUEST, {})
  }
}