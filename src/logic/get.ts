import { CrudUser } from '@infrastructure/database/crud'
import { JsonResponse, STATUS_CODE } from '@libraries/api-helpers'

const crud = new CrudUser()

export async function getUser(email: string) {
  try {
    const user = await crud.get(email)
    let response = {}
    if (user) {
      response = {
        email: user.email,
        company_name: user.company_name || undefined
      }
    }
    return JsonResponse(STATUS_CODE.READ, response)
  } catch (error) {
    return JsonResponse(STATUS_CODE.BAD_REQUEST, {})
  }
}
