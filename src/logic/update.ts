import { CrudUser } from '@infrastructure/database/crud'
import { UserUpdate } from '@infrastructure/database/schemas/user'
import { JsonResponse, STATUS_CODE } from '@libraries/api-helpers'

const crud = new CrudUser()

export async function updateUser(email: string, payload: UserUpdate) {
  try {
    await crud.update(email, payload)
    return JsonResponse(STATUS_CODE.UPDATE, {})
  } catch (error) {
    return JsonResponse(STATUS_CODE.BAD_REQUEST, {})
  }
}
