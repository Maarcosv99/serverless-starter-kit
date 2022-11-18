import { UserCrud } from '@infrastructure/database/crud/user'
import { JsonResponse, STATUS_CODE } from '@libraries/api-helpers'

const crud = new UserCrud()

export async function deleteUser(email: string) {
  try {
    await crud.remove(email)
    return JsonResponse(STATUS_CODE.DELETE, {})
  } catch (error) {
    return JsonResponse(STATUS_CODE.BAD_REQUEST, {})
  }
}