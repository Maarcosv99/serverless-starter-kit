import { UserCrud } from '@infrastructure/database/crud/user'
import { UserUpdate } from '@infrastructure/database/schemas/user'
import { JsonResponse, STATUS_CODE } from '@libraries/api-helpers'

const crud = new UserCrud()

export async function updateUser(payload: UserUpdate) {
  try {
    const { email } = payload
    await crud.update(email, payload)
    return JsonResponse(STATUS_CODE.UPDATE, {})
  } catch (error) {
    return JsonResponse(STATUS_CODE.BAD_REQUEST, {})
  }
}